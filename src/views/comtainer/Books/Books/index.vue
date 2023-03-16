<template>
    <el-card class="box-card">
        <el-tabs v-model="activeName" class="demo-tabs" type="card" @tab-change="tablechange">
            <el-tab-pane label="所有" name="所有">
                <input type="text" style="line-height: 25px;outline: none;" placeholder="输入书籍名称" v-model="searchvalue">
                <el-button type="primary" @click="searchbtn">搜索</el-button>
                <br>
                <el-table :data="tableData" :border="parentBorder" style="width: 100%;margin-top: 10px;" height="400">
                    <el-table-column fixed label="小说名称" prop="novalname" width="130">
                        <template v-slot="{ row }">
                            {{ row.novalname }} <el-badge value="vip" class="item" v-if="row.isvip == 1 ? true : false">
                            </el-badge>
                        </template>
                    </el-table-column>
                    <el-table-column label="作者" prop="username" width="100" />
                    <el-table-column label="分类" prop="classify" width="180">
                        <template v-slot="{ row }">
                            <el-tag class="ml-2" type="success" v-for="value, index in row.classify" :key="index">
                                {{ value }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="时间" prop="date" width="200" />
                    <el-table-column label="阅读量" prop="reading" width="100" />
                    <el-table-column label="状态" prop="status" width="100" />
                    <el-table-column label="上架状态" prop="isunder" width="160">
                        <template v-slot="{ row }">
                            <el-switch v-model="row.isunder" active-text='上架' inactive-text='下架' :active-value='1'
                                :inactive-value='0' @change="switchchange(row)" />
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" prop="name">
                        <template v-slot="{ row }">
                            <el-button type="primary" :icon="Document" @click="dialogmethod(row.novalname)">
                                <template #default>
                                    <el-badge class="item" :value="newcapters(row)"></el-badge>
                                </template>
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="已上架" name="已上架">
                <input type="text" style="line-height: 25px;outline: none;" placeholder="输入书籍名称" v-model="searchvalue">
                <el-button type="primary" @click="searchbtn">搜索</el-button>
                <br>
                <el-table :data="tableData" :border="parentBorder" style="width: 100%;margin-top: 10px;" height="400">
                    <el-table-column fixed label="小说名称" prop="novalname" width="130">
                        <template v-slot="{ row }">
                            {{ row.novalname }} <el-badge value="vip" class="item" v-if="row.isvip == 1 ? true : false">
                            </el-badge>
                        </template>
                    </el-table-column>
                    <el-table-column label="作者" prop="username" width="100" />
                    <el-table-column label="分类" prop="classify" width="180">
                        <template v-slot="{ row }">
                            <el-tag class="ml-2" type="success" v-for="value, index in row.classify" :key="index">
                                {{ value }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="时间" prop="date" width="200" />
                    <el-table-column label="阅读量" prop="reading" width="100" />
                    <el-table-column label="状态" prop="status" width="100" />
                    <el-table-column label="上架状态" prop="isunder" width="160">
                        <template v-slot="{ row }">
                            <el-switch v-model="row.isunder" active-text='上架' inactive-text='下架' :active-value='1'
                                :inactive-value='0' @change="switchchange(row)" />
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" prop="name">
                        <template v-slot="{ row }">
                            <el-button type="primary" :icon="Document" @click="dialogmethod(row.novalname)">
                                <template #default>
                                    <el-badge class="item" :value="newcapters(row)"></el-badge>
                                </template>
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="未上架" name="未上架">
                <input type="text" style="line-height: 25px;outline: none;" placeholder="输入书籍名称" v-model="searchvalue">
                <el-button type="primary" @click="searchbtn">搜索</el-button>
                <br>
                <el-table :data="tableData" :border="parentBorder" style="width: 100%;margin-top: 10px;" height="400">
                    <el-table-column fixed label="小说名称" prop="novalname" width="130">
                        <template v-slot="{ row }">
                            {{ row.novalname }} <el-badge value="vip" class="item" v-if="row.isvip == 1 ? true : false">
                            </el-badge>
                        </template>
                    </el-table-column>
                    <el-table-column label="作者" prop="username" width="100" />
                    <el-table-column label="分类" prop="classify" width="180">
                        <template v-slot="{ row }">
                            <el-tag class="ml-2" type="success" v-for="value, index in row.classify" :key="index">
                                {{ value }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="时间" prop="date" width="200" />
                    <el-table-column label="阅读量" prop="reading" width="100" />
                    <el-table-column label="状态" prop="status" width="100" />
                    <el-table-column label="上架状态" prop="isunder" width="160">
                        <template v-slot="{ row }">
                            <el-switch v-model="row.isunder" active-text='上架' inactive-text='下架' :active-value='1'
                                :inactive-value='0' @change="switchchange(row)" />
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" prop="name">
                        <template v-slot="{ row }">
                            <el-button type="primary" :icon="Document" @click="dialogmethod(row.novalname)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="待审核" name="待审核">
                <template #label>
                    <span>待审核</span>
                    <el-badge :value="padding.length" class="item"></el-badge>
                </template>
                <input type="text" style="line-height: 25px;outline: none;" placeholder="输入书籍名称" v-model="searchvalue">
                <el-button type="primary" @click="searchbtn">搜索</el-button>
                <br>
                <el-table :data="tableData" :border="parentBorder" style="width: 100%;margin-top: 10px;" height="400">
                    <el-table-column fixed label="小说名称" prop="novalname" width="130">
                        <template v-slot="{ row }">
                            {{ row.novalname }} <el-badge value="vip" class="item" v-if="row.isvip == 1 ? true : false">
                            </el-badge>
                        </template>
                    </el-table-column>
                    <el-table-column label="作者" prop="username" width="100" />
                    <el-table-column label="分类" prop="classify" width="180">
                        <template v-slot="{ row }">
                            <el-tag class="ml-2" type="success" v-for="value, index in row.classify" :key="index">
                                {{ value }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="时间" prop="date" width="200" />
                    <el-table-column label="阅读量" prop="reading" width="100" />
                    <el-table-column label="状态" prop="status" width="100" />
                    <el-table-column label="上架状态" prop="isunder" width="160">
                        <template v-slot="{ row }">
                            <el-switch v-model="row.isunder" active-text='上架' inactive-text='下架' :active-value='1'
                                :inactive-value='0' @change="switchchange(row)" />
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" prop="name">
                        <template v-slot="{ row }">
                            <el-button type="primary" :icon="Document" @click="dialogmethod(row.novalname)">
                                <template #default>
                                    <el-badge class="item" :value="newcapters(row)"></el-badge>
                                </template>
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="违规" name="违规">
                <template #label>
                    <span>违规</span>
                    <el-badge :value="fail.length" class="item"></el-badge>
                </template>
                <input type="text" style="line-height: 25px;outline: none;" placeholder="输入书籍名称" v-model="searchvalue">
                <el-button type="primary" @click="searchbtn">搜索</el-button>
                <br>
                <el-table :data="tableData" :border="parentBorder" style="width: 100%;margin-top: 10px;" height="400">
                    <el-table-column fixed label="小说名称" prop="novalname" width="130">
                        <template v-slot="{ row }">
                            {{ row.novalname }} <el-badge value="vip" class="item" v-if="row.isvip == 1 ? true : false">
                            </el-badge>
                        </template>
                    </el-table-column>
                    <el-table-column label="作者" prop="username" width="100" />
                    <el-table-column label="分类" prop="classify" width="180">
                        <template v-slot="{ row }">
                            <el-tag class="ml-2" type="success" v-for="value, index in row.classify" :key="index">
                                {{ value }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="时间" prop="date" width="200" />
                    <el-table-column label="阅读量" prop="reading" width="100" />
                    <el-table-column label="状态" prop="status" width="100" />
                    <el-table-column label="上架状态" prop="isunder" width="160">
                        <template v-slot="{ row }">
                            <el-switch v-model="row.isunder" active-text='上架' inactive-text='下架' :active-value='1'
                                :inactive-value='0' @change="switchchange(row)" />
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" prop="name">
                        <template v-slot="{ row }">
                            <el-button type="primary" :icon="Document" @click="dialogmethod(row.novalname)">
                                <template #default>
                                    <el-badge class="item" :value="errornews(row)"></el-badge>
                                </template>
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
        <chatcapters ref="chatinstance" @changeauditss="dialogmethod" @closedialog="updateview"></chatcapters>
    </el-card>
</template>

<script setup lang='ts'>
import { ref, onMounted, provide } from 'vue'
import type { TabPaneName } from 'element-plus'
import {
    Document,
    ChatLineSquare
} from '@element-plus/icons-vue'
import { usegetallbooks, useupdatestatus } from '../../../../stores/book/index'
import chatcapters from './chatcapters/index.vue'
import { usegetcapters, usegetnumber } from '../../../../stores/noval/index'
let chatinstance = ref()
let getcapters = usegetcapters()
let isdialogshow = ref(false)
let getnumber = usegetnumber()
let searchvalue=ref('')
provide('isdialogshow', isdialogshow)
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
const updatestatus = useupdatestatus()
const getallbooks = usegetallbooks()
const activeName = ref('所有')
const parentBorder = ref(true)
let padding = ref<any[]>([])
let success = ref<any[]>([])
let fail = ref<any[]>([])
const tableData = ref<RootObject[]>()
onMounted(async () => {
    await updateview()
})
const updateview = async () => {
    padding.value = []
    success.value = []
    fail.value = []
    await getallbooks.getallbooks(searchvalue.value)
    await getnumber.getcaptersnumber()
    getnumber.captersnumber.forEach((value) => {
        if (value.audit == '待审核') {
            padding.value.push(value)
        }
        if (value.audit == '通过') {
            success.value.push(value)
        }
        if (value.audit == '违规') {
            fail.value.push(value)
        }
    })
    if (activeName.value == '所有') {
        tableData.value = getallbooks.allbooksinfo.map((value) => {
            value.classify = JSON.parse(value.classify)
            return value
        })
    }
    if (activeName.value == '已上架') {
        tableData.value = getallbooks.allbooksinfo.filter((value) => {
            if (value.isunder === 1) {
                value.classify = JSON.parse(value.classify)
                return true
            }
        })
    }
    if (activeName.value == '未上架') {
        tableData.value = getallbooks.allbooksinfo.filter((value) => {
            if (value.isunder === 0) {
                value.classify = JSON.parse(value.classify)
                return true
            }
        })
    }
    if (activeName.value == '待审核') {
        tableData.value = getallbooks.allbooksinfo.filter((value) => {
            value.classify = JSON.parse(value.classify)
            return padding.value.some((values) => {
                return value.novalname == values.novalname
            })
        })
    }
    if(activeName.value=='违规'){
        tableData.value=getallbooks.allbooksinfo.filter((value)=>{
            value.classify = JSON.parse(value.classify)
            return fail.value.some((values)=>{
                return value.novalname==values.novalname
            })
        })
    }
}
const switchchange = async (row: any) => {
    await updatestatus.getupdatestatus(row.id, row.isunder)
    await updateview()

}
const dialogmethod = async (row: string) => {
    isdialogshow.value = true
    await getcapters.getcaptersrequest(row)
    chatinstance.value.changegridDatamethod(getcapters.captersinfos)
}
const tablechange = async (name: TabPaneName) => {
    activeName.value = name as string
    await updateview()
}
const newcapters = (row: any) => {
    let count = 0
    padding.value?.forEach((value) => {
        if (value.novalname == row.novalname) {
            count++
        }
    })
    if (count) {
        return count
    }
}
const errornews=(row:any)=>{
    let count=0
    fail.value?.forEach((value)=>{
        if(value.novalname==row.novalname){
            count++
        }
    })
    if(count){
        return count
    }
}
const searchbtn=async()=>{
   await updateview()
}
</script>

<style  scoped>
.box-card {
    width: 99%;
    height: 77.5vh;
    margin-top: 10px;
}

.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}
</style>
