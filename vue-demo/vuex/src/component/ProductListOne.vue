<template>
    <div id="product-list-one">
        <h2>Product List One</h2>
        <ul>
             <li v-for="product in saleProducts">
                <span class="name">{{product.name}}</span>
                <span class="name">${{product.price}}</span>
            </li>
        </ul>
        <button @click="reducePrices(100)">Price reduce</button>
    </div>
</template>

<script>
   export default{
        computed:{
            productsData(){
                return this.$store.state.products
            },
            saleProducts(){
                return this.$store.getters.saleProducts;
            }    
        },
         methods:{
             reducePrices(amount){
                /*this.$store.state.products.forEach(product=>{
                    product.price-=1;
                })*/
                // this.$store.commit('reducePrice');
                this.$store.dispatch('acReducePrice',amount);
             }
         }
   }
</script>

<style>
</style>