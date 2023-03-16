<template>
    <el-dialog v-model="isdialog" :title="`${status}员工`" :close-on-click-modal="false" :show-close="false">
        <el-form :model="form" :rules="rules" class="demo-ruleForm" ref="ruleFormRef">
            <el-form-item prop='username'>
                员工名称
                <el-input placeholder="用户名称" style='margin-left: 20px;' v-model="form.username" />
            </el-form-item>
            <el-form-item prop="password">
                员工密码
                <el-input placeholder="用户密码" style='margin-left: 20px;' v-model='form.password' />
            </el-form-item>
            <el-form-item prop="email">
                员工邮箱
                <el-input placeholder="用户邮箱" style='margin-left: 20px;' v-model="form.email" />
            </el-form-item>
            <el-form-item prop="permissions">
                员工身份
                <el-select v-model="form.permissions" class="m-2" placeholder="Select" style='margin-left: 20px;'>
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item prop="avator">
                <el-upload class="avatar-uploader" action="http://127.0.0.1:5566/upload" :headers="updata" method="post"
                    ref="uploadRef" name="avator" :show-file-list="false" :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="remove">取消</el-button>
                <el-button type="primary" @click="updateemployee(ruleFormRef)">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang='ts'>
import { reactive, ref, inject} from 'vue'
import type { Ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { useaddemployee,useallroles} from '../../../../../stores/employees/index'
import type { FormInstance, FormRules, UploadProps, UploadInstance } from 'element-plus'
type optionstype = {
    value: string,
    label: string
}
let options = ref<optionstype[]>([{
    value: '',
    label: ''
}])
let isdialog: Ref = inject('isdialog') as Ref
let status: Ref = inject('status') as Ref
const allrules=useallroles()
const getallrules=async()=>{
    await allrules.getallrules()
    options.value=allrules.allroles.map((value)=>{
        return {
            value:value.rolename,
            label:value.rolename
        }
    })
}
const emit = defineEmits<{
    (e: 'updateemployeesinfo'): void
}>()
const ruleFormRef = ref<FormInstance>()
const uploadRef = ref<UploadInstance>()
const rules = reactive<FormRules>({
    username: [
        { required: true, message: '请输入员工名称', trigger: 'blur' },
        { min: 1, message: '员工名称过短', trigger: 'blur' },
        { max: 10, message: '员工名称过长', trigger: 'blur' }
    ],
    password: status.value == '新增' ? [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { pattern: /^[\S]{8,12}$/, message: '密码格式1不对', trigger: 'blur' }
    ] : [{ required: false, message: '请输入密码', trigger: 'blur' },
    { pattern: /^[\S]{8,12}$/, message: '密码格式1不对', trigger: 'blur' }],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { pattern: /^[1-9][0-9]{9,10}@qq.com$/, message: '邮箱格式不对', trigger: 'blur' }
    ],
    avator: [
        { required: true, message: '请上传头像', trigger: 'blur' },
        { pattern: /^[http:\/\/127.0.0.1:5566\/upload]/, message: '头像路径不对', trigger: 'blur' }
    ],
    permissions: [
        { required: true, message: '请输入身份', trigger: 'blur' },
    ]
})
const addemployeesy = useaddemployee()
let updata = {
    Authorization: window.localStorage.getItem('valuetoken')
}
type formtype = {
    id: number,
    username: string,
    password: string,
    email: string,
    avator: string,
    permissions: string,
    entryTime: string
}
const form = ref({
    username: '',
    password: '',
    email: '',
    avator: '',
    permissions: '',
})
const curusername = ref('')
const imageUrl = ref('')
const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    form.value.avator = response.data
    imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('文件过大超过了 2MB!')
        return false
    }
    return true
}
const updateemployee = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            if (status.value == '新增') {
                await addemployeesy.addemployeessy(form.value)
            }
            else {
                await addemployeesy.addemployeessy(form.value, curusername.value)
            }
            form.value = {
                username: '',
                password: '',
                email: '',
                avator: '',
                permissions: '',
            }
            imageUrl.value = ''
            curusername.value = ''
            uploadRef.value?.clearFiles()
            isdialog.value = false
            emit('updateemployeesinfo')
        } else {
            console.log('error submit!', fields)
        }
    })
}
const remove = () => {
    isdialog.value = false
    form.value = {
        username: '',
        password: '',
        email: '',
        avator: '',
        permissions: '',
    }
    imageUrl.value = ''
    curusername.value = ''
}
const editvalue = (editvalue: formtype) => {
    form.value.username = editvalue.username
    form.value.email = editvalue.email
    form.value.permissions = editvalue.permissions
    form.value.avator = editvalue.avator
    curusername.value = editvalue.username
    imageUrl.value = editvalue.avator
}
defineExpose({
    editvalue,
    getallrules
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