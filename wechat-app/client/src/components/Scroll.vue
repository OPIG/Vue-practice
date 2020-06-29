<template>
    <div class="scroll-wrap" ref="wrapper">
        <div>
            <!-- 下拉刷新-->
            <div class="pulldown" v-show="dragTip.showLoading">
                <div class="clear">
                    <div class="fl">
                        <img width="16" src="../assets/loading.png" alt="">
                        <div class="fl">{{dragTip.text}}</div>
                    </div>
                </div>
            </div>
            <slot></slot>

            <!--上拉加载-->
            <div class="pullup">
                <div class="clear" v-if="!isDone">
                    <div class="fl">
                        <img width="16" src="../assets/loading.png" alt>
                        <div class="fl">加载中...</div>
                    </div>
                </div>
                <div class="list-donetip" v-else>
                    <slot name="dontTip">没有更多数据</slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import BScroll from 'better-scroll'

export default{
    name:'scrolls',
    mounted(){
        this.$nextTick(
            this.InitScroll()
        )

         /*我们在这里把 this.$nextTick 替换成 setTimeout(fn, 20) 也是可以的（20 ms 是一个经验值，每一个 Tick 约为 17 ms）*/
        /*setTimeout(() => {
            this.InitScroll()
        },20);*/

    },
    data(){
        return {
            scroll:{},
            dragTip:{
                text:"下拉刷新",
                showLoading:false
            },
            isDone:false
        }
    },
    methods:{
        InitScroll(){
            console.log(this.$refs.wrapper);
            if(!this.$refs.wrapper){
                return;
            }

            this.scroll = new BScroll(this.$refs.wrapper,{
                probeType:1
            })

            //派发下拉事件
            this.scroll.on("scroll",pos=>{
                //显示下拉刷新
                this.dragTip.showLoading = true;
                if(pos.y>50){
                    this.dragTip.text ="释放刷新"
                }
            })

            //手松开 事件
            this.scroll.on("touchEnd",pos=>{
                if(pos.y>50){
                    this.dragTip.text = "刷新zhong..."

                    //重新初始化

                    //注册下拉事件
                    this.$emit('pulldown');

                    this.$on("refresh",this.reset)
                }
            })

            //派发滚动到底部事件用户上拉加载
            this.scroll.on('scrollEnd',()=>{
                //console.log(this.scroll.maxScrollY);

                if(this.scroll.y<=this.scroll.maxScrollY+50){
                //注册下拉加载事件
                    this.$emit('pullup')
                
                // 触发事件
                    this.$on("loadDone",()=>{
                        this.isDone = true;
                    })
                }
            })

            console.log(this.scroll);
        },
        reset(){
            this.isDone = false;

            setTimeout(()=>{
                this.dragTip={
                    text:"下拉刷新",
                    showLoading:false
                }
            },600)
        }
    }
}

</script>
<style scoped>
.scroll-wrap{
    width: 100%;
    height:100%;
    overflow: hidden;
    position: absolute; /*wrapper元素上要给定位*/
    left:0;
    top:0;
}
.fl{
    display:inline-block;
}
.fl img{
    width:16px;
    height:100%;
    vertical-align:middle;
    margin-right:.2rem;
    -webkit-animation: rotate 2.0s infinite linear;
    animation: rotate 2.0s infinite linear;
}
.pulldown,.pullup{
    width:100%;
    height:50px;
    position:relative;
    color:#888;
}
.clear{
   padding:10px 0px;
   font-size: .28rem;
   position:absolute;
   left:50%;
   top:5px;
   transform:translate(-50%,0) ;
}
.list-donetip{
    text-align:center;
    line-height: 50px;
    font-size: 0.28rem;
}

@-webikt-keyframes rotate{
    100% { -webkit-transform: rotate(360deg) }
}
@keyframes rotate{
    100% { transform: rotate(360deg) }
}
</style>