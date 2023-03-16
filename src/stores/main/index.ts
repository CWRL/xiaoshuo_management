import { defineStore } from "pinia";
import { storeName } from "../storeName";
import { allemployeescount, allbookscount, employeesdata, booksview } from "../../api/main/index";
import { ElMessage } from 'element-plus'
type employeestype = {
    permissions: string;
    count: number;
}
export const useemployeescount = defineStore(storeName.EMPLOYEESCOUNT, {
    state: () => {
        return {
            employeescount: <number>0
        }
    },
    actions: {
        async getemployeescount() {
            try {
                const m = await allemployeescount()
                if (m.status === 200) {
                    if (m.data.status === 1) {
                        this.employeescount = m.data.data
                    }
                }
            } catch (error: any) {
                ElMessage.error(error.response.data.message || error.message)
            }
        }
    }
})
export const usebookscount = defineStore(storeName.ALLBOOKSCOUNT, {
    state: () => {
        return {
            bookscount: <number>0
        }
    },
    actions: {
        async getbookscount() {
            try {
                const m = await allbookscount()
                if (m.status === 200) {
                    if (m.data.status === 1) {
                        this.bookscount = m.data.data
                    }
                }
            } catch (error: any) {
                ElMessage.error(error.response.data.message || error.message)
            }
        }
    }
})
export const useemployeesdata = defineStore(storeName.EMPLOYEESDATE, {
    state: () => {
        return {
            employessdata: <employeestype[]>[]
        }
    },
    actions: {
        async getemployeesdata() {
            try {
                const m = await employeesdata()
                if (m.status === 200) {
                    if (m.data.status == 1) {
                        this.employessdata = m.data.data
                    }
                }
            } catch (error: any) {
                ElMessage.error(error.response.data.message || error.message)
            }
        }
    }
})
export const usebooksview = defineStore(storeName.BOOKSVIEW, {
    state: () => {
        return {
            booksdataview:<any>{}
        }
    },
    actions: {
        async getbooksviewdata() {
            try {
                const m = await booksview()
                if (m.status === 200) {
                    if (m.data.status === 1) {
                        this.booksdataview = m.data.data
                    }
                }
            } catch (error:any) {
                ElMessage.error(error.response.data.message || error.message)
            }
        }
    }
})