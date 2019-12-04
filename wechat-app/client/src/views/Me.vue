<template>
    <div>
      <Header :title="title" :btn_icon="btnIcon" isLeft  @click="rightClick"/>
    </div>
</template>

<script>
import Header from '../components/Header'
export default{
    name: 'me',
    components:{
        Header
    },
    data(){
        return {
            title:'Me',
            btnIcon:'plus'
        }
    },
    methods:{
        rightClick(){
            console.log("this is "+ this.title+ " right plus click");
        }
    }
}
</script>
