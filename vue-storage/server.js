const express = require("express");
const mongoose =  require("mongoose");
const bodyParser = require('body-parser');
const passport = require("passport");

const app = express();


// @import ./routes/api/users.js
const users =  require("./routes/api/users");
// @import ./routes/api/profiles.js
const profiles = require("./routes/api/profiles");

const db = require("./config/keys").mongoURI;
mongoose.connect(db,{ useNewUrlParser: true ,useUnifiedTopology: true })
.then(() => console.log("MongoDb connected"))
.catch(err => console.log(err));

app.get("/",(req,res) => {
    res.send("Hello Vue smile!");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//服务器端解决跨域问题
// app.use((req,res,next) => {
//     res.header('Access-Control-Allow-Origin','*');
//     res.header('Access-Control-Allow-Headers','Content-Type');
//     res.header('Access-Control-Allow-Methods','PUT,GET,POST,DELETE,OPTIONS');
//     next();
// }) 


// passport 初始化
app.use(passport.initialize());
require("./config/passport")(passport);


// @use router 
app.use("/api/users", users);
app.use("/api/profiles",profiles);


const port = process.env.PORT || 5000;

app.listen(port,() => {
    console.log(`Server running on port ${port}`);
})