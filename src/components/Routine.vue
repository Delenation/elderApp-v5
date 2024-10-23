<template>
  <div class="todoList">
    <div class="title">今日提醒</div>
    <hr>
    <div class="content">
      <div class="listItem" v-for="(data, index) of todoList" :key="index">
        {{ data.item }}················{{ data.time }}
      </div>
    </div>
    <div class="add">
      <button @click="addList">+&emsp;日程</button>
    </div>
    <div class="addItem" v-if="adding">
      <div class="content">
        <span class="cancel iconfont" @click="addList">&#xe672;</span>
        <div>日程添加</div>
        <hr>
        <div>日程主题：<input type="text" v-model="routineItem"></div>
        <div>日程时间：<input type="text" v-model="routineTime"></div>
        <div class="buttons">
          <button class="confirm" @click="confirmAdd">确定</button>
          <button @click="cancelAdd">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      adding: false,
      routineItem: '',
      routineTime: '',
      todoList: [
        {
          item: "吃药提醒",
          time: "9:45 AM"
        },
        {
          item: "看病提醒",
          time: "1:45 PM"
        }
      ]
    }
  },
  methods: {
    addList() {
      this.adding = !this.adding
    },
    confirmAdd() {
      this.todoList.push({
        item: this.routineItem,
        time: this.routineTime
      })
      this.adding = !this.adding
      this.routineItem = ''
      this.routineTime = ''
    },
    cancelAdd() {
      this.adding = !this.adding
      this.routineItem = ''
      this.routineTime = ''
    }
  }
}
</script>

<style scoped>
.todoList {
  width: 90%;
  height: 16rem;
  margin-top: 1rem;
  border-radius: 1rem;
  background-color: white;
  position: relative;
}

.title {
  margin: 0.5rem 1rem;
  font-weight: bold;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.listItem {
  width: 13rem;
  margin-top: 0.5rem;
  text-align: right;
  border-left: .25rem solid red;
}

.add {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0;
  text-align: center;
}

.add button {
  width: 5rem;
  height: 2rem;
  font-size: 1rem;
  background-color: white;
  border: .0625rem gray dashed;
  border-radius: .375rem;
}

.addItem {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  background-color: #b6b6b6;
}

.content {
  width: 16rem;
  height: 16rem;
  margin-bottom: 5rem;
  font-weight: bold;
  background-color: white;
  border-radius: 1rem;
  z-index: 3;
  padding-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
}

.cancel {
  width: 1rem;
  height: 1rem;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 100;
  color: gray;
  font-size: 1rem;
}

hr {
  width: 90%;
}

input {
  height: 1rem;
}

.buttons {
  display: flex;
  width: 60%;
  justify-content: space-between;
  position: absolute;
  bottom: 1rem;
}

.buttons button {
  width: 4rem;
  height: 2rem;
  font-size: 1rem;
  border: .0625rem gray dashed;
  border-radius: .375rem;
}

.confirm {
  color: white;
  background-color: #52b7f5;
}
</style>
