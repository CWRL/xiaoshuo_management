import { request } from "../../request";
export const  getclassifyrequest=()=>request({method:'get',url:'/classify/getclassify'})
export const addclassifyrequest=(data:any)=>request({method:'post',url:'/classify/addclassify',data})
export const getRecommendedrequest=(classifyname:string)=>request({method:'post',url:`/classify/getRecommended?classifyname=${classifyname}`})
export const allnovalsrequest=()=>request({method:'get',url:'/classify/allclassifynovals'})
export const updateRecommendedrequest=(classifyname:string,Recommended:string)=>request({method:'get',url:`/classify/updateRecommended?classifyname=${classifyname}&Recommended=${Recommended}`})
export const updateunderrequest=(id:number,isdelete:number)=>request({method:'get',url:`/classify/underclassify?id=${id}&isdelete=${isdelete}`})
export const updateclassifyname=(id:number,classifyname:string)=>request({method:'get',url:`/classify/updateclassifyname?id=${id}&classifyname=${classifyname}`})
export const deleteclassify=(id:number)=>request({method:'get',url:`/classify/deleteclassify?id=${id}`})