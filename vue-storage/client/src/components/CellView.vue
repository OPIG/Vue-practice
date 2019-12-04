<template>
    <div class="cell-circle">
        <div class="img-wrapper">
            <img :src="momentObj.img" alt="">
        </div>
        <div class="content-wrapper">
            <div class="cell-name">
                {{momentObj.name}}
            </div>
            <div class="cell-text" v-if="momentObj.text">
                {{momentObj.text}}
            </div>
            <div class="cell-img" v-if="momentObj.imgs.length > 0">
                <img 
                    v-for="(item,index) in momentObj.imgs"
                    :key="index"
                    :src="item" alt=""/>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'cell_cirlce',
    props:{
        momentObj:Object
    }
}
</script>
<style scoped>
.cell-circle{
    width: 100%;
    box-sizing: border-box;
    padding:16px;
    border-bottom:1px solid #d9d9d9;
    display:flex;
    flex-direction:row;
}
.img-wrapper{
    flex:1;
}
.img-wrapper img{
    width: 40px;
    height: 40px;
}
.content-wrapper div{
    margin-top:8px;
    word-wrap:break-word;
}
.content-wrapper .cell-img{
    width: 100%;
    overflow: hidden;
}
.content-wrapper .cell-img img{
    width: 31%;
    height: 6rem;
    float:left;
    margin-right:5px;
    margin-bottom:5px;
}
</style>