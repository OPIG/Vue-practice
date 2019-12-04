<template>
    <div class="header">
        <div class="header-button is-left" v-show="isLeft">
            <i class="fa fa-chevron-left"></i>
            <button @click="$router.go(-1)">Go back</button>
        </div>
        <h1 class="header-title">{{title}}</h1>
        <div class="header-button is-right" is-show="btn_icon">
            <button @click="$emit('click')">
                <i :class="`fa fa-`+btn_icon"/>
            </button>
        </div>
    </div>
</template>

<script>
    export default{
        name:'headers',
        props:{
            title:String,
            btn_icon:String,
            isLeft:{
                type:Boolean,
                default:false
            }
        }
    }
</script>
<style scoped>
.header{
    align-items:center;
    background-color:#272626;
    box-sizing:border-box;
    color:#fff;
    display:flex;
    font-size:18px;
    height: 50px;
    line-height: 1;
    padding: 0 10px;
    position:fixed;
    text-align:center;
    white-space:nowrap;
    width: 100%;
    top: 0;
    z-index:99;
}
.header-button button{
    background-color:transparent;
    border:0;
    box-shadow:none;
    color: inherit;
    display: inline-block;
    padding: 0;
    font-size:inherit;
    outline: none;
}
.header-title{
    flex:1;
}
.is-left{
    text-align:left;
}
.is-right{
    text-align:right;
}
</style>