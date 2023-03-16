import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from './router/index'
const request=axios.create({
    baseURL:'http://127.0.0.1:5566'
})
request.interceptors.request.use((config)=>{
    if(!config.url?.match(/^\/api\//)){   
        (config.headers as any).Authorization=localStorage.getItem('valuetoken')
    }
    NProgress.start();   
    return config
},(error)=>{return Promise.reject(error)})
request.interceptors.response.use((respond)=>{
    NProgress.done();
    return respond
},(error)=>{ 
if(error.response.statusText=='Unauthorized'){
    localStorage.removeItem('valuetoken')
    router.push('/login')
}
return Promise.reject(error) })
export {request}