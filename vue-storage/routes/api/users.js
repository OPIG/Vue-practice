// @login & register
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const keys = require("../../config/keys");
const passport = require("passport");


// @router Get api/users/test
// @desc
// @access public
router.get("/test",(req,res) => {
    res.json({msg:"login works"});
})


// @register post api/users/register
// @desc
// @access public
router.post("/register", (req,res) =>{
    //console.log(req.body);
    //查询数据库中是否有已有邮箱
    User.findOne({email:req.body.email})
    .then((user) => {
        if(user){
            return res.status(400).json({email:"邮箱已被注册"})
        }else{
            const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            })

            bcrypt.genSalt(10,function(err,salt){
                bcrypt.hash(newUser.password,salt,(err,hash) => {
                    if(err) throw err;
                    
                    newUser.password = hash;
                    newUser.save().then(user => res.json(user)).catch(err => console.log(err));
                    
                })
            })
        }
    }).catch(err => console.log(err));
})

// @login post api/users/login
// @desc 返回token jwt passort
// @access public
router.post("/login",(req,res) =>{
    const email = req.body.email;
    const password =req.body.password;
    //查询数据库
    User.findOne({email})
        .then(user => {
            if(!user){
                return res.status(404).json({email: "用户不存在"});
            }

            // 密码匹配
            bcrypt.compare(password,user.password)
                    .then(isMatch => {
                        if(isMatch){
                            //jwt.sign("规则","加密名字","过期时间","箭头函数");
                            const rule = {id:user.id,name:user.name,avatar:user.avatar};
                            jwt.sign(rule,keys.secretOrKey,{expiresIn:3600},(err,token) => {
                                if(err) throw err;
                                res.json({
                                    success:true,
                                    token: "Bearer " + token
                                })
                            });
                            //res.json({msg:"success"});
                        }else{
                            return res.status(400).json({password:"密码错误"});
                        }
                    })
        })
})

// @route Get api/users/current
// @desc return current user
// @access private
//router.get("route","验证token","箭头函数");
router.get("/current",passport.authenticate("jwt",{session:false}),(req,res) => {
    //res.json({msg:"success"});
    //res.json(req.user);
    res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email
    });
})

module.exports = router;