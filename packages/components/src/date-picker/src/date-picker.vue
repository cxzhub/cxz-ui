<template>
  <el-date-picker
    ref="elDatePickerRef"
    v-bind="{
      ...omit(props, [
        'beforeDisabledDate',
        'afterDisabledDate',
        'dateRangeLimit'
      ]),
      ...$attrs
    }"
    :disabled-date="mergeDisabledDate"
    @calendar-change="onCalendarChange"
    @focus="onFocus"
  >
    <template #default v-if="$slots.default">
      <slot name="default" />
    </template>

    <template #range-separator v-if="$slots['range-separator']">
      <slot name="range-separator" />
    </template>
  </el-date-picker>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import { omit } from 'lodash-es'
import { ElDatePicker } from 'element-plus'

import { cxzDatePickerProp } from './date-picker'

const props = defineProps(cxzDatePickerProp)
const emit = defineEmits<{
  (e: 'focus', val: FocusEvent): void
  (e: 'calendar-change', val: [Date, Date]): void
}>()

const elDatePickerRef = ref()

const pickDay = ref()
let count = 0

const onCalendarChange = (val: [Date, Date]) => {
  const [pointDay] = val
  pickDay.value = pointDay
  count++
  emit('calendar-change', val)
}

const onFocus = (e: FocusEvent) => {
  if (!(count % 2)) {
    pickDay.value = null
    count = 0
  }
  emit('focus', e)
}

const disabledRange = (time: Date) => {
  if (!pickDay.value || !props.dateRangeLimit) {
    return false
  }
  const con1 =
    dayjs(pickDay.value).valueOf() -
    (props.dateRangeLimit - 1) * 24 * 60 * 60 * 1000
  const con2 =
    dayjs(pickDay.value).valueOf() +
    (props.dateRangeLimit - 1) * 24 * 60 * 60 * 1000

  return time.getTime() < con1 || time.getTime() > con2
}

const mergeDisabledDate = (time: Date) => {
  if (
    props.beforeDisabledDate &&
    time.getTime() <
      dayjs(props.beforeDisabledDate).subtract(1, 'day').valueOf()
  ) {
    return true
  }
  if (
    props.afterDisabledDate &&
    time.getTime() > dayjs(props.afterDisabledDate).valueOf()
  ) {
    return true
  }
  return disabledRange(time) || props.disabledDate?.(time)
}

defineExpose({
  focus: () => {
    elDatePickerRef.value?.focus()
  },
  handleOpen: () => {
    elDatePickerRef.value?.handleOpen()
  },
  handleClose: () => {
    elDatePickerRef.value?.handleClose()
  }
})
</script>
