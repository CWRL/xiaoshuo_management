<template>
    <el-card class="box-card">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-change="tablechange">
            <el-tab-pane label="个人邮件" name="个人邮件">
                <input type="text" style="line-height: 25px;outline: none;" placeholder="输入书籍名称" v-model="searchvalues">
                <el-button type="primary" @click="searchnewsbtn">搜索</el-button>
                <el-button type="primary" :icon="Position" circle @click="relinksomenews('回复')" />
                <el-button type="success" :icon="Star" circle @click="relinksomenews('收藏')" />
                <el-button type="danger" :icon="Delete" circle @click="relinksomenews('删除')" />
                <el-table :data="newsvalue" style="width: 100%;margin-top: 20px;" height="400" border
                    @row-click="scannews" @select="selectnews" @select-all="selectnews">
                    <el-table-column type="selection" width="55" />
                    <el-table-column prop="username" label="收信人" width="160">
                        <template v-slot="{ row }">
                            {{ row.username }}<el-badge is-dot class="item" v-if="row.isready == 0 ? true : false"
                                type="danger"></el-badge>
                        </template>
                    </el-table-column>
                    <el-table-column prop="pushuser" label="发信人" width="160" />
                    <el-table-column prop="date" label="时间" width="220" />
                    <el-table-column prop="content" label="内容" width="340">
                        <template v-slot="{ row }">
                            <div v-html="row.content" id="contentstyle"></div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="state" label="操作">
                        <template v-slot="{ row }">
                            <el-button type="primary" :icon="Position" @click.stop="relinke(row)"></el-button>
                            <el-button :icon="Star" @click.stop="collectnew(row)"
                                :type="row.iscollection === 1 ? 'success' : ''"></el-button>
                            <el-button type="danger" :icon="Delete" @click.stop="deletenew(row)"></el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </el-tab-pane>
            <el-tab-pane label="未读" name="未读">
                <input type="text" style="line-height: 25px;outline: none;" placeholder="输入书籍名称" v-model="searchvalues">
                <el-button type="primary" @click="searchnewsbtn">搜索</el-button>
                <el-button type="primary" :icon="Position" circle @click="relinksomenews('回复')" />
                <el-button type="success" :icon="Star" circle @click="relinksomenews('收藏')" />
                <el-button type="danger" :icon="Delete" circle @click="relinksomenews('删除')" />
                <el-table :data="newsvalue" style="width: 100%;margin-top: 20px;" height="400" border
                    @row-click="scannews" @select="selectnews" @select-all="selectnews">
                    <el-table-column type="selection" width="55" />
                    <el-table-column prop="username" label="收信人" width="160">
                        <template v-slot="{ row }">
                            {{ row.username }}<el-badge is-dot class="item" v-if="row.isready == 0 ? true : false"
                                type="danger"></el-badge>
                        </template>
                    </el-table-column>
                    <el-table-column prop="pushuser" label="发信人" width="160" />
                    <el-table-column prop="date" label="时间" width="220" />
                    <el-table-column prop="content" label="内容" width="340">
                        <template v-slot="{ row }">
                            <div v-html="row.content" id="contentstyle"></div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="state" label="操作">
                        <template v-slot="{ row }">
                            <el-button type="primary" :icon="Position" @click.stop="relinke(row)"></el-button>
                            <el-button :icon="Star" @click.stop="collectnew(row)"
                                :type="row.iscollection === 1 ? 'success' : ''"></el-button>
                            <el-button type="danger" :icon="Delete" @click.stop="deletenew(row)"></el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </el-tab-pane>
            <el-tab-pane label="回收站" name="回收站">
                <input type="text" style="line-height: 25px;outline: none;" placeholder="输入书籍名称" v-model="searchvalues">
                <el-button type="primary" @click="searchnewsbtn">搜索</el-button>
                <el-button type="primary" :icon="Refresh" circle @click="relinksomenews('回收')" />
                <el-table :data="newsvalue" style="width: 100%;margin-top: 20px;" height="400" border
                    @row-click="scannews" @select="selectnews" @select-all="selectnews">
                    <el-table-column type="selection" width="55" />
                    <el-table-column prop="username" label="收信人" width="160">
                        <template v-slot="{ row }">
                            {{ row.username }}<el-badge is-dot class="item" v-if="row.isready == 0 ? true : false"
                                type="danger"></el-badge>
                        </template>
                    </el-table-column>
                    <el-table-column prop="pushuser" label="发信人" width="160" />
                    <el-table-column prop="date" label="时间" width="220" />
                    <el-table-column prop="content" label="内容" width="340">
                        <template v-slot="{ row }">
                            <div v-html="row.content" id="contentstyle"></div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="state" label="操作">
                        <template v-slot="{ row }">
                            <el-button type="primary" :icon="Refresh" circle @click.stop="renewbtn(row)" />
                        </template>
                    </el-table-column>

                </el-table>
            </el-tab-pane>
        </el-tabs>
        <relinkview></relinkview>
    </el-card>
    <scannewss></scannewss>
