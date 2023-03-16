<template>
    <el-card class="box-card">
        <el-row :gutter="12">
            <el-col :span="8">
                <el-card shadow="always">
                    <el-row>
                        用户数量
                    </el-row>
                    <el-divider />
                    <el-row>
                        <span id="wenzhi">0</span>
                    </el-row>
                    <el-divider />
                    <el-row>
                        <div id="userecharts">

                        </div>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="always">
                    <el-row>
                        员工数量
                    </el-row>
                    <el-divider />
                    <el-row>
                        <span id="wenzhi">{{ employeescount }}</span>
                    </el-row>
                    <el-divider />
                    <el-row>
                        <div id="employeesecharts">

                        </div>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="always">
                    <el-row>
                        小说数量
                    </el-row>
                    <el-divider />
                    <el-row>
                        <span id="wenzhi">{{ bookscount }}</span>
                    </el-row>
                    <el-divider />
                    <el-row>
                        <div id="booksecharts"></div>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
    </el-card>
</template>

<script setup lang='ts'>
import { useemployeescount, usebookscount, useemployeesdata, usebooksview } from '../../../../stores/main/index'
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
const getemployesscount = useemployeescount()
const getbookscount = usebookscount()
const employeesdata = useemployeesdata()
const booksviewdata = usebooksview()
const employeescount = ref(0)
const bookscount = ref(0)
type employeesvaluestype = {
    permissions: string;
    count: number;
}
const employeesvalues = ref<employeesvaluestype[]>([])
onMounted(async () => {
    await updateview()
    employeescount.value = getemployesscount.employeescount
    bookscount.value = getbookscount.bookscount
    employeesvalues.value = employeesdata.employessdata
    const employeesview = echarts.init(document.getElementById('employeesecharts') as HTMLElement)
    const booksview = echarts.init(document.getElementById('booksecharts') as HTMLElement)
    const userview = echarts.init(document.getElementById('userecharts') as HTMLElement)
    employeesview.setOption({
        xAxis: {
            type: 'category',
            data: employeesdata.employessdata.map((value, item) => {
                return value.permissions
            }),
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: employeesdata.employessdata.map((value, item) => {
                    return value.count
                }),
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }
        ]
    })
    booksview.setOption({
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: Object.keys(booksviewdata.booksdataview).map((values,item)=>{
                    return{
                        value:booksviewdata.booksdataview[values],
                        name:values
                    }
                }),
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    })
    userview.setOption({
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [0, 0, 0, 0, 0, 0, 0],
                type: 'line'
            }
        ]
    })
})
const updateview = async () => {
    await getemployesscount.getemployeescount()
    await getbookscount.getbookscount()
    await employeesdata.getemployeesdata()
    await booksviewdata.getbooksviewdata()
}
</script>

<style  scoped>
.box-card {
    width: 99%;
    height: 77.5vh;
    margin-top: 10px;
}

#wenzhi {
    font-size: 25px;
    font-weight: 700;
}

#employeesecharts {
    width: 500px;
    height: 400px;
}

#booksecharts {
    width: 500px;
    height: 400px;
}

#userecharts {
    width: 500px;
    height: 400px;
}
</style>