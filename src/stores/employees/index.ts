import { defineStore } from "pinia";
import { employeesrequest, addemployees, searchrequest, deleterequest, getallroles } from '../../api/employees/index'
import { storeName } from '../storeName/index'
import { ElMessage, messageConfig } from 'element-plus'
type RootObject = {
    id: number;
    username: string;
    password: string;
    email: string;
    permissions: string;
    entryTime: string;
    avator: string
}
type addemployeetype = {
    username: string,
    password: string,
    email: string,
    avator: string
}
type allrules = {
    id: number,
    rolename: string,
    roledescribe: string,
    status: number
}
export const useemployeesinfo = defineStore(storeName.EMPLOYEES, {
    state: () => {
        return {
            employees: <RootObject[]>[],
            total: 0
        }
    },
    actions: {
        async getemployees(CurrentPage: number, pages: number) {
            try {
                const m = await employeesrequest(CurrentPage, pages)
                if (m.status === 200) {
                    if (m.data.status == 1) {
                        this.employees = m.data.data
                        this.total = m.data.total
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
export const useaddemployee = defineStore(storeName.ADDEMPLOYEE, {
    state: () => {
        return {

        }
    },
    actions: {
        async addemployeessy(data: addemployeetype, username?: string) {
            try {
                const m = await addemployees(data, username)
                if (m.status == 200) {
                    if (m.data.status == 1) {
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
                ElMessage.error(error.response?.data?.message || error.message)
            }
        }
    }
})
export const usesearch = defineStore(storeName.SEARCH, {
    state: () => {
        return {
            employeeinfo: <RootObject[]>[]
        }
    },
    actions: {
        async searchemployee(username: string) {
            try {
                const m = await searchrequest(username)
                if (m.status == 200) {
                    if (m.data.status == 1) {
                        this.employeeinfo = m.data.data
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
export const usedelete = defineStore(storeName.DELETE, {
    state: () => {
        return {

        }
    },
    actions: {
        async deleteemployee(username: string) {
            try {
                const m = await deleterequest(username)
                if (m.status == 200) {
                    if (m.data.status == 1) {
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
export const useallroles = defineStore(storeName.ALLRULES, {
    state: () => {
        return {
            allroles: <allrules[]>[]
        }
    },
    actions: {
        async getallrules() {
            try {
                const m = await getallroles()
                if (m.status == 200) {
                    if (m.data.status === 1) {
                        this.allroles = m.data.data
                    }
                    else {
                        ElMessage.error(m.data.data)
                    }
                }
            } catch (error:any) {
                ElMessage.error(error.response?.data?.message || error.message)
            }
        }
    }
})
