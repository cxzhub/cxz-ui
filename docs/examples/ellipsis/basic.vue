<template>
  <CxzEllipsis :content="content1" />
  <CxzEllipsis :content="content2" />
</template>

<script setup lang="ts">
import { CxzEllipsis } from '@cxz-ui/components'
import { ref } from 'vue'

const content1 = ref('洛神赋')

const content2 = ref(
  '黄初三年，余朝京师，还济洛川。古人有言，斯水之神，名曰宓妃。感宋玉对楚王神女之事，遂作斯赋。其辞曰：余从京域，言归东藩。背伊阙，越轘辕，经通谷，陵景山。日既西倾，车殆马烦。尔乃税驾乎蘅皋，秣驷乎芝田，容与乎阳林，流眄乎洛川。于是精移神骇，忽焉思散。俯则未察，仰以殊观，睹一丽人，于岩之畔。乃援御者而告之曰：“尔有觌于彼者乎？彼何人斯？若此之艳也！”御者对曰：“臣闻河洛之神，名曰宓妃。然则君王之所见也，无乃是乎？其状若何？臣愿闻之。”'
)
</script>
