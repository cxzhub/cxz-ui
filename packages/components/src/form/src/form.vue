<template>
  <div class="cxz-form">
    <el-form
      ref="formRef"
      v-bind="formProps"
      :model="value"
      @validate="(val:any) => emits('validate', val)"
    >
      <el-row v-bind="layoutRow">
        <template v-for="(item, index) in schema" :key="item.prop">
          <el-col
            v-show="showCount > index"
            v-bind="{ ...layoutCol, ...item.layout }"
          >
            <el-form-item
              v-bind="
                omit(item, [
                  'layout',
                  'slot',
                  'labelSlot',
                  'errorSlot',
                  'component',
                  'componentAttrs'
                ])
              "
            >
              <component
                v-if="item.slot && slots[item.slot]"
                :is="(slots[item.slot] as any)"
              />
              <component
                :model-value="get(value, item.prop)"
                @update:model-value="(val:any) => set(value, item.prop, val)"
                v-else-if="item.component"
                :is="item.component"
                v-bind="item.componentAttrs"
              />

              <template v-if="item.labelSlot && slots[item.labelSlot]" #label>
                <component :is="(slots[item.labelSlot] as any)" />
              </template>

              <template v-if="item.errorSlot && slots[item.errorSlot]" #error>
                <component :is="(slots[item.errorSlot] as any)" />
              </template>
            </el-form-item>
          </el-col>
        </template>
        <slot name="$append" />
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, useSlots, computed } from 'vue'
import { ElForm, ElFormItem, ElRow, ElCol } from 'element-plus'
import { omit, get, set } from 'lodash-es'
import { cxzFormProps } from './form'

const props = defineProps(cxzFormProps)
const emits = defineEmits(['update:modelValue', 'validate'])
const slots = useSlots()

const value = computed({
  get: () => props.modelValue,
  set: (val) => {
    emits('update:modelValue', val)
  }
})

const formProps = computed(() => {
  const { schema, layoutRow, layoutCol, modelValue, ...rest } = props
  return rest
})

const formRef = ref<InstanceType<typeof ElForm>>()

defineExpose({
  formRef
})
</script>
