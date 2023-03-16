<template>
    <el-pagination align="chenter" v-model:current-page="currentPage4" v-model:page-size="pageSize4" :page-sizes="[3,5]"
        :small="small" :disabled="disabled" :background="background" layout="prev, pager, next,jumper,->,total, sizes"
        :total="totals"  />
</template>

<script setup lang='ts'>
import { ref,inject,watchEffect} from 'vue'
import type { Ref } from 'vue';
let totals:Ref=inject('total') as Ref
const emit=defineEmits<{
    (e:'changcur',CurrentPage:number,pages:number):void
}>()
const currentPage4 = ref(1)
const pageSize4 = ref(3)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
watchEffect(()=>{
    if(currentPage4.value>parseInt((totals.value/pageSize4.value).toString())+1){
        emit('changcur',parseInt((totals.value/pageSize4.value).toString())+1,pageSize4.value)
        return
    }
    emit('changcur',currentPage4.value,pageSize4.value)
})


</script>

<style scoped>
.el-pagination{
    margin-top: 20px;
   margin-left: 380px;
}
</style>