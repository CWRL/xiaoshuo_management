<template>
    <el-dialog v-model="isdialogshow" title="小说章节" :close-on-click-modal="false" :before-close="closedialog">
        <template v-slot="cwrl">
            <el-dialog v-model="innerVisible" width="35%" title="联系作者" append-to-body>
                <el-form :model="setnewsvalue" label-width="120px">
                    <el-form-item label="作者名">
                        <el-input v-model="setnewsvalue.username" :disabled="true" />
                    </el-form-item>
                    <el-form-item label="小说名">
                        <el-input v-model="setnewsvalue.novalname" :disabled="true" />
                    </el-form-item>
                    <el-form-item label="章节">
                        <el-input v-model="setnewsvalue.capters" :disabled="true" />
                    </el-form-item>
                    <el-form-item label="章节名">
                        <el-input v-model="setnewsvalue.captersname" :disabled="true" />
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-switch v-model="setnewsvalue.audit" active-value='违规' inactive-value='通过' active-text='违规'
                            inactive-text='通过' :disabled="true"
                            style="--el-switch-on-color:red; --el-switch-off-color:skyblue" />
                    </el-form-item>
                    <el-form-item label="联系内容">
                        <el-input v-model="setnewsvalue.content" :autosize="{ minRows: 5, maxRows: 15 }" type="textarea"
                            placeholder="请输入内容" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">发送</el-button>
                        <el-button @click="removesend">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <el-table :data="gridData" height="440" border>
                <el-table-column property="capters" label="章节" width="120" />
                <el-table-column property="captersname" label="章节名" width="140" />
                <el-table-column property="audit" label="审核状态" width="200">
                    <template v-slot="{ row }">
                        <span :style="{ color: row.audit == '违规' ? 'red' : 'green' }"> {{ row.audit }}</span>
                        <el-button type="success" size="small" style="margin-left: 20px;"
                            @click="changeaudit(row, '通过')" :disabled="row.audit == '通过'">通过</el-button>
                        <el-button type="danger" size="small" @click="changeaudit(row, '违规')"
                            :disabled="row.audit == '违规'">
                            违规
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column property="address" label="查看内容" width="130">
                    <template v-slot="{ row }">
                        <el-link type="primary" :href="row.docxpath">{{ row.captersname }}</el-link>
                    </template>
                </el-table-column>
                <el-table-column property="address" label="联系作者">
                    <template v-slot="{ row }">
                        <el-button type="info" :icon="ChatLineSquare" @click="saytouser(row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
    </el-dialog>
</template>

<script setup lang='ts'>
import { ref, inject, getCurrentInstance } from 'vue'
import type { Ref } from 'vue';
import { useupdateaudit } from '../../../../../stores/book/index'
import {
    ChatLineSquare
} from '@element-plus/icons-vue'
let instance = getCurrentInstance()
let setnewsvalue = ref({
    username: '',
    content: '',
    novalname: '',
    capters: '',
    captersname: '',
    audit: ''
})

const onSubmit = () => {
    innerVisible.value = false
    instance?.proxy?.$socket.io.emit('setnews', setnewsvalue.value)
    setnewsvalue.value.content = ''
}
const removesend = () => {
    innerVisible.value = false
    setnewsvalue.value.content = ''
}
const emit = defineEmits<{
    (e: 'changeauditss', novalname: string): void,
    (e: 'closedialog'): void
}>()
let innerVisible = ref(false)
let isdialogshow: Ref = inject('isdialogshow') as Ref
let updateaudit = useupdateaudit()
type data2type = {
    id: number,
    novalname: string,
    username: string,
    capters: string,
    captersname: string,
    docxpath: string,
    localaddress: string,
    audit: string
}
let gridData = ref<data2type[]>()
const changegridDatamethod = (val: data2type[]) => {
    gridData.value = val
}
const changeaudit = async (row: any, val: string) => {
    let value = {
        username: row.username,
        capters: row.capters,
        captersname: row.captersname,
        content: '',
        audit: val,
        novalname: row.novalname
    }
    if (val == '通过') {
        value.content = `<b>尊敬的作者:${value.username}</b><br/>&nbsp; &nbsp; 你的${value.novalname}${value.capters}${value.captersname}已经通过了审核,再接再厉，写出更好的文章来`
    }
    else {
        value.content = `<b>尊敬的作者:${value.username}</b><br/> &nbsp; &nbsp; 你的${value.novalname}${value.capters}${value.captersname}未通过审核,存在违规内容，请尽快修正`
    }
    instance?.proxy?.$socket.io.emit('setnews', value)
    await updateaudit.getupdateaudit(row.id, val)
    emit('changeauditss', row.novalname)
}
const saytouser = (row: any) => {
    innerVisible.value = true
    setnewsvalue.value.username = row.username
    setnewsvalue.value.novalname = row.novalname
    setnewsvalue.value.audit = row.audit
    setnewsvalue.value.capters = row.capters
    setnewsvalue.value.captersname = row.captersname
}
const closedialog = async (done: Function) => {
    await emit('closedialog')
    done()
}
defineExpose({
    changegridDatamethod
})
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