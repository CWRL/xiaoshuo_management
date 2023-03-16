import { defineStore } from "pinia";
import { storeName } from "../storeName";
import { getclassifyrequest, addclassifyrequest, getRecommendedrequest, allnovalsrequest, updateRecommendedrequest, updateunderrequest, updateclassifyname, deleteclassify } from '../../api/classify/index'
import { ElMessage } from "element-plus";
type classifytype = {
    id: number,
    classifyname: string,
    isdelete: number,
    Recommended: number[],
    limitfree: number[]
}
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
export const usegetclassify = defineStore(storeName.GETCLASSIFY, {
    state: () => {
        return {
            classifyinfo: <classifytype[]>[]
        }
    },
    actions: {
        async getclassify() {
            try {
                const m = await getclassifyrequest()
                if (m.status === 200) {
                    if (m.data.status === 1) {
                        this.classifyinfo = m.data.data.map((value: any) => {
                            value.Recommended = JSON.parse(value.Recommended)
                            value.limitfree = JSON.parse(value.limitfree)
                            return value
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
export const useaddclassify = defineStore(storeName.ADDCLASSIFY, {
    actions: {
        async getaddclassify(data: any) {
            try {
                const m = await addclassifyrequest(data)
                if (m.status === 200) {
                    if (m.data.status === 1) {
                        ElMessage({
                            type: 'success',
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
export const useRecommended = defineStore(storeName.GETRECOMMENDED, {
    state: () => {
        return {
            Recommended: <RootObject[]>[]
        }
    },
    actions: {
        async getRecommend(classifyname: string) {
            try {
                const m = await getRecommendedrequest(classifyname)
                if (m.status === 200) {
                    if (m.data.status === 1) {
                        this.Recommended = m.data.data
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
export const useclassifynoval = defineStore(storeName.CLASSIFYALLNOVAL, {
    state: () => {
        return {
            allnovals: <RootObject[]>[]
        }
    },
    actions: {
        async getclassifynovals() {
            try {
                const m = await allnovalsrequest()
                if (m.status === 200) {
                    if (m.data.status === 1) {
                        this.allnovals = m.data.data
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
export const useupdaterecommended = defineStore(storeName.UPDATERECOMMENDED, {
    actions: {
        async getupdaterecommended(classifyname: string, Recommended: string) {
            try {
                const m = await updateRecommendedrequest(classifyname, Recommended)
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
export const useupdateunder = defineStore(storeName.UPDATEUNDER, {
    actions: {
        async getupdateunder(id: number, isdelete: number) {
            try {
                const m = await updateunderrequest(id, isdelete)
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
export const useupdateclassify = defineStore(storeName.UPDATECALSSIFYNAME, {
    actions: {
        async getupdateclassifyname(id: number, classifyname: string) {
            try {
                const m = await updateclassifyname(id, classifyname)
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
export const usedeleteclassify = defineStore(storeName.DELETECLASSIFY, {
    actions: {
        async getdeleteclassify(id: number) {
            try {
                const m = await deleteclassify(id)
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