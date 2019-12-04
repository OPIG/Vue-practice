const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// @ test
router.get("/userlist",(req,res) => {
    res.json({msg:"login works"});
})

// @register POST api/users/register
// @desc 
// @access public
router.post("/register",(req,res) => {
    User.findOne({email:req.body.email})
        .then(user => {
            if(user){
                res.status(400).json({email:"email already have"});
            }else{
                const avatar = gravatar.url(req.body.email,{s:'200',r:'pg',d:'mm'});
                const newUser = new User({
                    name:req.body.name,
                    email:req.body.email,
                    avatar,
                    password: req.body.password
                })

                bcrypt.genSalt(10,function(err,salt) {
                    bcrypt.hash(newUser.password,salt,(err,hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                               .then(user => res.json({name:user.name,email:user.email,avatar:user.avatar}))
                               .catch(err => console.log(err));
                    })
                })
            }

        }).catch(err => console.log(err));
})

// @login POST api/users/login
// @desc 返回token jwt passport
// @access public
router.post("/login",(req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email}).then(user => {
        if(!user){
            return res.status(404).json({email:"用户不存在"});
        }

        bcrypt.compare(password,user.password)
            .then(isMatch => {
                if(isMatch){
                    const rule = {id: user.id,name:user.name,avatar:user.avatar};
                    jwt.sign(rule,keys.secretOrKey,{expiresIn:3600},(err,token) => {
                        if(err) throw err;
                        res.json({
                            success: true,
                            token: "Bearer "+ token
                        })
                    });
                   // res.json(user);
                }else{
                    res.status(404).json({msg:"password not match"});
                }
            })
        //res.json(user);


    }).catch(err => console.log(err));
})

// @route GET api/users/current
// @desc
// @access private
router.get("/current",passport.authenticate("jwt",{session:false}), (req,res) => {
    res.json({
        id:req.user.id,
        name: req.user.name,
        email: req.user.email,
        password: req.user.password,
        avatar: req.user.avatar

    })
})

module.exports = router;