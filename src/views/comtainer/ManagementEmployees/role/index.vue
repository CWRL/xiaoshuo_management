<template>
    <el-card class="box-card">
        <el-button type="primary" @click="addrolebtn">新增</el-button>
        <el-table :data="roleData" border style="width: 100%;margin-top: 20px;" 
        
        :cell-style="{color:'black','font-weight':400}">
            <el-table-column prop="rolename" label="角色" width="180" />
            <el-table-column prop="roledescribe" label="角色描述" width="520" />
            <el-table-column prop="status" label="状态" width="180">
                <template v-slot="{ row }">
                    <el-switch v-model="row.status" size="large" :active-value="0" :inactive-value="1" @change="swichchange(row)"/>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="操作">
                <template v-slot="{ row }">
                    <el-button type="success" icon="Edit" @click="editrole(row)"></el-button>
                    <el-button type="danger" icon="Delete" @click="deleterolebtn(row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <paginations @changcur="changes"></paginations>
        <addrole @addroleupdate="addchange" ref="addroleinfo"></addrole>
    </el-card>
</template>

<script setup lang='ts'>
// :row-style="tableRowClassName"
import {
    Edit,
    Setting,
    Delete
} from '@element-plus/icons-vue'
import { userolevalue,usechangestatus,usedeleterole} from '../../../../stores/role/index'
import { onMounted, ref,provide, type CSSProperties} from 'vue';
import addrole from './addrole/index.vue'
let addroleinfo=ref()
const usestatus=usechangestatus()
const usedeletes=usedeleterole()
let CurrentPages=ref<number>(1)
let page=ref<number>(3)
const userole = userolevalue()
type roletype = {
    id: number,
    rolename: string,
    roledescribe: string,
    status: number
}
const roleData = ref<roletype[]>([{
    id:0,
    rolename:'',
    roledescribe:'',
    status:1
}])
const total=ref<number>(0)
provide('total',total)
const keydrawer=ref<boolean>(false)
provide('keydrawer',keydrawer)
const keyname=ref<string>('')
provide('keyname',keyname)
const update = async (CurrentPage:number,pages:number) => {
    CurrentPages.value=CurrentPage
    page.value=pages
    await userole.getrolevalue(CurrentPage,pages)
    roleData.value = userole.rolevalue
    total.value=userole.total
}
const addrolebtn=()=>{
    keydrawer.value=true
    keyname.value='新增'
}
onMounted(async () => {
    await update(1,3)
})
const tableRowClassName = ({
    row,
    rowIndex,
}: {
    row: roletype|undefined
    rowIndex: number
}) => {
    if(rowIndex===1){
        {background:'grey'}
    }
}
const changes=async(CurrentPage:number,pages:number)=>{
    CurrentPages.value=CurrentPage,
    page.value=pages
    await update(CurrentPages.value, page.value)
}
const addchange=async()=>{
   await update(CurrentPages.value,page.value)
}
const swichchange=async(value:any)=>{
   await usestatus.changestatus(value.rolename,value.status)
   await update(CurrentPages.value,page.value)
}
const editrole=(row:any)=>{
    keydrawer.value=true
    keyname.value='修改'
    addroleinfo.value.changeroleinfo(row)
}
const deleterolebtn=async(row:any)=>{
    await usedeletes.deleterole(row.id)
    await update(CurrentPages.value,page.value)
}
</script>

<style  scoped>
.warning-row {
    --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table .success-row {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
}

.text {
    font-size: 14px;
}

.item {
    padding: 18px 0;
}

.box-card {
    width: 99%;
    height: 77.5vh;
    margin-top: 10px;
}
</style>