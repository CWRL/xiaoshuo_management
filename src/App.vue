<template>
        <router-view>
        </router-view>
</template>

<script setup lang='ts'>
import { useinfo } from './stores/user/index'
import { getCurrentInstance, onMounted, ref,onBeforeUnmount,inject} from 'vue'
import type {Ref} from 'vue'
import { app } from './main'
const uservalue = useinfo()
const instance = getCurrentInstance()
const newsinfo = ref([])
app.provide('news', newsinfo)
let newnewsnumber=ref(0)
app.provide('newnewsnumber',newnewsnumber)
let searchvalues=ref('')
app.provide('searchvalues',searchvalues)
let searchname=ref('个人邮件')
app.provide('searchname',searchname)
let getnewsobject = {
        getnews(news: any) {
                let count=0
               let nres1= news.map((value:any)=>{
                        value.content= "<p style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap'>"+value.content+"</p>"
                        if(value.isready===0){
                                count++
                        }
                        return value
                })
                newnewsnumber.value=count
                newsinfo.value = nres1.reverse()
        },
        hasnews() {
                instance?.proxy?.$socket.io.emit('getnullnew',searchname.value,searchvalues.value)
        }
}
onMounted(() => {
        instance?.proxy?.$onevent(getnewsobject, instance.proxy)
})
onBeforeUnmount(()=>{
        instance?.proxy?.$removeevent(getnewsobject,instance.proxy)
})
</script>

<style  scoped>

</style>