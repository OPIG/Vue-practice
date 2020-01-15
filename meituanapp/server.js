const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
const app = express();

app.get("/",(req,res)=>{
    res.send("Hello Node world");
})

const db = require("./config/keys").mongoURI;
mongoose.connect(db,{useNewUrlParser: true,useUnifiedTopology: true})
    .then(()=>{
        console.log("MongoDB connected");
    }).catch(err=>{
        console.log(err);
    }); 


const port = 5001;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

const users = require("./router/api/users");
const profiles = require("./router/api/profiles");

// const router = express.Router();
// router.get("/login",(req,res)=>{
//     res.json({msg:"login works"});
// })
//module.exports = router;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/user",users);
app.use("/api/profile",profiles);
