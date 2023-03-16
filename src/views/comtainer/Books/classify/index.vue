<template>
    <el-card class="box-card">
        <el-button type="primary" size="small" style="margin-bottom:7px;" @click="addclassifybtn('新增')">新增</el-button>
        <el-scrollbar height="400px">
            <ul id="ulbox">
                <li v-for="item in classifyvalue" :key="item.id">
                    <div>{{item.classifyname}}</div>
                    <div id="right">
                        <el-button size="small" type="info" style="margin-top:5px;color:skyblue;" @click="Recommendedbtn(item.classifyname)">推荐小说</el-button>
                        <el-switch v-model="item.isdelete" style="vertical-align:middle;" :active-value="0" :inactive-value="1" @change="changeswitch(item)"/>
                        <el-button type="primary" :icon="Edit" circle @click="addclassifybtn('修改',item.id)"/>
                        <el-button type="danger" :icon="Delete" circle @click="deletebtn(item.id)"/>
                    </div>
                </li>
            </ul>
        </el-scrollbar>
    </el-card>
    <addclassify @addclassifymethod="updateview"></addclassify>
    <addRecommended></addRecommended>
</template>

<script setup lang='ts'>
import {usegetclassify,useupdateunder,usedeleteclassify} from '../../../../stores/classify/index'
import { ref,onMounted,provide} from 'vue'
import {
  Delete,
  Edit,
} from '@element-plus/icons-vue'
import addclassify from './addclassify/index.vue'
import addRecommended from './addRecommended/index.vue'
let updateunder=useupdateunder()
let deleteclassify=usedeleteclassify()
let isdialog=ref(false)
let dialogname=ref('')
provide('isdialog',isdialog)
provide('dialogname',dialogname)
let isdrawer=ref(false)
provide('isdrawer',isdrawer)
let classifynames=ref('')
let updateid=ref<number>(0)
provide('updateid',updateid)
provide('classifynames',classifynames)
type classifytype={
    id:number,
    classifyname:string,
    isdelete:number,
    Recommended:number[],
    limitfree:number[]
}
const getclassify=usegetclassify()
let classifyvalue=ref<classifytype[]>([])
const updateview=async()=>{
    await getclassify.getclassify()
    classifyvalue.value=getclassify.classifyinfo
}
onMounted(async()=>{
   await updateview()
})
const addclassifybtn=(val:string,id?:number)=>{
    isdialog.value=true
    dialogname.value=val
    if(id){
        updateid.value=id
    }
}
const Recommendedbtn=(classifyname:string)=>{
    isdrawer.value=true
    classifynames.value=classifyname
}
const changeswitch=async(val:any)=>{
    await updateunder.getupdateunder(val.id,val.isdelete) 
    await updateview()
}
const deletebtn=async(id:number)=>{
    await deleteclassify.getdeleteclassify(id)
    await updateview()
}
</script>

<style  scoped>
.box-card {
    width: 99%;
    height: 77.5vh;
    margin-top: 10px;
}
#ulbox{
    list-style: none;
}
#ulbox li{
    margin: 20px 20px 20px 0px;
    display: flex;
    justify-content: space-between;
}
#right{
    width: 240px;
    display: flex;
    justify-content: space-between;
    text-align: center;
}
</style>