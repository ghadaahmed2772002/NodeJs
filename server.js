//#region Require
const express=require('express');
const http=require('http');
const app=express();
const fs=require('fs');
const path=require('path');
const port=process.env.PORT||7500;
const bodyparser=require('body-parser');
//#endregion
    

//#region middleware
app.use(bodyparser.urlencoded());
app.use(bodyparser.json());
app.use(express.static(__dirname+"/public"));  //public for assets
//#endregion




//#region Handle All Requests

// app.get("/", (req, res)=>{
//     res.render('index.ejs');
// });
// app.get("/main", (req, res)=>{
//     res.render('main.ejs');
// });



// app.get("/profile/:userName", (req, res)=>{
//     let userName = req.params.userName;
//     res.render('profile.ejs', {headerData:'hi', userName});
// });


//#endregion








app.listen(port,()=>{
    console.log("http://localhost:"+port);
});



