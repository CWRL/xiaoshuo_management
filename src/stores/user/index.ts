import { defineStore } from "pinia";
import { storeName } from "../storeName";
import { loginrequest, exitrequest, userinforequest } from '../../api/user/index'
import { ElMessage } from 'element-plus'
type loginuser = {
    username: string,
    password: string
}
type userinfo={
    username:string,
    permissions:string,
    avator:string
}
export const uselogin = defineStore(storeName.LOGIN, {
    state: () => {
        return {
            token: localStorage.getItem('valuetoken') || '',
        }
    },
    actions: {
        async getlogin(logininfo: loginuser) {
            try {
                const m = await loginrequest(logininfo)
                if (m.status == 200) {
                    if (m.data.status === 1) {
                        localStorage.setItem('valuetoken', m.data.data.token)
                        return Promise.resolve({ state: 1, message: m.data.data.message })
                    }
                    else {
                        return Promise.reject(new Error(m.data.data))
                    }
                }
                else {
                    return Promise.reject(new Error(m.statusText))
                }
            } catch (error: any) {
                return Promise.reject(new Error(error.message))
            }
        }
    }
})
export const userexit = defineStore(storeName.EXIT, {
    state: () => {
        return {

        }
    },
    actions: {
        async getexit() {
            try {
                const m = await exitrequest()
                if (m.status === 200) {
                    if (m.data.status === 1) {
                        return Promise.resolve(m.data.data)
                    }
                    else {
                        return Promise.reject(new Error(m.data.data))
                    }
                }
                else {
                    return Promise.reject(new Error(m.statusText))
                }
            } catch (error: any) {
                return Promise.reject(new Error(error.response.data.message))
            }
        }
    }
})
export const useinfo = defineStore(storeName.USERINFO, {
    state: () => {
        return {
            userinfo:<userinfo>{}
        }
    },
    actions: {
       async getuserinfo() {
            try {
                const m=await userinforequest()
                if(m.status==200){
                    if(m.data.status==1){
                        this.userinfo=m.data.data
                    }
                    else{
                        ElMessage.error(m.data.data)
                    }
                }
            } catch (error:any) {
                ElMessage.error(error.response.data.message)
            }
        }
    }
})