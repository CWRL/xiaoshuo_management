<template>
    <el-drawer v-model="isdrawer" title="推荐小说" direction="rtl" size="50%" :close-on-click-modal="false" @open="opendrawer" @close="closedrawer">
        <el-table :data="Recommendedinfo" border max-height="500">
            <el-table-column prop="novalname" label="小说名称" width="140" />
            <el-table-column prop="username" label="作者" width="140" />
            <el-table-column prop="address" label="封面">
                <template v-slot="{row}">
                    <el-image style="width: 50px; height: 50px" :src="row.avator" fit="fill" />
                </template>
            </el-table-column>
            <el-table-column prop="reading" label="阅读量" />
            <el-table-column prop="address" label="操作">
                <template v-slot="{row}">
                    <el-button type="danger" :icon="Delete" circle  @click="deleteRecommended(row)"/>
                </template>
            </el-table-column>
        </el-table>
        <el-button type="primary" @click="addRecommended">关联</el-button>
    </el-drawer>
    <Recommendlist @addrecommendmethod="updateRecommended"></Recommendlist>
</template>

<script setup lang='ts'>
import {ref,inject,provide} from 'vue'
import { ElDrawer } from 'element-plus'
import type {Ref} from 'vue'
import {useRecommended,useupdaterecommended} from '../../../../../stores/classify/index'
import {
  Delete,
} from '@element-plus/icons-vue'
import Recommendlist from './Recommended/index.vue'
type RootObject={
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
let updaterecomends=useupdaterecommended()
let isdrawer:Ref=inject('isdrawer') as Ref
const Recommended=useRecommended()
let classifynames:Ref=inject("classifynames") as Ref
let Recommendedinfo=ref<RootObject[]>([])
provide('Recommendedinfo',Recommendedinfo)
let isdialogs=ref(false)
provide('isdialogs',isdialogs)
const updateRecommended=async()=>{
    await Recommended.getRecommend(classifynames.value)
    Recommendedinfo.value=Recommended.Recommended
}
const addRecommended=()=>{
    isdialogs.value=true
}
const deleteRecommended=async(row:any)=>{
    let m= Recommendedinfo.value.map((value: any) => {
        return value.id
    })
    delete m[m.indexOf(row.id)]
    await updaterecomends.getupdaterecommended(classifynames.value,JSON.stringify(m))
    await updateRecommended()
}
const closedrawer=()=>{
    Recommendedinfo.value=[]
}
const opendrawer=async()=>{
    await updateRecommended()
}
</script>

<style  scoped>

</style>