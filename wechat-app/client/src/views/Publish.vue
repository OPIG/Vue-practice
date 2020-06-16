<template>
    <div class="publish">
        <div class="header">
            <button @click="$router.go(-1)">取消</button>
            <button @click="publish">发表</button>
        </div>
        <div class="content">
            <div class="text_wrap">
                <textarea placeholder ="leave your message..." v-model="text"></textarea>

                <Upload @getImgs="getImgs"/>
            </div>
        </div>
    </div>
</template>

<script>
import Upload from '../components/Upload'
import jwt_decode from 'jwt-decode'
export default{
    name:"publish",
    data(){
        return {
            text:'',
            imgs:[]
        }
    },
    methods:{
        publish(){
            const postData={
                name: this.user.name,
                img:this.user.avatar,
                text:this.text,
                imgs:this.imgs.join('|')
            };

            //请求
            this.$axios.post("/api/profiles/add",postData)
                .then(res=>{
                    //发布成功后跳转
                    this.$router.push("/moments")
                }).catch((err)=>{

                })
        },
        getImgs(imgs){
            //获取base64
            imgs.forEach(file=>{
                this.uploadFile(file);
            })
        },
        uploadFile(file){
            //cnblog 小丸子的城堡 https://www.cnblogs.com/youhong/p/7221080.html
            let reader = new FileReader();
            const _this = this;

            reader.onload=function(){
                //console.log(e.target.result);
                _this.imgs.push(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    },
    components:{
        Upload
    },
    computed:{
        user(){
            const token = localStorage.wxpyqToken;

            const decode = jwt_decode(token);
            console.log( decode);
            return decode
        }
    }
}
</script>

<style scope>
    .publish{
        widht: 100%;
        height: 100%;
        position:relative;
        overflow:hidden;
    }
    .header{
        width:100%;
        height: 50px;
        box-sizing:border-box;
        display:flex;
        padding: 0 10px;
        line-height: 50px;
        justify-content:space-between;
    }
    .header button{
        border:none;
        outline:none;
        background-color:transparent;
        font-size:16px;
    }
    .header button:nth-child(2){
        color:#20af0e;
    }

    .content{
        paddding: 16px;
        box-sizing:border-box;
        width: 100%
    }
    .text_wrap textarea{
        width: 100%;
        font-size: 14px;
        min-height: 60px;
        border:none;
        outline:none;
    }
    .text_wrap {
        margin-bottom:16px;
    }
</style>