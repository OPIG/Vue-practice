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

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());
require("./config/passport")(passport)

//middleware
app.use("/api/users",users);
app.use("/api/profiles",profiles);



