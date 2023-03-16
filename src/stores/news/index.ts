import { defineStore } from "pinia";
import { isreadyrequest, isdeleterequest, iscollectionrequest, isdeleteupdaterequest } from '../../api/news/index'
import { storeName } from "../storeName";
import { ElMessage } from "element-plus";
export const useisready = defineStore(storeName.ISREADY, {
    actions: {
        async getisready(id: number) {
            try {
                const m = await isreadyrequest(id)
                if (m.status == 200) {
                    if (m.data.status == 1) {

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
export const useisdelete = defineStore(storeName.ISDELETE, {
    actions: {
        async getisdelete(id: number) {
            try {
                const m = await isdeleterequest(id)
                if (m.status == 200) {
                    if (m.data.status == 1) {

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
export const useiscollection = defineStore(storeName.ISCOLLECTION, {
    actions: {
        async getiscollection(id: number) {
            try {
                const m = await iscollectionrequest(id)
                if (m.status === 200) {
                    if (m.data.status === 1) {

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
export const userenew = defineStore(storeName.RENEW, {
    actions: {
        async getrenew(id: number) {
            try {
                const m = await isdeleteupdaterequest(id)
                if (m.status === 200) {
                    if (m.data.status === 1) {

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
