<template>
    <div class="find">
        <Header title="发现" btn_icon="plus" isRight/>
        <div class="content">
            <Cell :src="cellData.src" :title="cellData.title" :path="cellData.path"></Cell>
        </div>
    </div>
</template>

<script>
import Header from "../components/Header";
import Cell from "../components/Cell";

export default{
    name:'discover',
    components:{
        Header,
        Cell
    },
    data(){
        return{
            cellData:{
                src:"moment.png",
                title:"朋友圈",
                path:"moments"
            }
        }
    }
}
</script>
<style scoped>
.find{
    width:100%;
    height: calc(100% - 55px);
    position:relative;
    box-sizing:border-box;
}
.content{
    width:100%;
    height: calc(100% - 50px);
    margin-top:50px;
}
</style>