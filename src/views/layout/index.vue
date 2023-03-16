<template>
    <div class="common-layout">
        <el-container>
            <el-header class="header">
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link"
                        style="color:white;line-height: 60px;margin-left: 90vw;cursor: pointer;">
                        <el-image style="width: 30px; height: 30px;border-radius: 50%;vertical-align: middle;"
                            :src="avatorurl" fit="fill" />
                        {{ username }}<el-icon class="el-icon--right" style="vertical-align: middle">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="a">退出登录</el-dropdown-item>
                            <el-dropdown-item command="b">修改密码</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-header>
            <el-container>
                <el-aside width="200px" class="aside">
                    <el-menu :default-active="screenitem" class="el-menu-vertical-demo" :router="true">
                        <el-sub-menu index="">
                            <template #title>
                                <el-icon>
                                    <Platform />
                                </el-icon>
                                <span>后台面板</span>
                            </template>
                            <el-menu-item index="/layout/control">
                                控制台
                            </el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu index="">
                            <template #title>
                                <el-icon>
                                    <Document />
                                </el-icon>
                                <span>员工管理</span>
                            </template>
                            <el-menu-item index="/layout/employees">
                                员工
                            </el-menu-item>
                            <el-menu-item index="/layout/role">
                                角色管理
                            </el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu index="3">
                            <template #title>
                                <el-icon>
                                    <Notebook />
                                </el-icon>
                                <span>书籍管理</span>
                            </template>
                            <el-menu-item index="/layout/books">
                                书籍
                            </el-menu-item>
                            <el-menu-item index="/layout/classify">
                                分类管理
                            </el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu index="4">
                            <template #title>
                                <el-icon>
                                    <EditPen />
                                </el-icon>
                                <span>撰写小说</span>
                            </template>
                            <el-menu-item index="/layout/writebook">
                                撰写小说
                            </el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu index="5">
                            <template #title>
                                <el-icon>
                                    <Message />
                                </el-icon>
                                <span id="contentyungh"> <el-badge :value="newnewsnumber" class="item" type="primary" id="badgelo"></el-badge>信息中心</span>
                            </template>
                            <el-menu-item index="/layout/news">
                                个人信息 
                            </el-menu-item>
                        </el-sub-menu>
                    </el-menu>
                </el-aside>
                <el-main style="background-color:rgb(14 13 13 / 24%)">
                    <el-breadcrumb :separator-icon="ArrowRight">
                        <el-breadcrumb-item @click="changeroute(curroutename[0])">
                            <template v-slot="cwrl">
                                <div class="xie" :class="{ xuanzhon: curroutename[0].route == screenitem }">
                                    {{ curroutename[0].index }}
                                </div>
                            </template>
                        </el-breadcrumb-item>
                        <el-breadcrumb-item v-for="value, index in curroutename.slice(1)" :key="value.route"
                            @click="changeroute(value)">
                            <template v-slot="cwrl">
                                <div class="xie" :class="{ xuanzhon: value.route == screenitem }">
                                    {{ value.index }}
                                    <el-icon style="vertical-align:middle;margin-left: 5px;"
                                        @click.stop="deleteroute(index)">
                                        <Close />
                                    </el-icon>
                                </div>
                            </template>
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                    <router-view>
                    </router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang='ts'>
import {
    Document,
    Menu as IconMenu,
    ArrowDown,
    ArrowRight
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { userexit } from '../../stores/user/index'
import { useRouter, useRoute } from 'vue-router';
import { onMounted, ref, onBeforeUnmount, watch, getCurrentInstance, type Ref,inject} from 'vue'
import { useinfo } from '../../stores/user/index'
let newnewsnumber:Ref=inject('newnewsnumber') as Ref
type curroute = {
    index: string,
    route: string
}
const instance = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const exit = userexit()
let username = ref('')
let screenitem = ref('')
let avatorurl = ref<string>()
onMounted(async () => {
    const userinfo = useinfo()
    await userinfo.getuserinfo()
    username.value = userinfo.userinfo.username
    instance?.proxy?.$socket.io.connect()
    instance?.proxy?.$socket.io.emit('login', username.value)
    avatorurl.value = userinfo.userinfo.avator
})
const newdata = localStorage.getItem('preroute') == null ? [] : JSON.parse(localStorage.getItem('preroute') as string)
const curroutename = ref<curroute[]>(newdata)
const handleCommand = async (command: string | number | object) => {
    if (command === 'a') {
        try {
            await exit.getexit()
            router.push('/login')
            localStorage.removeItem('valuetoken')
            instance?.proxy?.$socket.io.disconnect()
            ElMessage({
                message: '退出登录成功',
                type: 'success',
            })
        } catch (error: any) {
            ElMessage.error(error.message)
        }
    }
}
const changeroute = (value: any) => {
    router.push(value.route)
}
const deleteroute = (index: any) => {
    if (index == curroutename.value.length - 2) {
        curroutename.value.splice(index + 1, 1)
        router.push(curroutename.value[index].route)
    }
    else {
        curroutename.value.splice(index + 1, 1)
    }
}
watch(() => route.path, (newValue, oldValue) => {
    const m = curroutename.value.every((value) => {
        return value.route !== newValue
    })
    if (m) {
        curroutename.value.push({
            index: route.meta.name as string,
            route: newValue
        })
    }
    localStorage.setItem('preroute', JSON.stringify(curroutename.value))
    screenitem.value = newValue
}, { immediate: true })
onBeforeUnmount(() => {
    localStorage.removeItem('preroute')
})
</script>

<style  scoped>
.common-layout {
    width: 100%;
    height: 97vh;
}

.common-layout .el-aside {
    height: 90vh;
}

.el-menu-vertical-demo {
    height: 100%;
}

.header {
    background-color: #545c64;
}

.example-showcase .el-dropdown-link {
    cursor: pointer;
    color: white;
    display: flex;
    align-items: center;
}

.xie {
    height: 35px;
    background-color: white;
    border-radius: 5px;
    padding: 0 10px;
    line-height: 35px;
    cursor: pointer
}

.xuanzhon {
    background-color: skyblue;
}
#contentyungh{
    position: relative;
    left: -30px;
}
#badgelo{
    position: relative;
    left: 80px;
    top: -30px;
}
</style>