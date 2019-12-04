import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const stores =new Vuex.Store({
    strict:true,
    state:{
        products:[
            {"name":"Jack Ma","price":200},
            {"name":"James Ma","price":140},
            {"name":"Dongmei Ma","price":20},
            {"name":"Dk Ma","price":10}
          ]
    },
    getters:{
        saleProducts:(state)=>{
            var saleProductData=state.products.map((product)=>{
                return {
                    name:'**'+product.name+"**",
                    price: "price:"+product.price*2
                };
            });
            return saleProductData;
        },
        saleProduct:(state)=>{
            var saleProductData=state.products.map((product)=>{
                return {
                    name:'**'+product.name+"**",
                    price: "price:"+product.price/2
                };
            });
            return saleProductData;
        } 
    },
    mutations:{
        reducePrice:(state,payLoad)=>{
            //setTimeout(function(){
                state.products.forEach(product=>{
                    product.price-=payLoad;
                })
           // },3000)
            
        }
    },
    actions:{
        acReducePrice:(context,payload)=>{
            setTimeout(function(){

                context.commit('reducePrice',payload);
            },3000)
        }
    }
})