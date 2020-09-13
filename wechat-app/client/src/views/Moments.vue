<template>
    <div class="circle">
        <Header title="朋友圈" btn_icon="camera" :isLeft="true" @rightClick="$router.push('/publish')"></Header>
        <div class="containder">
            <Scroll ref="refresh" @pulldown="loadData" @pullup="loadMore">
                    <div class="head-wrapper">
                        <div class="user-head">
                            <span>{{user.name}}</span>
                            <div class="user-img">
                                <img :src="user.avatar" alt class="hea-img"/>
                            </div>
                        </div>
                    </div>
                    <div class="content-wrapper">
                        <CellView
                            v-for="(moment,index) in momentListData"
                            :key="index"
                            :momentObj="moment"
                        />
                    </div>
            </Scroll>
        </div>
    </div>
</template>

<script>
import Header from '../components/Header';
import CellView from '../components/CellView';
import Scroll from '../components/Scroll';
import jwt_decode from 'jwt-decode';

export default {
    name:'moments',
    components:{
        Header,
        CellView,
        Scroll
    },
    data(){
        return {
            momentListData:[],
            page:2,//加载更多从page2开始
            size:3, //每次请求3条数据
            loading:false
        }
    },
    computed:{
        user(){
            const token = localStorage.wxpyqToken;

            const decode = jwt_decode(token);
            console.log( decode);
            return decode
        }
    },
    created(){
        this.getLatestData()
    },
    methods: {
        getLatestData(){
            if(this.loadding) return;
            this.loading=true;

            this.$axios.get('/api/profiles/latest')
                .then(res => {
                    this.loading=false;
                    
                    this.momentListData=[...res.data];

debugger;
                    //注册事件，解决下拉刷新字样重置问题
                    this.$refs.refresh.$emit("refresh");
                })
        },
        loadData(){
            this.page =2;
            this.getLatestData();
        },
        loadMore(){
            if(this.loadding) return;
            this.loading=true;

            this.$axios(`/api/profiles/${this.page}/${this.size}`)
                .then(res=>{
                    this.loading=false;

                    //console.log(res.data);
                    const result = [...res.data];
                    //遍历数组
                    if(result.length>0){
                        result.forEach(item=>{
                            this.momentListData.push(item);
                        })

                        //自增page
                        this.page++;
                    }else{
                        //数组为空，没有更多数据，page不再自增
                        this.$refs.refresh.$emit("loadDone");
                    }

                }).catch(err=>{
                    console.log(err);
                })
        }
    }
}
</script>

<style scoped>
.circle {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.container {
  width: 100%;
  height: calc(100% - 50px);
  padding-top: 50px;
}
.head-wrapper {
  width: 100%;
  position: relative;
  height: 200px;
  background: url("../assets/wxpyq_bg.png") no-repeat;
  background-size: 100% 100%;
}
.head-wrapper .user-head {
  position: absolute;
  bottom: -30px;
  right: 16px;
}
.user-img {
  width: 60px;
  height: 60px;
  padding: 3px;
  border: 1px solid #c5c5c5;
  box-sizing: border-box;
}
.user-img img {
  width: 100%;
  height: 100%;
}
.user-head span {
  line-height: 30px;
  position: absolute;
  right: 76px;
  width: 200px;
  text-align: right;
  color: #fff;
}
</style>
