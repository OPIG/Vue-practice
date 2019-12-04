# 使用的组件 module

- 1 npm install --save express： 内含router
- 2 npm install --save mongoose: mongoDB  [https://cloud.mongodb.com/]
- 3 npm install --save body-parser: post 请求传递body; `bodyParser.urlencoded({ extended: false })`, `bodyParser.json()`  [https://www.npmjs.com/package/body-parser]
- 4 npm install --save bcrypt: 密码加密  [https://www.npmjs.com/package/bcrypt]
- 5 npm install --save gravatar: 第三方控件获取avatar   npm i gravatar   [https://www.npmjs.com/package/gravatar]
- 6 npm install --save jsonwebtoken  令牌，钥匙
- 7 npm install --save passport 
- 8 npm install --save passport-jwt 
- 9 npm install --save concurrently: 前后端连载(一同启动)



//服务器端解决跨域问题  --安全性不好
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Content-Type');
    res.header('Access-Control-Allow-Methods','PUT,GET,POST,DELETE,OPTIONS');
    next();
}) 