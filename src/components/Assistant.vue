<template>
  <!-- <ion-grid class="ion-padding">
    <ion-row 
      v-for="message in messageList"
      :class="[message.type, 'message']"
      :key="message.time"
    >
      <div class="avatar">
        <ion-avatar>
          <img src="../assets/images/assistant.png" v-if="message.type === 'left'">
          <img :src="userInfo.image" alt="" v-else>
        </ion-avatar>
      </div>
      <div class="content">
        <ion-card class="ion-no-margin" v-show="message.type === 'left'">
          <type-writer :message="message.content" :shown="message.shown"></type-writer>
        </ion-card>
        <ion-card class="ion-no-margin" v-show="message.type === 'right'">
          {{ message.content }}
        </ion-card>
      </div>
    </ion-row>
  </ion-grid> -->
</template>

<script lang="ts">
import { IonGrid, IonRow, IonAvatar, IonCard } from '@ionic/vue'
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Assistant',
  components: {
    IonAvatar,
    IonCard,
    IonGrid,
    IonRow
  },
  setup() {
    const sendMessage = async () => {
      // if (inputValue.value.trim() !== '') {
      //   const text = inputValue.value
      //   inputValue.value = ''
        
      //   messageList.value.push({
      //     type: 'right',
      //     content: text,
      //     time: Date.now()
      //   })
        
      //   const message = {
      //     type: 'left',
      //     content: '思考中...',
      //     shown: false,
      //     time: Date.now()
      //   }
        
      //   messageList.value.push(message)
        
      //   const response = await request.get(`/ai/chat?message=${text}`)
        
      //   messageList.value[messageList.value.length - 1].content = response.data
        
      //   setTimeout(() => {
      //     messageList.value[messageList.value.length - 1].shown = true
        // }, 100) // 防止后面接收到的内容来不及显示
      // }
    }

    return {
      // sendMessage
    }
  }
})
</script>