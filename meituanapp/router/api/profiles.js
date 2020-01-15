const express = require("express");
const profile = require("../../models/m_profile");
const router = express.Router();


router.post("/add",(req,res)=>{
    const profileFields ={};
    if(req.body.img) profileFields.img = req.body.img;
    if(req.body.name) profileFields.name = req.body.name;
    if(req.body.text) profileFields.text = req.body.text;

    if(req.body.imgs){
        profileFields.imgs = req.body.imgs.split("|");
    }

    new profileFields(profileFields).save()
        .then(profile =>{
            res.json(profile);
        })
        .catch(err => console.log(err));
})

router.get("/latest",(req,res)=>{
    profile.find()
           .sort({
               date: -1
           })
           .then(profiles=>{
               if(!profiles){
                   res.status(400).json("no data");
               }else{
                   let newProfiles=[];
                   for(let i=0;i<3;i++){
                       if(profiles[i]!=null){
                           newProfiles.push(profiles[i]);
                       }
                   }
                   res.json(newProfiles);
               }
           })
})

router.get("/:page/:size",(req,res)=>{
    profile.find()
            .sort({
                date:-1
            })
            .then(profile=>{
                if(!profile){
                    res.status(400).json("no data");
                }else{
                    let size = req.params.size;
                    let page = req.params.page;
                    let index = size*(page-1);
                    let newProfiles =[];
                    for(let i= index;i<size*page;i++){
                        if(profile[i]!=null){
                            newProfiles.push(profile[i]);
                        }
                    }

                    res.json(newProfiles);
                }
            })
})

module.exports = router;