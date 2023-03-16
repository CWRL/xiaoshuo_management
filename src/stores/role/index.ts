import { defineStore } from "pinia";
import { rolevaluerequest, addrolerequest, changestatusrequest, updaterolerequest, deleterolerequest } from '../../api/role/index'
import { storeName } from '../storeName'
import { ElMessage } from "element-plus";
type roletype = {
    id: number,
    rolename: string,
    roledescribe: string,
    status: number
}
type addvalue = {
    rolename: string,
    roledescribe: string
}
export const userolevalue = defineStore(storeName.ROLEVALUE, {
    state: () => {
        return {
            rolevalue: <roletype[]>[],
            total: 0
        }
    },
    actions: {
        async getrolevalue(CurrentPage: number, pages: number) {
            try {
                const m = await rolevaluerequest(CurrentPage, pages)
                if (m.status == 200) {
                    if (m.data.status == 1) {
                        this.rolevalue = m.data.data
                        this.total = m.data.total
                    }
                    else {
                        ElMessage.error(m.data.data)
                    }
                }
            } catch (error: any) {
                console.log('###########')
                ElMessage.error(error.response?.data?.message || error.message)
            }
        }
    }
})
export const useaddrole = defineStore(storeName.ADDROLE, {
    state: () => {
        return {

        }
    },
    actions: {
        async postaddrole(data: addvalue) {
            try {
                const m = await addrolerequest(data)
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
                ElMessage.error(error.response?.data?.message || error.message)
            }
        }
    }
})
export const usechangestatus = defineStore(storeName.STATUS, {
    state: () => {
        return {

        }
    },
    actions: {
        async changestatus(rolename: string, status: number) {
            try {
                const m = await changestatusrequest(rolename, status)
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
                ElMessage.error(error.response?.data?.message || error.message)
            }
        }
    }
})
export const useupdaterole = defineStore(storeName.UPDATEROLE, {
    state: () => {
        return {

        }
    },
    actions: {
        async updaterole(id: number, data: addvalue) {
            try {
                const m = await updaterolerequest(id, data)
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
                ElMessage.error(error.response?.data?.message || error.message)
            }
        }
    }
})
export const usedeleterole = defineStore(storeName.DELETEROLE, {
    state: () => {
        return {

        }
    },
    actions: {
        async deleterole(id: number) {
            try {
                const m = await deleterolerequest(id)
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
                ElMessage.error(error.response?.data?.message||error.message)
            }
        }
    }
})