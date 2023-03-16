import { defineStore } from "pinia";
import { storeName } from "../storeName";
import { getallnovals, addnovalquest, updatenoval, addcapters, getcapters, getnumberrequest } from '../../api/noval/index'
import { ElMessage } from "element-plus";
type novaltype = {
    abstarct: string,
    classify: string,
    date: string,
    id: number,
    isunder: number,
    novalname: string,
    reading: number,
    status: string,
    username: string,
    isvip: number,
    noviplinite: number,
    avator: string
}
type datatype = {
    novalname: string,
    classify: string[] | string,
    status: string,
    abstarct: string,
    isvip: number,
    noviplinite?: number,
    avator: string
}
type data1type = {
    novalname: string,
    capters: string,
    captersname: string,
    localaddress: string,
    onlineaddress: string,
    id?: number
}
type data2type = {
    id: number,
    novalname: string,
    username: string,
    capters: string,
    captersname: string,
    docxpath: string,
    localaddress: string,
    audit: string
}
export const usegetallnovals = defineStore(storeName.ALLNOVALS, {
    state: () => {
        return {
            novalinfos: <novaltype[]>[],
            total: 0
        }
    },
    actions: {
        async getnovals(CurrentPage: number, pages: number, novalname: string) {
            try {
                const m = await getallnovals(CurrentPage, pages, novalname)
                if (m.status === 200) {
                    if (m.data.status === 1) {
                        this.novalinfos = m.data.data
                        this.total = m.data.total
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
export const useaddnoval = defineStore(storeName.ADDNOVAL, {
    state: () => {
        return {

        }
    },
    actions: {
        async addnoval(data: datatype) {
            try {
                const m = await addnovalquest(data)
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
export const useupdatenovalinfo = defineStore(storeName.UPDATENOVAL, {
    state: () => {
        return {

        }
    },
    actions: {
        async getupdatenoval(data: datatype) {
            try {
                const m = await updatenoval(data)
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
export const useaddcapters = defineStore(storeName.ADDCAPTERS, {
    state: () => {
        return {

        }
    },
    actions: {
        async getaddcapters(data: data1type) {
            try {
                const m = await addcapters(data)
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
export const usegetcapters = defineStore(storeName.GETCAPTERS, {
    state: () => {
        return {
            captersinfos: <data2type[]>[]
        }
    },
    actions: {
        async getcaptersrequest(novalname: string) {
            try {
                const m = await getcapters(novalname)
                if (m.status === 200) {
                    if (m.data.status === 1) {
                        this.captersinfos = m.data.data
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
export const usegetnumber = defineStore(storeName.CAPTERSNUMBER, {
    state: () => {
        return {
            captersnumber:<data2type[]>[]
        }
    },
    actions: {
        async getcaptersnumber() {
            try {
                const m = await getnumberrequest()
                if (m.status == 200) {
                    if (m.data.status == 1) {
                        this.captersnumber=m.data.data
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