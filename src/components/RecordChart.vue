<template>
  <ion-card>
    <ion-card-header>
      <ion-item>
        <ion-select placeholder="选择记录范围" v-model="selectedPeriod">
          <div slot="label"><slot></slot></div>
          <ion-select-option value="week">近一星期</ion-select-option>
          <ion-select-option value="month">近一个月</ion-select-option>
          <ion-select-option value="season">近三个月</ion-select-option>
        </ion-select>
      </ion-item>
    </ion-card-header>
    <ion-card-content class="ion-text-center">
      <div ref="chart" id="box" style="width: 300px; height: 200px;"></div>
    </ion-card-content>
  </ion-card>
</template>

<script>
import { IonCard, IonCardHeader, IonCardContent, IonItem, IonSelect, IonSelectOption } from '@ionic/vue'
import { ref, onMounted, defineComponent } from 'vue'
import * as echarts from 'echarts'

export default defineComponent({
  components: {
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonItem,
    IonSelect,
    IonSelectOption
  },
  setup() {
    const chart = ref(null)
    const selectedPeriod = ref('week')
    const chartData = ref([3.9, 4.0, 11.3, 5.5, 7.9, 5.6, 11.1])
    let chartInstance = null

    const updateChart = () => {
      if (chartInstance) {
        chartInstance.setOption({
          series: {
            data: chartData.value
          }
        })
      }
    }

    onMounted(() => {
      // 延迟一段时间后展示图表
      setTimeout(() => {
        chartInstance = echarts.init(chart.value)

        chartInstance.setOption({
          xAxis: {
            type: 'category',
            data: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            axisLabel: {
              interval: 0,
              formatter: (value) => {
                return value.split('').join('\n')
              }
            }
          },
          yAxis: {
            type: 'value'
          },
          series: {
            type: 'line',
            data: chartData.value,
            lineStyle: {
              type: 'dashed'
            }
          },
          grid: {
            left: '0',
            right: '0',
            top: '10%',
            bottom: '0',
            containLabel: true
          }
        })
      }, 500) // 延迟 500ms 后显示图表，以确保 DOM 准备好
    })

    return {
      chart,
      selectedPeriod,
      updateChart
    }
  }
})
</script>

<style scoped>
</style>
