<template>
    <router-link
       :to="path"
    >
     <div class="cell-wrapper">
        <div class="cell-title">
            <img :src="getSrc" alt="">
            <span>{{cellData[0].title}}</span>
        </div>
        <div class="cell-allow-right">
            <i class="fa fa-chevron-right"></i>
        </div>
    </div>
    </router-link>
</template>

<script>
export default {
    name:'cell',
    data(){
        return {
            path:this.cellDatas[0].path,
            cellData:this.cellDatas,
            imgSrc:this.cellDatas[0].src
        }
    },
    props:{
        cellDatas:{
            type:Array
        }
    },
    components:{
        
    },
    computed:{
        getSrc(){
            return require(`../assets/`+this.imgSrc)
        }
    }
}
</script>
<style scoped>
.cell-wrapper{
    background-color:#fff;
    box-sizing:border-box;
    color:inherit;
    min-height: 48px;
    display:flex;
    font-size: 16px;
    overflow:hidden;
    padding: 0 10px;
    width: 100%;
    line-height: 48px;
    border-bottom: 1px solid #d9d9d9;
}
.cell-title{
    flex:1;
}
.cell-title img{
    width: 1.2rem;
    height: 1.2rem;
    vertical-align:middle;
    margin-right:0.4rem;
}
.cell-title span{
    display:inline-block;
    vertical-align:middle;
}
.cell-allow-right{
    color:#888;
}
a{
    text-decoration:none;
    color:inherit;
}
</style>