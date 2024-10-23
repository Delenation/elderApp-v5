<template>
  <div class="labels">
    <ion-chip
      v-for="(label, index) of labels"
      :key="index"
      :color="getColor(index)"
    >
      {{ label }}
    </ion-chip>
  </div>
</template>

<script lang="ts">
import { IonChip } from '@ionic/vue'
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LabelAppender',
  props: {
    labels: {
      type: Array,
      default: []
    }
  },
  components: {
    IonChip
  },
  setup(props, ctx) {
    const colors = ['skyblue', 'tertiary', 'success', 'warning']

    const getColor = (index) => {
      return colors[index % colors.length]
    }

    return {
      getColor
    }
  }
})
</script>

<style scoped>
.labels {
  width: 100;
  display: flex;
  flex-wrap: wrap;
}
</style>