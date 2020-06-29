const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

app.get("/",(req,res) => {
    res.send("Hello Vue World!");
})

const db = require("./config/keys").mongoURI;

mongoose.connect(db,{ useNewUrlParser: true,useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch(err => console.error(err));

const port = process.env.port || 5001;

app.listen(port,() => {
    console.log(`Server running on port ${port}`)
})

const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");

app.use(bodyParser.urlencoded({extended: true, limit:'50mb'}));//限制文件大小50mb(兆)
app.use(bodyParser.json({limit:'50mb'}));

// passport 初始化
app.use(passport.initialize());
require("./config/passport")(passport)

//middleware
app.use("/api/users",users);
app.use("/api/profiles",profiles);


//服务器端解决跨域问题
// app.use((req,res,next) => {
//     res.header('Access-Control-Allow-Origin','*');
//     res.header('Access-Control-Allow-Header','Content-Type');
//     res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
//     next();
// })


