const express = require ("express");
const router = express.Router();
const User = require("../../models/m_user");
const bcrypt = require("bcrypt");


router.post("/register",(req,res)=>{
    User.findOne({email:req.body.email})
        .then(user=>{
            if(user){
                return res.status(400).json({email:"email has been registered"});
            }

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
return res.json(newUser);
        bcrypt.genSalt(10,function(err,salt){
            bcrypt.hash(newUser.password,salt,function(err,hash){
                if(err) throw err;

                newUser.password = hash;
                newUser.save()
                    .then(user =>res.json(user))
                    .catch(err=>console.log(err));
            })
        })
    }).catch(err => console.log(err));
})

router.post("/login",(req,res)=>{
    //const email = "emerleite@gmail.com";
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user=>{
            if(!user){
                return res.status(400).json({email:`${req.body.email}`+"email donot exist"});
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch){
                        const rule = {id:user.id,name:user.name};
                        res.json({
                            success: true,
                            message: {user}
                        })
                    }
            });
        })
})

// router.get("/current",passport.authenticate("jwt",{session:false}), (req,res)=>{
//     res.json({
//         id:req.user.id,
//         name: req.user.name,
//         email: req.user.email,
//         password: req.user.password,
//         avatar: req.user.avatar
//     })
// });
router.get("/current", (req,res)=>{
    res.json(
        User
    )
})


module.exports = router;