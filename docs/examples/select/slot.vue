<template>
  <CxzSelect
    :options="options"
    :props="{
      label: 'name',
      value: 'id'
    }"
    v-model="value"
    :item-height="50"
  >
    <template #default="{ option }">
      <div class="option-container">
        <div class="left"><el-avatar :src="option.img" :size="32" /></div>
        <div class="right">
          <div>{{ option.name }}</div>
          <div class="msg">
            <span>工号：{{ option.id }}</span>
            <span>手机号：{{ option.phone }}</span>
          </div>
        </div>
      </div>
    </template>
  </CxzSelect>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CxzSelect } from '@cxz-ui/components'

const options = ref([
  {
    id: '11111',
    name: '杨延昭',
    phone: '177****1234',
    img: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
  },
  {
    id: '11112',
    name: '宋江',
    phone: '178****2222',
    img: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg'
  },
  {
    id: '11113',
    name: '朱元璋',
    phone: '156****8989',
    img: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg'
  },
  {
    id: '11114',
    name: '花木兰',
    phone: '139****0312',
    img: 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg'
  },
  {
    id: '11115',
    name: '妹喜',
    phone: '138****2347',
    img: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg'
  }
])

const value = ref()
</script>

<style lang="scss" scoped>
.option-container {
  display: flex;
  height: 50px;
  overflow: hidden;
  align-items: center;
  width: 100%;
  .left {
    display: flex;
    align-items: center;
  }

  .right {
    flex: 1;
    display: flex;
    line-height: 22px;
    flex-direction: column;
    margin-left: 12px;

    .msg {
      color: #86909c;
      font-weight: 400;
      span + span {
        margin-left: 20px;
      }
    }
  }
}
</style>
