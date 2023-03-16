import { request } from "../../request";
export const isreadyrequest=(id:number)=>request({method:'get',url:`/news/updateisready?id=${id}`})
export const isdeleterequest=(id:number)=>request({method:'get',url:`/news/deletenews?id=${id}`})
export const iscollectionrequest=(id:number)=>request({method:'get',url:`/news/updatecollection?id=${id}`})
export const isdeleteupdaterequest=(id:number)=>request({method:'get',url:`/news/renew?id=${id}`})
