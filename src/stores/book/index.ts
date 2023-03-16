import { defineStore } from "pinia";
import { storeName } from "../storeName";
import { allbookrequest, updatestatusrequest, updateauditrequest } from '../../api/book/index'
import { ElMessage } from 'element-plus'
type RootObject = {
    id: number;
    username: string;
    novalname: string;
    classify: string;
    date: string;
    status: string;
    isunder: number;
    reading: number;
    abstarct: string;
    isvip: number;
    noviplinite: number;
    avator: string;
}
export const usegetallbooks = defineStore(storeName.ALLBOOKS, {
    state: () => {
        return {
            allbooksinfo: <RootObject[]>[]
        }
    },
    actions: {
        async getallbooks(novalname:string='') {
            try {
                const m = await allbookrequest(novalname)
                if (m.status === 200) {
                    if (m.data.status === 1) {
                        this.allbooksinfo = m.data.data
                    }
                    else {
                        ElMessage.error(m.data.data)
                    }
                }
            } catch (error: any) {
                ElMessage.error(error.response.data.message || error.message)
            }
        }
    }
})
export const useupdatestatus = defineStore(storeName.UPDATESTATUS, {
    actions: {
        async getupdatestatus(id: number, isunder: number) {
            try {
                const m = await updatestatusrequest(id, isunder)
                if (m.status === 200) {
                    if (m.data.status === 1) {
                        ElMessage({
                            type: "success",
                            message: m.data.data
                        })
                    }
                    else {
                        ElMessage.error(m.data.data)
                    }
                }
            } catch (error: any) {
                ElMessage.error(error.response.data.message || error.message)
            }
        }
    }
})
export const useupdateaudit = defineStore(storeName.UPDATEAUDIT, {
    actions: {
        async getupdateaudit(id: number, audit: string) {
            try {
                const m = await updateauditrequest(id, audit)
                if (m.status === 200) {
                    if (m.data.status === 1) {
                        ElMessage({
                            type: "success",
                            message: m.data.data
                        })
                    }
                    else {
                        ElMessage.error(m.data.data)
                    }
                }
            } catch (error:any) {
                ElMessage.error(error.response.data.message||error.message)
            }
        }
    }
})