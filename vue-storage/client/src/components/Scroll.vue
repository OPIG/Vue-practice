<template>
    <div class="scroll-wrap" ref="wrapper">
        <div>
            <!-- 下拉刷新-->
            <div class="pulldown">
                <div class="clear">
                    <div class="fl">
                        <img src="../assets/loading.png" alt="">
                        <div class="fl">下拉刷新</div>
                    </div>
                </div>
            </div>
            <slot></slot>

            <!--上拉加载-->
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'

export default {
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
        return{
            scroll:{}
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
            console.log(this.scroll);
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
.pulldown{
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

@-webikt-keyframes rotate{
    100% { -webkit-transform: rotate(360deg) }
}
@keyframes rotate{
    100% { transform: rotate(360deg) }
}
</style>