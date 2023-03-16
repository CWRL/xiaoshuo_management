<template>
    <div class="login">
        <el-form label-width="120px" id="form" :model="userinfo" :rules="rules" ref="ruleFormRef">
            <span
                style="color:white;font-size:20px;margin-bottom: 30px;text-align: center;margin-left: 100px;">请登录</span>
            <el-form-item label="账号" size="large" style="width:500px" prop="username">
                <el-input v-model="userinfo.username" />
            </el-form-item>
            <el-form-item label="密码" size="large" style="width:500px" prop="password">
                <el-input v-model="userinfo.password" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="btn" style="width:380px;margin-left: 5px;"
                    @click="submitForm(ruleFormRef)">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { uselogin } from '../../stores/user/index'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const router=useRouter()
const useloginstore = uselogin()
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
    username: [
        { required: true, message: '用户名不能为空', trigger: 'change' },
        { min: 1, max: 10, message: '用户长度应在1-10之间', trigger: 'change' }
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'change' },
        { pattern: /^[\S]/, message: '密码以字符开头', trigger: 'change' },
        { min: 8, message: '密码长度过短', trigger: 'change' },
        { max: 12, message: '密码长度过长', trigger: 'change' },
    ]
})
let userinfo = reactive({
    username: '',
    password: ''
})
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            try {
                const m = await useloginstore.getlogin(userinfo)
                ElMessage({
                    message:m.message,
                    type: 'success',
                })
                router.push('/layout')
            } catch (error: any) {
                ElMessage.error(error.message)
            }
        } else {
            ElMessage.error('请正确输入用户名和密码')
        }
    })
}
</script>

<style  scoped>
.login {
    background-image: url('../../assets/background.png');
    width: 100%;
    height: 97vh;
    background-size: cover;
    position: relative;
}

#form {
    width: 400px;
    height: 200px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    color: black;
    font-weight: 700;
}
</style>