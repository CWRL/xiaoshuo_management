<template>
    <el-card class="main">
        <input type="text" style="line-height: 25px;outline: none;" placeholder="输入书籍名称" v-model="searchvalue">
        <el-button type="primary" @click="searchnoval">搜索</el-button>
        <br>
        <el-button type="primary" style="margin-top:10px ;" @click="addnoval">新增</el-button>
        <el-table :data="novalsinfos" border style="width: 100%;margin-top: 10px;">
            <el-table-column prop="novalname" label="小说名" width="200">
                <template v-slot="{ row }">
                    <el-avatar :size="50" :src="row.avator"
                        style="vertical-align:middle;margin-right: 15px;margin-left: 5px;" />
                    {{ row.novalname }}<el-badge :value="row.isvip === 1 ? 'vip' : ''" class="item">
                    </el-badge>
                </template>
            </el-table-column>
            <el-table-column prop="classify" label="分类" width="180">
                <template v-slot="{ row }">
                    <el-tag class="ml-2" type="success" v-for="value in row.classify">{{ value }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="date" label="更新时间" width="210" />
            <el-table-column prop="status" label="状态" width="120" />
            <el-table-column prop="isunder" label="上下架" width="160">
                <template v-slot="{ row }">
                    <el-switch v-model="row.isunder" active-text='上架' inactive-text='下架' :active-value='1'
                        :inactive-value='0' :disabled='true' />
                </template>
            </el-table-column>
            <el-table-column prop="reading" label="阅读量" width="120" />
            <el-table-column prop="address" label="操作">
                <template v-slot="{ row }">
                    <el-button type="primary" :icon="Edit" @click="editenovalinfo(row)"></el-button>
                    <el-button type="success" :icon="Plus" @click="addcapters(row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <addnovals @addupdate="updateinfos" ref="addnovalsinstance"></addnovals>
        <capters ref="captersupdate" @addcapters="addcaptersupdate"></capters>
        <pagination @changcur="updateinfo"></pagination>
    </el-card>
</template>

<script setup lang='ts'>
import { usegetallnovals,usegetcapters} from '../../../stores/noval/index'
import { onMounted, ref, provide } from 'vue';
import addnovals from './addnoval/index.vue'
import pagination from '../../../components/pagination/index.vue'
import capters from './addcapters/index.vue'
import {
    Edit,
    Plus
} from '@element-plus/icons-vue'
import {numberhander} from '../../../hook/number'
let searchvalue=ref<string>('')
type data2type = {
    id: number,
    novalname: string,
    username: string,
    capters: string,
    captersname: string,
    docxpath: string,
    localaddress:string
}
let getcapters=usegetcapters()
let captersupdate=ref()
let total = ref(0)
let CurrentPages = ref(1)
let page = ref(3)
let dialogname = ref('')
let isdrawershow=ref(false)
let allcapterinfos=ref<data2type[]>()
provide('allcapterinfos',allcapterinfos)
let allcapter=ref()
provide('allcapter',allcapter)
provide('isdrawershow',isdrawershow)
const addnovalsinstance=ref()
provide('dialogname', dialogname)
provide('total', total)
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
let dialogisshow = ref<boolean>(false)
provide('dialogisshow', dialogisshow)
const getnovals = usegetallnovals()
const novalsinfos = ref<novaltype[]>([
    {
        abstarct: '',
        classify: '',
        date: '',
        id: 1,
        isunder: 0,
        novalname: '',
        reading: 0,
        status: '',
        username: '',
        isvip: 0,
        noviplinite: 0,
        avator: ''
    }
])
const updateinfo = async (CurrentPage: number, pages: number) => {
    CurrentPages.value = CurrentPage
    page.value = pages
    await getnovals.getnovals(CurrentPage, pages,searchvalue.value)
    getnovals.novalinfos.forEach((value, index) => {
        getnovals.novalinfos[index].classify = JSON.parse(value.classify)
    })
    novalsinfos.value = getnovals.novalinfos
    total.value = getnovals.total
}
onMounted(async () => {
    await updateinfo(1, 3)
})
const addnoval = () => {
    dialogisshow.value = true
    dialogname.value = '新增'
}
const updateinfos = async () => {
    await updateinfo(CurrentPages.value, page.value)
}
const editenovalinfo = (row: any) => {
    addnovalsinstance.value.editvaluesd(row)
    dialogisshow.value = true
    dialogname.value = '修改'
}
const addcapters=async(row:any)=>{
    await getcapters.getcaptersrequest(row.novalname)
    allcapterinfos.value=getcapters.captersinfos
    allcapter.value=getcapters.captersinfos.map((value)=>{
        return {
            id:value.id,
            label:value.capters,
            value:value.capters
        }
    })
    captersupdate.value.updatecurinfo1('第'+numberhander(allcapter.value.length+1)+'章')
    captersupdate.value.updatecurinfo(row)
    isdrawershow.value=true
}
const addcaptersupdate=()=>{
    updateinfo(CurrentPages.value,page.value)
}
const searchnoval=async()=>{
    await updateinfo(1,3)
}
</script>

<style  scoped>
.main {
    margin-top: 10px;
    height: 78vh;
}
</style>