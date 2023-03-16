<template>
    <el-dialog v-model="isdialog2" title="回复消息" :close-on-click-modal="false" :show-close="false">
        <el-form>
            <el-form-item label="收件人" :label-width="formLabelWidth">
                <el-input v-model="resetusername" disabled/>
            </el-form-item>
            <el-form-item label="内容" :label-width="formLabelWidth">
                <el-input v-model="content" :autosize="{ minRows: 7, maxRows: 15 }" type="textarea"
                    placeholder="输入回复内容" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="sendnews">发送</el-button>
                <el-button @click="chanselsend">取消</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang='ts'>
import { ref, inject,getCurrentInstance} from 'vue'
import type { Ref } from 'vue'
const formLabelWidth = '140px'
let isdialog2: Ref = inject('isdialog2') as Ref
let resetusername:Ref=inject('resetusername') as Ref
let searchname:Ref=inject('searchname') as Ref
let searchvalues:Ref=inject('searchvalues') as Ref
let content=ref('')
let instance=getCurrentInstance()
const sendnews=()=>{
    isdialog2.value=false
    let data={
        username:resetusername.value,
        content:content.value
    }
    resetusername.value.forEach((value:any)=>{
        let data={
            username:value,
            content:content.value
        }
        instance?.proxy?.$socket.io.emit('setnews',data)
    })
    content.value=''
}
const chanselsend=()=>{
    isdialog2.value=false
    content.value=''
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