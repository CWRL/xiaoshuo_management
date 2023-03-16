import { request } from "../../request";
type addvalue={
    rolename:string,
    roledescribe:string
}
export const rolevaluerequest=(CurrentPage:number,pages:number)=>request({method:'get',url:`/role/rolevalue?CurrentPage=${CurrentPage}&pages=${pages}`})
export const addrolerequest=(data:addvalue)=>request({method:'post',url:'/role/addrole',data})
export const changestatusrequest=(rolename:string,status:number)=>request({method:'get',url:`/role/changestatus?rolename=${rolename}&status=${status}`})
export const updaterolerequest=(id:number,data:addvalue)=>request({method:'post',url:`/role/updaterule?id=${id}`,data})
export const deleterolerequest=(id:number)=>request({method:'get',url:`/role/delete?id=${id}`})