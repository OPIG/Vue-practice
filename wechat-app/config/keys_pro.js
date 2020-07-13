module.exports = {
    mongoURI:process.env.MONGO_URI, //环境变量，其中MONGO_URI 为自定义名字 Heroku
    secretOrKey:process.env.SECRET_OR_KEY//环境变量，其中SECRET_OR_KEY 为自定义名字
}