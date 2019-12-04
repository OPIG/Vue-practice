const express = require('express');
const router = express.Router();
const profile =require("../../models/profile");
const passport = require('passport');

// @ router GET 
// @acces public
router.get('/profile',(req,res) => {
    res.json("profile works");
})

// @router Post
router.post('/add',passport.authenticate('jwt',{session: false}),(req,res) => {
    const profileFields = {};
    if(req.body.img) profileFields.img = req.body.img;
    if(req.body.name) profileFields.name = req.body.name;
    if(req.body.text) profileFields.text = req.body.text;

    if(req.body.imgs){
        profileFields.imgs = req.body.imgs.split("|")
    }

    new profile(profileFields).save()
            .then(profile => {
                res.json(profile);
            })
            .catch(err => console.log(err));
});

// @router GET 
// @access private
router.get('/latest',passport.authenticate('jwt',{session: false}),(req,res) => {
    profile.find()
            .sort({
                date: -1
            })
            .then(profiles => {
                if(!profiles){
                    res.status(404).json("no data");
                }else{
                    let newProfiles = [];
                    for(let i=0; i<3;i++){
                        if(profiles[i]!=null){
                            newProfiles.push(profiles[i])
                        }
                    }
                    res.json(newProfiles);
                }
            })
})

// @router GET
// @access private
router.get('/:page/:size',passport.authenticate('jwt',{session: false}),(req,res) => {
    profile.find()
            .sort({
                date: -1
            })
            .then(profile => {
                if(!profile){
                    res.status(404).json("no Data");
                }else{
                    let size =  req.params.size;
                    let page = req.params.page;
                    let index = size*(page - 1);
                    let newProfiles = [];
                    for(let i=index; i< size*page; i++){
                        if(profile[i]!=null){
                            newProfiles.push(profile[i]);
                        }
                    }
                    res.json(newProfiles);
                }
            })
})


module.exports = router