import { request } from "../../request";
export const allbookrequest=(novalname:string='')=>request({method:'get',url:`/book/allbooks?novalname=${novalname}`})
export const updatestatusrequest=(id:number,isunder:number)=>request({method:'get',url:`/book/changestatus?id=${id}&isunder=${isunder}`})
export const updateauditrequest=(id:number,audit:string)=>request({method:'get',url:`/book/changeaudit?id=${id}&audit=${audit}`})
