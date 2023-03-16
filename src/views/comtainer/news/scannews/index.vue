<template>
    <el-dialog v-model="isdialog" title="收信站">
        <p><b>发件人</b>:{{dialognews.pushuser}}</p>
       <p> <b>收件人</b>:{{dialognews.username}}</p>
         <p><b>时间</b>:{{dialognews.date}}</p>
         <hr>
       <el-card class="box-card">
            <p><div v-html="dialognews.content"></div> </p>
        </el-card>
    </el-dialog>
</template>

<script setup lang='ts'>
import {inject} from 'vue'
import type {Ref} from 'vue'
let isdialog:Ref=inject('isdialog') as Ref
let dialognews:Ref=inject('dialognews') as Ref
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
.box-card{
    width: 99%;
    height: 40.5vh;
    margin-top: 10px;
}
</style>