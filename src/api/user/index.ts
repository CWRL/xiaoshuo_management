import {request} from '../../request'
type loginuser={
    username:string,
    password:string
}
export const loginrequest=(data:loginuser)=>request({method:'post',url:'/api/login',data,})
export const exitrequest=()=>request({method:'get',url:'/exit/userexit'})
export const userinforequest=()=>request({method:'get',url:'/user/userinfo'})
