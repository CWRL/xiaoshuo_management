<template>
    <el-drawer v-model="isdrawershow" title="添加小说章节" direction="rtl" size="50%" :show-close="false"
        :close-on-click-modal="false">
        <el-form :model="captersdata" label-width="120px" :rules="rules" ref="formRef">
            <el-form-item label="书名">
                <el-input v-model="captersdata.novalname" :disabled="true" />
            </el-form-item>
            <el-form-item label="章节名" prop="captersname">
                <el-input v-model="captersdata.captersname" />
            </el-form-item>
            <el-form-item label="章节">
                <el-select v-model="captersdata.capters" placeholder="请选择章节" :disabled="radiovalue==true?false:true" @change="getoldcapters">
                    <el-option v-for="value in allcapter" :key="value.id" :value="value.value" :label="value.label" />
                </el-select>
            </el-form-item>
            <el-form-item>
                是否修改章节 <el-switch v-model="radiovalue" size="small" active-text="Open" :active-value="true" :inactive-value='false' @change="switchchange"/>
            </el-form-item>
            <el-form-item label="上传章节文章" prop="onlineaddress">
                <el-upload class="upload-demo" method="post" :headers="usertoken" name="noval"
                     v-model:file-list="fileList"
                    action="http://127.0.0.1:5566/uploaddocx" :on-preview="handlePreview" :on-error="handlererror"
                    :before-upload="handerbef" :limit="1" :on-exceed="handleExceed" ref="uploadRef"
                    :on-success="handlesuccess">
                    <el-button type="primary">选择文件</el-button>
                    <template #tip>
                        <div class="el-upload__tip">
                            仅限word file
                        </div>
                    </template>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button @click="remove">取消</el-button>
                <el-button type="primary" @click="submitForm(formRef)">提交</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<script setup lang='ts'>
import { reactive, ref, inject } from 'vue'
import type { Ref } from 'vue'
import { ElDrawer, ElMessageBox, ElMessage } from 'element-plus'
import type { UploadProps, UploadInstance, FormInstance, FormRules,UploadUserFile} from 'element-plus'
import { useaddcapters } from '../../../../stores/noval/index'
const emit= defineEmits<{
    (e:'addcapters'):void
}>()
let fileList = ref<UploadUserFile[]>()
let isdrawershow: Ref = inject('isdrawershow') as Ref
let allcapterinfos: Ref = inject('allcapterinfos') as Ref
let allcapter: Ref = inject('allcapter') as Ref
let curvalue=ref<string>()
type captersdatatype = {
    novalname: string,
    capters: string,
    captersname: string,
    localaddress: string,
    onlineaddress: string,
    id?: number
}
let radiovalue = ref(false)
const addcaptersss = useaddcapters()
let captersdata = ref<captersdatatype>({
    novalname: '',
    capters: '',
    captersname: '',
    localaddress: '',
    onlineaddress: '',

})
const usertoken = ref({
    Authorization: localStorage.getItem('valuetoken')
})
const uploadRef = ref<UploadInstance>()
const formRef = ref<FormInstance>()

const handlePreview: UploadProps['onPreview'] = async(uploadFile) => {
   window.location.href=captersdata.value.onlineaddress
}
const handlesuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    captersdata.value.localaddress = response.data.localaddress,
        captersdata.value.onlineaddress = response.data.onlineaddress
}
const handerbef: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        ElMessage.error('文件格式为docx')
        return false
    }
    else if (rawFile.size / 1024 > 30) {
        ElMessage.error('文件大小过大')
        return false
    }
    return true
}
const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
    ElMessage.warning(
        `The limit is 1, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length
        } totally`
    )
}
const handlererror: UploadProps['onError'] = (error) => {
    ElMessage.error(error.message)
    isdrawershow.value = false
    captersdata.value = {
        novalname: '',
        capters: '',
        captersname: '',
        localaddress: '',
        onlineaddress: '',
    }
    uploadRef.value?.clearFiles()
}
const rules = reactive<FormRules>({
    captersname: [
        { required: true, message: '章节名不能为空', trigger: 'blur' },
        { min: 1, message: '章节名长度过短', trigger: 'blur' },
        { max: 15, message: '章节名长度过长', trigger: 'blur' },
    ],
    capters: [
        { required: true, message: '章节不能为空', trigger: 'blur', },
    ],
    onlineaddress: [
        { required: true, message: '文章不能为空', trigger: 'blur' },
        { pattern: /^[http:\/\/127.0.0.1:5566\/getnoval]/, message: '提交的文章格式不正确', trigger: 'blur' }
    ],
})
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            await addcaptersss.getaddcapters(captersdata.value)
            isdrawershow.value = false
            captersdata.value = {
                novalname: '',
                capters: '',
                captersname: '',
                localaddress: '',
                onlineaddress: '',
            }
            radiovalue.value=false
            emit('addcapters')
            uploadRef.value?.submit()
            uploadRef.value?.clearFiles()
        } else {
            console.log('提交错误', fields)
        }
    })
}
const updatecurinfo = (row: any) => {
    captersdata.value.novalname = row.novalname
}
const updatecurinfo1 = (value: string) => {
    captersdata.value.capters = value
    curvalue.value=value
}
const remove = () => {
    isdrawershow.value = false
    captersdata.value = {
        novalname: '',
        capters: '',
        captersname: '',
        localaddress: '',
        onlineaddress: '',
    }
    radiovalue.value=false
    uploadRef.value?.clearFiles()
}
const getoldcapters=(val:string)=>{
    allcapterinfos.value.forEach((value:any)=>{
        if(value.capters==val){
            captersdata.value.novalname=value.novalname
            captersdata.value.capters=value.capters
            captersdata.value.captersname=value.captersname
            captersdata.value.localaddress=value.localaddress
            captersdata.value.onlineaddress=value.docxpath
            captersdata.value.id=value.id
            fileList.value=[{
                name:value.capters+value.captersname,
                url:value.docxpath
            }]
        }
    })
}
const switchchange=(value:any)=>{
    if(!value){
        captersdata.value.capters=curvalue.value as string
        captersdata.value.captersname=''
        captersdata.value.localaddress=''
        captersdata.value.onlineaddress=''
        delete captersdata.value.id
        fileList.value=[]
    }   
}
defineExpose({
    updatecurinfo,
    updatecurinfo1
})
</script>

<style  scoped>

</style>