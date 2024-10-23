<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Arduino 蓝牙连接</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- <ion-button @click="scanDevices">扫描设备</ion-button>
      <ion-list>
        <ion-item
          v-for="device in devices"
          :key="device.address"
          @click="connectToDevice(device)"
        >
          {{ device.name }} ({{ device.address }})
        </ion-item>
      </ion-list>
      <div>
        <h2>已连接设备: {{ connectedDevice?.name || '未连接到设备' }}</h2>
        <button @click="disconnectDevice">断开连接</button>

        <h3>接收到的数据：</h3>
        <ul>
          <li v-for="(item, index) in receivedData" :key="index">
            {{ item }}
          </li>
        </ul>
      </div> -->
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle,  IonButton, IonList, IonItem } from '@ionic/vue'
import { ref } from 'vue';

export default {
  components: {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonList,
    IonItem
  },
  setup() {
    const devices = ref([]) // 存储扫描到的设备列表
    const connectedDevice = ref({ name: '', address: '' }) // 存储已连接设备信息
    const receivedData = ref([]) // 存储接收到的数据

    // 扫描蓝牙设备
    // 报错是因为没有在手机上运行，实际是正常的
    // const scanDevices = () => {
    //   bluetoothSerial.list(
    //     (deviceList) => {
    //       devices.value = deviceList
    //       console.log('找到设备:', deviceList)
    //     },
    //     (error) => {
    //       console.error('扫描失败:', error)
    //       alert('无法扫描设备，请检查蓝牙状态')
    //     }
    //   )

      // 未连接设备的扫描，因为权限首先所以先连接

      // bluetoothSerial.discoverUnpaired(
      //   (deviceList) => {
      //     devices.value = deviceList
      //     console.log('找到设备:', deviceList)
      //   },
      //   (error) => {
      //     console.error('扫描失败:', error)
      //     alert('无法扫描设备，请检查蓝牙状态')
      //   }
      // )
    // }

    // 连接到选中的蓝牙设备
    // const connectToDevice = (device) => {
    //   bluetoothSerial.connect(
    //     device.address,
    //     () => {
    //       console.log(`成功连接到设备: ${device.name}`)
    //       alert(`已连接到 ${device.name}`)
    //       connectedDevice.value = device

    //       // 开始监听设备发送的数据
    //       bluetoothSerial.subscribe(
    //         '\n',
    //         (data) => {
    //           console.log(`收到设备数据: ${data}`)
    //           receivedData.value.push(data) // 将数据添加到数组中
    //         },
    //         (error) => {
    //           console.error('数据监听失败:', error)
    //         }
    //       );
    //     },
    //     (error) => {
    //       console.error('连接失败:', error)
    //       alert('连接失败，请重试')
    //     }
    //   )
    // }

    // const disconnectDevice = () => {
    //   bluetoothSerial.disconnect(
    //     () => {
    //       console.log('设备已断开连接')
    //       alert('设备已断开连接')
    //       bluetoothSerial.unsubscribe()
    //       connectedDevice.value = {} // 重置为初始状态
    //       receivedData.value = []
    //     },
    //     (error) => {
    //       console.error('断开连接失败:', error)
    //     }
    //   )
    // }

    // return {
    //   devices,
    //   scanDevices,
    //   connectToDevice,
    //   disconnectDevice,
    //   connectedDevice,
    //   receivedData
    // }
  }
}
</script>
