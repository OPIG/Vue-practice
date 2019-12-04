<template>
    <div id="product-list-two">
        <h2>Product List Two</h2>
        <ul>
            <li v-for="product in saleProducts">
                <span class="name">{{product.name}}</span>
                <span class="name">${{product.price}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default{
         computed:{
            productsData(){
                return this.$store.state.products
            },
            saleProducts(){
//                  var saleProductData=this.$store.state.products.map(product=>{
 //                       return {
 //                           name:'**'+product.name+"**",
 //                           price: "price:"+product.price*2
 //                       }
 //                   });
  //                  
                return this.$store.getters.saleProduct 
            }
        }    
    }
</script>

<style>
</style>