# plugins or element
- 1 axios  //请求拦截 axios.interceptors.request.use  //响应拦截 axios.interceptors.response.use   npm install --save axios
- 2 slot
- 3 active-class
- 4 default router && 子路由
- 5 jwt-decode 解码  npm install --save jwt-decode
- 6.better-scoll 滚动  npm install --save jwt-decode  当better-scroll 遇见vue： https://juejin.im/post/59300b2e2f301e006bcdd91c
- 跨域 vue.config.js
 ``` javascript 
 module.exports={
    devServer:{
        open: true,
        host: 'localhost',
        port:8080,
        https:false,
        proxy:{
            //配置跨域
            '/api':{
                target:'http://localhost:5000/api',
                ws:true,
                changeOrign:true,
                pathRewrite:{
                    '^/api':''
                }
            }
        }

    }
}

 ```

# client

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


tet@test.com 123
emerleite@gmail.com
aaa@aaa.com
bbb123@bbb.com
