<template>
    <el-card class="main">
        <input type="text" v-model="cwrl" placeholder="员工名称"
            style="outline:none;border:1px solid #00000030;height: 25px;">
        <el-button type="primary" @click="searchemployee">搜索</el-button><br>
        <el-button type="primary" style="margin-top:10px" @click="addemployee">新增</el-button>
        <el-table border style="width: 100%;margin-top: 15px;" :data="employeesvalue">
            <el-table-column prop="username" label="员工名称" width="250">
                <template v-slot="{ row }">
                    <el-image
                        style="width: 40px; height: 40px;vertical-align: middle;margin-left: 10px;border-radius: 50%;"
                        :src="row.avator" fit="fill" />
                    <span style="margin-left:15px">{{ row.username }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="permissions" label="员工职位" width="250" />
            <el-table-column prop="entryTime" label="入职时间" width="300" />
            <el-table-column label="操作" width="width" prop="data">
                <template v-slot="{ row, $index }">
                    <el-button type="success" icon="EditPen" @click="editemployee(row)"></el-button>
                    <el-button type="success" icon="Delete" @click="deleteemployee(row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <addemployees @updateemployeesinfo="updateinfo" ref="employeetable"></addemployees>
        <paginations @changcur="update"></paginations>
    </el-card>
</template>

<script setup lang='ts'>
import { ref, onMounted, provide } from 'vue'
import { useemployeesinfo, usesearch,usedelete} from '../../../../stores/employees/index'
import addemployees from './addemployees/index.vue'
const employeetable = ref()
const searchs = usesearch()
const deletes=usedelete()
type RootObject = {
    id: number;
    username: string;
    password: string;
    email: string;
    permissions: string;
    entryTime: string;
    avator:string
}
let CurrentPages = ref<number>(1)
let page = ref<number>(3)
const employeesinfo = useemployeesinfo()
let employeesvalue = ref<RootObject[]>()
let total = ref<number>(0)
const cwrl = ref('')
const status = ref<string>()
provide('status', status)
const isdialog = ref(false)
provide('isdialog', isdialog)
provide('total', total)
const addemployee = () => {
    status.value = '新增'
    isdialog.value = true
    employeetable.value.getallrules()
}
const updateinfo = async () => {
    await update(CurrentPages.value, page.value)
}
const editemployee = (row: any) => {
    employeetable.value.editvalue(row)
    status.value = '修改'
    isdialog.value = true
    employeetable.value.getallrules()

}
onMounted(async () => {
    await update(1, 3)
})
const update = async (CurrentPage: number, pages: number) => {
    CurrentPages.value = CurrentPage
    page.value = pages
    await employeesinfo.getemployees(CurrentPage, pages)
    employeesvalue.value = employeesinfo.employees
    total.value = employeesinfo.total
}
const searchemployee = async () => {
    if (cwrl.value) {
        await searchs.searchemployee(cwrl.value)
        employeesvalue.value=searchs.employeeinfo
    }
    else{
       await update(CurrentPages.value,page.value)
    }
}
const deleteemployee=async(row:any)=>{
    await deletes.deleteemployee(row.username)
    await update(CurrentPages.value, page.value)
}
</script>

<style  scoped>
.main {
    margin-top: 10px;
    height: 78vh;
}
</style>