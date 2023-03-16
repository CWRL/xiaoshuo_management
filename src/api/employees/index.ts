import { request } from "../../request";
type addemployeetype={
    username:string,
    password:string,
    email:string,
    avator:string
}
export const employeesrequest=(CurrentPage:number,pages:number)=>request({method:'get',url:`/employees/employees?CurrentPage=${CurrentPage}&pages=${pages}`})
export const addemployees=(data:addemployeetype,username?:string)=>{
    if(username){
       return request({method:'post',url:`/user/edit?username=${username}`,data})
    }
    else{
       return request({method:'post',url:'/api/reguser',data})
    }
}
export const searchrequest=(username:string)=>request({method:'get',url:`/user/search?username=${username}`})
export const deleterequest=(username:string)=>request({method:'get',url:`/employees/delete?username=${username}`})
export const getallroles=()=>request({method:'get',url:'/role/getallroles'})