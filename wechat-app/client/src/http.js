import axios from 'axios';
import router from './router/router'

//请求拦截
axios.interceptors.request.use(
    config => {
        if(localStorage.wxpyqToken){
            config.headers.Authorization = localStorage.wxpyqToken;
        }
        return config;
    },error => {
        return Promise.reject(error);
    }
)
//响应拦截
axios.interceptors.response.use(
    res => {
        return res;
    },error => {
        const { status } = error.response;
        if(status == 401){
            alert("token 过期，请重新登陆");
            localStorage.removeItem("wxpyqToken");
            router.push('/login');
        }else{
            //错误提醒
            alert(error.response.data);
        }
            return Promise.reject(error);
        }
)


export default axios;