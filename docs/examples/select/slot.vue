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
    img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201812%2F12%2F20181212220737_yuutv.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1688612570&t=5e20e99c9ae594e87ec97cc6035147f2'
  },
  {
    id: '11112',
    name: '宋江',
    phone: '178****2222',
    img: 'https://img1.baidu.com/it/u=610286213,3835210945&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
  },
  {
    id: '11113',
    name: '朱元璋',
    phone: '156****8989',
    img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201712%2F18%2F20171218085616_FKGar.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1688612704&t=528154849c46501b7d88f41eb2a8bf87'
  },
  {
    id: '11114',
    name: '花木兰',
    phone: '139****0312',
    img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fef4b09ad-4425-4739-b383-10b60f34c5ac%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1688612704&t=35c9c0687c82d75f13d328fd7049c118'
  },
  {
    id: '11115',
    name: '妹喜',
    phone: '138****2347',
    img: 'https://c-ssl.dtstatic.com/uploads/item/201712/20/20171220070428_aHAQm.thumb.1000_0.jpeg'
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
