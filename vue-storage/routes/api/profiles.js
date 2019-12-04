const express = require("express");
const router = express.Router();
const passport = require("passport");

const Profile = require("../../models/profile");

// @router get api/profiles/profile
// @desc 返回请求的json数据
// @access public
router.get("/profile",(req,res) => {
    res.json("profiles works")
});

// @route post api/profiles/add
// @desc 创建朋友圈信息 接口
// @access private
router.post("/add",passport.authenticate('jwt',{session:false}),(req,res) => {
    //res.json("profiles works!")
    const profilesFields = {};
    if(req.body.img) profilesFields.img = req.body.img;
    if(req.body.name) profilesFields.name = req.body.name;
    if(req.body.text) profilesFields.text = req.body.text;

    //存储多张图片
    if(req.body.imgs){
        //与前端商量好多张图片用"|"分隔
        profilesFields.imgs = req.body.imgs.split("|");
    }

    //存储数据
    new Profile(profilesFields).save()
        .then(profile => {
            res.json(profile);
        })
});

// @route Get api/profiles/latest
// @desc 下拉刷新的接口
// @access private
router.get("/latest",passport.authenticate("jwt",{session:false}),(req,res) => {
    //获取所有数据 find
    Profile.find()
        .sort({
            // date: -1 倒序
            date: -1
        })
        .then(profiles => {
            if(!profiles){
                res.status(404).json("没有任何消息");
            }else{
                let newProfiles = [];
                for(let i = 0; i < 6; i++){
                    if(profiles[i] != null){
                        newProfiles.push(profiles[i]);
                    }
                }
                res.json(newProfiles);
                //res.json(profiles); //获取所有朋友圈信息
            }
        })
})

// @route Get api/profiles/:page/:size
// @desc 上拉加载的接口
// @access private
router.get("/:page/:size",passport.authenticate("jwt",{session:false}),(req,res) => {
    Profile.find()
        .sort({date: -1})
        .then((profile) => {
            if(!profile){
                res.status(404).json("没有任何数据");
            }else{
                let size = req.params.size;
                let page = req.params.page;
                let index = size * (page - 1);
                let newProfiles = [];
                for(let i = index; i < size * page; i++){
                    if(profile[i] != null){
                        newProfiles.push(profile[i]);
                    }
                }
                res.json(newProfiles);
            }
        })
})

module.exports = router;