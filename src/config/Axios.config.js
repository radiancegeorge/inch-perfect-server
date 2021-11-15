import Axios from "axios";
import {test} from "./config.json"
const axios = Axios.create({
    baseURL: test
})

axios.interceptors.request.use(config => {
    const nonProtected = ["/user/login", "/user/register"];
    if(!nonProtected.includes(config.url)){
        config.headers = {
            "Authorization":`Bearer ${JSON.parse(window.localStorage.getItem("token"))}`
        }
    }
    config.headers["content-type"]= "application/json";
    // console.log(config.headers)
    return config
})

export default axios