</template>

<script setup lang='ts'>
import { ref, inject, provide, getCurrentInstance, onBeforeUnmount } from 'vue'
import type { Ref } from 'vue'
import scannewss from './scannews/index.vue'
import relinkview from './relink/index.vue'
import {
    Position,
    Star,
    Delete,
    Refresh
} from '@element-plus/icons-vue'
import { useisready, useisdelete, useiscollection, userenew } from '../../../stores/news/index'
import type { TabPaneName } from 'element-plus'
let searchvalues: Ref = inject('searchvalues') as Ref
let searchname: Ref = inject('searchname') as Ref
let iscollection = useiscollection()
let isdelete = useisdelete()
let instance = getCurrentInstance()
let newsvalue: Ref = inject('news') as Ref
const activeName = ref('个人邮件')
let isdialog = ref(false)
let dialognews = ref()
let isready = useisready()
let isdialog2 = ref(false)
let resetusername = ref<string[]>([])
let selectvalues = ref<any[]>([])
let username = ref('')
let renew = userenew()
instance?.proxy?.$socket.io.emit('getnullnew', searchname.value, searchvalues.value)
provide('resetusername', resetusername)
provide('dialognews', dialognews)
provide('isdialog', isdialog)
provide('isdialog2', isdialog2)
provide('searchname', searchname)
provide('searchvalues', searchvalues)
const scannews = async (row: any) => {
    await isready.getisready(row.id)
    instance?.proxy?.$socket.io.emit('getnullnew', searchname.value, searchvalues.value)
    isdialog.value = true
    dialognews.value = JSON.parse(JSON.stringify(row))
    dialognews.value.content = "<p>&nbsp;&nbsp;&nbsp;&nbsp" + row.content.split("<p style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap'>")[1].split('</p>')[0] + "</p>"
}
const relinke = (row: any) => {
    let pushusers = new Set()
    isdialog2.value = true
    pushusers.add(row.pushuser)
    resetusername.value = [...pushusers] as string[]
}
const deletenew = async (row: any) => {
    await isdelete.getisdelete(row.id)
    instance?.proxy?.$socket.io.emit('getnullnew', searchname.value, searchvalues.value)
}
const collectnew = async (row: any) => {
    await iscollection.getiscollection(row.id)
    instance?.proxy?.$socket.io.emit('getnullnew', searchname.value, searchvalues.value)
}
const selectnews = (selection: any) => {
    selectvalues.value = selection.map((value: any) => {
        return {
            id: value.id,
            pushuser: value.pushuser
        }
    })
    username.value = selection[0].username

}
const relinksomenews = async (val: string) => {
    if (val === '回复') {
        isdialog2.value = true
        let pushusers = new Set()
        selectvalues.value.forEach((value) => {
            pushusers.add(value.pushuser)
        })
        resetusername.value = [...pushusers] as string[]
    }
    if (val === '收藏') {
        await new Promise((resolve) => {
            let count = 0
            selectvalues.value.forEach(async (value) => {
                await iscollection.getiscollection(value.id)
                count++
                if (count == selectvalues.value.length) {
                    return resolve(1)
                }
            })
        })
        instance?.proxy?.$socket.io.emit('getnullnew', searchname.value, searchvalues.value)
    }
    if (val === '删除') {
        await new Promise((resolve) => {
            let count = 0
            selectvalues.value.forEach(async (value) => {
                await isdelete.getisdelete(value.id)
                count++
                if (count == selectvalues.value.length) {
                    return resolve(1)
                }
            })
        })
        instance?.proxy?.$socket.io.emit('getnullnew', searchname.value, searchvalues.value)
    }
    if (val === '回收') {
        await new Promise((resolve) => {
            let count = 0
            selectvalues.value.forEach(async (value) => {
                await renew.getrenew(value.id)
                count++
                if (count == selectvalues.value.length) {
                    return resolve(1)
                }
            })
        })
        instance?.proxy?.$socket.io.emit('getnullnew', searchname.value, searchvalues.value)
    }

}
const searchnewsbtn = async () => {
    instance?.proxy?.$socket.io.emit('getnullnew', searchname.value, searchvalues.value)
}
const tablechange = (name: TabPaneName) => {
    searchname.value = name as string
    instance?.proxy?.$socket.io.emit('getnullnew', name, searchvalues.value)
}
const renewbtn = async (row: any) => {
    await renew.getrenew(row.id)
    instance?.proxy?.$socket.io.emit('getnullnew', searchname.value, searchvalues.value)
}
onBeforeUnmount(() => {
    searchvalues.value = ''
    searchname.value = '个人邮件'
    instance?.proxy?.$socket.io.emit('getnullnew', '个人邮件', '')
})
</script>
<style  scoped>
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

.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}
</style>