import { request } from "../../request";
export const allemployeescount=()=>request({method:'get',url:'/main/allemployees'})
export const allbookscount=()=>request({method:'get',url:'/main/allnovals'})
export const employeesdata=()=>request({method:'get',url:'/main/weekcount'})
export const booksview=()=>request({method:'get',url:'/main/fivebookscount'})