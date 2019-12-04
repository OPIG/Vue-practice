<template>
    <div class="find">
      <Header :title="cellData[0].title" :btn_icon="cellData[0].btnIcon" isLeft  @click="rightClick"/>
      <div class="content">
        <cell :cellDatas="cellData"/>
      </div>
    </div>
</template>

<script>
import Header from '../components/Header'
import Cell from '../components/Cell'

export default{
    name: 'discover',
    components:{
        Header,
        Cell
    },
    data(){
        return {
            cellData:[{
                title:'Discovery',
                btnIcon:'plus',
                src:'moment.png',
                path:"moments"
            }]
        }
    },
    methods:{
        rightClick(){
            console.log("this is "+ this.cellData[0].title+ " right plus click");
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