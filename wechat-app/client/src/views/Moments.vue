<template>
    <div class="circle">
        <Header title="朋友圈" btn_icon="camera" :isLeft="true"></Header>
        <div class="containder">
            <div class="scroll-wrap">
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
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../components/Header';
import CellView from '../components/CellView';
import jwt_decode from 'jwt-decode';

export default {
    name:'moments',
    components:{
        Header,
        CellView
    },
    data(){
        return {
            momentListData:[]
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
            this.$axios.get('/api/profiles/latest')
                .then(res => {
                    this.momentListData=[...res.data];
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
