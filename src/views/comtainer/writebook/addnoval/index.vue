<template>
    <el-dialog v-model="dialogisshow" :title="`${dialogname}小说`" :close-on-click-modal="false" :show-close="false" @open="opendialog">
        <el-form :model="form" label-width="120px" ref="ruleFormRef" :rules="rules">
            <el-form-item label="小说名字" prop="novalname">
                <el-input v-model="form.novalname" placeholder="请输入小说名字" />
            </el-form-item>
            <el-form-item label="小说封面" prop="avator">
                <el-upload class="avatar-uploader" action="http://127.0.0.1:5566/upload" :headers="imaguser"
                    method="post" name="avator" :show-file-list="false" :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="小说类别" prop="classify">
                <el-select multiple placeholder="Select" style="width: 300px" v-model="form.classify"
                    no-data-text='暂无数据'>
                    <el-option v-for="item in classifyvalues" :key="item.id" :label="item.classifyname"
                        :value="item.classifyname" />
                </el-select>
            </el-form-item>
            <el-form-item label="小说状态" prop="status">
                <el-switch v-model="form.status" active-text='完结' active-value='完结' inactive-value='未完结' />
            </el-form-item>
            <el-form-item label="小说描述" prop="abstarct">
                <el-input v-model="form.abstarct" :autosize="{ minRows: 7, maxRows: 15 }" type="textarea"
                    placeholder="请输入小说描述" />
            </el-form-item>
            <el-form-item label="是否vip阅读">
                <el-switch v-model="form.isvip" active-text='需vip' :active-value='1' :inactive-value='0' />
            </el-form-item>
            <el-form-item label="开放页数" v-if="form.isvip == 1">
                <el-input-number v-model="noviplinite" :min="1" size="small" controls-position="right" />
            </el-form-item>
            <el-form-item>
                <el-button @click="remove">取消</el-button>
                <el-button type="primary" @click="submitForm(ruleFormRef)">添加</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup lang='ts'>
import { reactive, ref, inject } from 'vue'
import type { Ref } from 'vue'
import type { FormInstance, FormRules} from 'element-plus'
import { useaddnoval,useupdatenovalinfo} from '../../../../stores/noval/index'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

import type { UploadProps } from 'element-plus'
import {usegetclassify} from '../../../../stores/classify/index'
type classifynametype={
    id:number,
    classifyname:string,
    isdelete:number,
    Recommended:number[],
    limitfree:number[]
}
let classifyvalues=ref<classifynametype[]>([])
let classifyinfo=usegetclassify()
const updatenovalinfo=useupdatenovalinfo()
const imageUrl = ref('')
const imaguser = {
    Authorization: localStorage.getItem('valuetoken')
}
const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    imageUrl.value = response.data
    form.value.avator = response.data
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }
    return true
}
const emit = defineEmits<{
    (e: 'addupdate'): void
}>()
const ruleFormRef = ref<FormInstance>()
const addnoval = useaddnoval()
type formtype = {
    novalname: string,
    classify: string[]|string,
    status: string,
    abstarct: string,
    isvip: number,
    noviplinite?: number,
    avator: string,
    id?:number
}
const form = ref<formtype>({
    novalname: '',
    classify:[],
    status: '',
    abstarct: '',
    isvip: 0,
    avator: ''
})
const noviplinite = ref(1)
const classifyoptions = [
    {
        value: '玄幻',
        label: '玄幻',
    },
    {
        value: '都市',
        label: '都市',
    },
    {
        value: '脑洞',
        label: '脑洞',
    },
    {
        value: '历史',
        label: '历史',
    },
    {
        value: '游戏',
        label: '游戏',
    },
    {
        value: '奇闻异事',
        label: '奇闻异事'
    },
    {
        value: '异能',
        label: '异能'
    },
    {
        value: '仙侠',
        label: '仙侠'
    },
    {
        value: '武侠',
        label: '武侠'
    },
    {
        value: '科幻',
        label: '科幻'
    },
    {
        value: '二次元',
        label: '二次元'
    },

]
let dialogisshow: Ref = inject('dialogisshow') as Ref
let dialogname: Ref = inject('dialogname') as Ref
const rules = reactive<FormRules>({
    novalname: [
        { required: true, message: '小说名不能为空', trigger: 'blur' },
        { min: 2, message: '小说名过短', trigger: 'blur' },
        { max: 10, message: '小说名过长', trigger: 'blur' }
    ],
    classify: [
        { required: true, message: '分类不能为空', trigger: 'blur' },
    ],
    status: [
        { required: true, message: '状态不能为空', trigger: 'blur' },
    ],
    abstarct: [{ required: true, message: '小说描述不能为空', trigger: 'blur' }],
    avator: [
        { required: true, message: '请上传头像', trigger: 'blur' },
        { pattern: /^[http:\/\/127.0.0.1:5566\/upload]/, message: '头像路径不对', trigger: 'blur' }
    ],
})
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            if (form.value.isvip === 1) {
                form.value.noviplinite = noviplinite.value
            }
            form.value.classify = JSON.stringify(form.value.classify)
            if(dialogname.value==='新增'){
                await addnoval.addnoval(form.value)
            }
            if(dialogname.value==='修改'){
                await updatenovalinfo.getupdatenoval(form.value)
            }
            form.value = {
                novalname: '',
                classify: [],
                status: '',
                abstarct: '',
                isvip: 0,
                avator: ''
            }
            imageUrl.value = ''
            noviplinite.value = 1
            dialogisshow.value = false
            emit('addupdate')
        } else {
            console.log('error submit!', fields)
        }
    })
}
const remove = () => {
    dialogisshow.value = false
    form.value = {
        novalname: '',
        classify: [],
        status: '',
        abstarct: '',
        isvip: 0,
        avator: ''
    }
    imageUrl.value = ''
    noviplinite.value = 1
}
const editvaluesd=(row:any)=>{
    form.value.novalname=row.novalname
    form.value.classify=row.classify
    form.value.status=row.status
    form.value.abstarct=row.abstarct
    form.value.isvip=row.isvip
    form.value.avator=row.avator
    form.value.id=row.id
    imageUrl.value=row.avator
    noviplinite.value=row.noviplinite
}
const opendialog=async()=>{
    await classifyinfo.getclassify()
    classifyvalues.value=classifyinfo.classifyinfo
}
defineExpose({
    editvaluesd
})
</script>

<style scoped>
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

.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>