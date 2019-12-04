<template>
    <div class="tabbar">
        <router-link 
            class="tab-item"
            v-for="(item,index) in data"
            :key="index"
            :to="item.path"
            active-class="is-selected"
        >
        <div class="tab-item-icon">
            <i :class="'fa fa-'+item.icon"></i>
        </div>
        <div class="tab-item-label">
                {{item.title}}
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name:'tabbar',
    props:{
        data:{
            type:Array
        }
    },
    components:{}
}
</script>

<style scoped>
.tabbar{
    width: 100%;
    height: 55px;
    position:fixed;
    bottom:0;
    left:0;
    box-sizing: border-box;
    display:flex;
    text-align:center;
    background-color:#fafafa;
    background-position:0 0;
}
.tab-item{
    display:block;
    padding: 7px 0;
    flex:1;
}
.tab-item-icon{
    width: 24px;
    height: 24px;
    margin: 0px auto;
}
.tab-item-icon i{
    font-size:1.3rem;
}
.tab-item-label{
    color:inherit;
    font-size: 12px;
    line-height: 1;
}
a{
    text-decoration: none;
    color:#888;
}
.is-selected{
    color: #20af0e;
}
</style>