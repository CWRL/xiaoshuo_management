<template>
    <el-dialog v-model="isdialogs" title="推荐的书籍" width="1000" :close-on-click-modal="false" @open="opendialogmethod" @close="closedialogbtn">
        <input type="text" style="line-height: 25px;outline: none;" placeholder="输入书籍名称" v-model="searchvalue">
        <el-button type="primary" @click="searchbtn">搜索</el-button>
        <el-button type="primary" circle :icon="Check" size="small" @click="checkboxbtn"/>
        <br>
        <el-table :data="classifyvalues" height="400px" border @selection-change="selectbtn">
            <el-table-column type="selection" width="35" />
            <el-table-column property="novalname" label="小说名字" width="120" />
            <el-table-column property="username" label="作者" width="120" />
            <el-table-column property="" label="封面" width="140">
                <template v-slot="{ row }">
                    <el-image style="width: 40px; height: 40px" :src="row.avator" fit="fill" />
                </template>
            </el-table-column>
            <el-table-column property="status" label="状态" width="120" />
            <el-table-column property="reading" label="阅读量" width="120" />
            <el-table-column property="abstarct" label="描述" width="220" />
            <el-table-column property="address" label="操作">
                <template v-slot="{ row }">
                    <el-button type="primary" :icon="Check" @click="checkRecommendedbtn(row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>
</template>

<script setup lang='ts'>
import { ref, inject } from 'vue'
import type { Ref } from 'vue'
import { useclassifynoval, useupdaterecommended } from '../../../../../../stores/classify/index'
import {
    Check,
} from '@element-plus/icons-vue'
let searchvalue=ref('')
let Recommendedinfo: Ref = inject('Recommendedinfo') as Ref
let emit = defineEmits<{
    (e: 'addrecommendmethod'): void
}>()
let Arrayss = ref<any[]>([])
let updaterecommended = useupdaterecommended()
let selectarrays=ref<number[]>([])
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
let isdialogs: Ref = inject('isdialogs') as Ref
let classifynames: Ref = inject('classifynames') as Ref
const classifynovals = useclassifynoval()
let classifyvalues = ref<RootObject[]>([])
const opendialogmethod = async () => {
    await classifynovals.getclassifynovals()
    Arrayss.value = Recommendedinfo.value.map((value: any) => {
        return value.id
    })
    classifyvalues.value = classifynovals.allnovals.filter((value) => {
        value.classify = JSON.parse(value.classify)
        return value.classify.includes(classifynames.value) && !Arrayss.value.includes(value.id)
    })
}
const checkRecommendedbtn = async (row: any) => {
    Arrayss.value = Recommendedinfo.value.map((value: any) => {
        return value.id
    })
    Arrayss.value.push(row.id)
    await updaterecommended.getupdaterecommended(classifynames.value, JSON.stringify(Arrayss.value))
    isdialogs.value = false
    emit('addrecommendmethod')
}
const selectbtn=(selection:any)=>{
    selectarrays.value=selection.map((value:any)=>{
        return value.id
   })
}
const checkboxbtn=async()=>{
    Arrayss.value = Recommendedinfo.value.map((value: any) => {
        return value.id
    })
   Arrayss.value=Arrayss.value.concat(selectarrays.value)
   await updaterecommended.getupdaterecommended(classifynames.value, JSON.stringify(Arrayss.value))
   isdialogs.value=false
   emit('addrecommendmethod')
}
const searchbtn=async()=>{
    if(!searchvalue){
        await opendialogmethod()
    }
    else{
        classifyvalues.value=classifyvalues.value.filter((value)=>{
            return value.novalname==searchvalue.value
        })
    }
}
const closedialogbtn=()=>{
    searchvalue.value=''
}
</script>

<style  scoped>
.el-button--text {
    margin-right: 15px;
}

.el-select {
    width: 300px;
}

.el-input {
    width: 300px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>