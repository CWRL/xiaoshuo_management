import { request } from "../../request";
type datatype={
    novalname:string,
    classify:string[]|string,
    status:string,
    abstarct:string,
    isvip:number,
    noviplinite?:number,
    avator:string
    id?:number
}
type data1type={
    novalname:string,
    capters:string,
    captersname:string,
    localaddress:string,
    onlineaddress:string,
    id?:number,
}
export  const getallnovals=(CurrentPage:number,pages:number,novalname:string)=>request({method:'get',url:`/content/getnovals?CurrentPage=${CurrentPage}&pages=${pages}&novalname=${novalname}`})
export const addnovalquest=(data:datatype)=>request({method:'post',url:'/content/addnoval',data})
export const updatenoval=(data:datatype)=>request({method:'post',url:'/content/updatenoval',data})
export const addcapters=(data:data1type)=>request({method:'post',url:'/content/addnovalcpaters',data})
export const getcapters=(novalname:string)=>request({method:'get',url:`/content/getcapters?novalname=${novalname}`})
export const downloadcapters=(localaddress:string)=>request({method:'get',url:`/downloaddocx?localaddress=${localaddress}`})
export const getnumberrequest=()=>request({method:'get',url:`/content/getsomecapters`})