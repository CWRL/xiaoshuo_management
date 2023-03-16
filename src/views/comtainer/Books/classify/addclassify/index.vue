<template>
    <el-dialog v-model="isdialog" :title="`${dialogname}类别`" style="height:400px;" :close-on-click-modal="false" :show-close="false">
        <el-form label-width="120px">
            <el-form-item label="类别名称">
                <el-input v-model="setvalue" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">确定</el-button>
                <el-button @click="removedialog">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup lang='ts'>
import {inject,ref} from 'vue'
import type { Ref } from 'vue'
import {useaddclassify,useupdateclassify} from '../../../../../stores/classify/index'
let isdialog: Ref = inject('isdialog') as Ref
let dialogname:Ref=inject('dialogname') as Ref
let updateid:Ref=inject('updateid') as Ref
let updateclassifyname=useupdateclassify()
const setvalue=ref('')
const addclassify=useaddclassify()
let emit=defineEmits<{
    (e:'addclassifymethod'):void
}>()
const onSubmit = async() => {
    if(dialogname.value==='新增'){
        await addclassify.getaddclassify({classifyname:setvalue.value})
    }
    else{
        await updateclassifyname.getupdateclassifyname(updateid.value,setvalue.value)
    }
   isdialog.value=false
   setvalue.value=''
   updateid.value=0
   emit('addclassifymethod')
}
const removedialog=()=>{
    isdialog.value=false
    setvalue.value=''
}
</script>

<style  scoped>

</style>