<template>
    <el-drawer v-model="keydrawer" :title="`${keyname}角色`" direction="rtl" size="50%" :close-on-click-modal="false"
        :close-on-press-escape="false" :show-close="false">
        <el-form label-width="120px" :model="addvalue" :rules="rules" ref="ruleFormRef">
            <el-form-item label="角色名称" prop="rolename">
                <el-input v-model="addvalue.rolename" />
            </el-form-item>
            <el-form-item label="角色描述">
                <el-input :rows="7" type="textarea" placeholder="Please input" v-model="addvalue.roledescribe" />
            </el-form-item>
            <el-form-item>
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<script setup lang='ts'>
import { inject, ref, reactive,watch, type ReactiveEffectOptions} from 'vue'
import type { Ref } from 'vue'
import { ElDrawer } from 'element-plus'
import { useaddrole,useupdaterole} from '../../../../../stores/role/index'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from "element-plus";
type roletype = {
    id: number,
    rolename: string,
    roledescribe: string,
    status: number
}
const ruleFormRef = ref<FormInstance>()
const updaterole=useupdaterole()
const emit = defineEmits<{
    (e: 'addroleupdate'): void
}>()
const useadd = useaddrole()
const id=ref<number>(1)
let keydrawer: Ref = inject('keydrawer') as Ref
let keyname:Ref=inject('keyname') as Ref
type addvaluetype = {
    rolename: string,
    roledescribe: string
}
const addvalue = ref<addvaluetype>({
    rolename: '',
    roledescribe: ''
})
const changeroleinfo=(value:roletype)=>{
    id.value=value.id
    addvalue.value.rolename=value.rolename,
    addvalue.value.roledescribe=value.roledescribe
}
const rules = reactive<FormRules>({
    rolename: [
        { required: true, message: '角色名不能为空', trigger: 'blur' },
        { min: 1, message: '角色名过短', trigger: 'blur' },
        { max: 8, message: '角色名过长', trigger: 'blur' }
    ]
})
const cancel = () => {
    keydrawer.value = false
    addvalue.value = {
        rolename: '',
        roledescribe: ''
    }
}
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            if(keyname.value==='新增'){
                await useadd.postaddrole(addvalue.value)
            }
            if(keyname.value==='修改'){
                await updaterole.updaterole(id.value,addvalue.value)
            }
            keydrawer.value = false
            emit('addroleupdate')
            addvalue.value = {
                rolename: '',
                roledescribe: ''
            }
        } else {
            ElMessage.error('提交失败')
            
        }
    })
}
defineExpose({
    changeroleinfo
})
</script>

<style  scoped>

</style>