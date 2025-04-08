//#region Requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 7700;
//#endregion

//#region MiddleWares
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.set('views', path.join(__dirname, 'views'));
//#endregion

//#region Mongoose 
// 1- connect with iti
mongoose.connect("mongodb://localhost:27017/ITI");

// 2- create schema
const StudentsSchema = new mongoose.Schema({
    fullName: String,
    age: Number
});

const Students = mongoose.model('newCollection', StudentsSchema,'newCollection');

const DBListener = mongoose.connection;

DBListener.on('error', (err) => {
    console.log("error here in connection: ", err);
});

DBListener.once('open', () => {
    console.log("Connected Successfully");

    // Routes

    app.get("/", (req, res) => {   //index
        res.render('index.ejs');
    });

    app.get("/index", (req, res) => {
        res.render('index.ejs');
    });
    
    app.get("/main", (req, res) => {   //add
        res.render('main.ejs');
    });


    app.get("/welcome", async (req, res) => {   //show
            const allstudents = await Students.find();
            // console.log(allstudents);
            res.render('welcome.ejs', { allstudents });
    });

    app.post("/main", async (req, res) => {   //add in form 
        console.log("Form data received:", req.body); 
        try {
            const newStudent = new Students(req.body);
            await newStudent.save();
            console.log("student was added");
            res.redirect("/index");
        } catch (err) {
            console.log("Error saving student:", err);
        }
    });
    
    app.post("/delete", async(req, res) => {
        const id=req.body._id;
        try{
        await Students.findByIdAndDelete(id);
        console.log('id',id);
        res.redirect('/welcome');
        }catch (err) {
            console.log(err);
        }
    });


    //edit 
    app.post("/edit", async(req, res) => {
        const id=req.body._id;     
        try{
            await Students.findOne({ _id:id}).updateOne({ fullName: req.body.fullName ,age:req.body.age}); 
            console.log('id',id ,req.body.fullName,req.body.age);   
            res.redirect('/welcome');
        }catch (err) {
            console.log(err);
        }
    });
});


//#endregion

app.listen(PORT, () => {
    console.log("http://localhost:" + PORT);
});
