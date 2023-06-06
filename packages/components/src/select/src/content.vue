<template>
  <span
    v-if="props.collapseTags && selected.length"
    :class="[nsSelect.b('tags-wrapper'), { 'has-prefix': selected.length }]"
  >
    <el-tag
      :closable="
        !select.disabled &&
        !select.selectedMaps.get(selected[0])?.[select.config.disabled]
      "
      :size="collapseTagSize"
      :type="props.tagType"
      disable-transitions
      @close="deleteTag(selected[0])"
    >
      <span :class="nsSelect.e('tags-text')" :style="tagTextStyle">
        <slot
          :value="selected[0]"
          :option="select.selectedMaps.get(selected[0])"
        >
          {{
            select.selectedMaps.get(selected[0])?.[select.config.label] ??
            selected[0]
          }}
        </slot>
      </span>
    </el-tag>
    <el-tag
      v-if="selected.length > 1"
      :closable="false"
      :size="collapseTagSize"
      :type="props.tagType"
      disable-transitions
    >
      <el-tooltip
        v-if="props.collapseTagsTooltip"
        :disabled="select.expanded"
        :fallback-placements="['bottom', 'top', 'right', 'left']"
        effect="light"
        placement="bottom"
        :teleported="true"
      >
        <template #default>
          <span :class="nsSelect.e('tags-text')">
            + {{ selected.length - 1 }}
          </span>
        </template>
        <template #content>
          <el-scrollbar
            max-height="45vh"
            always
            :view-style="{ maxWidth: '50vw', width: 'max-content' }"
          >
            <div :class="nsSelect.e('collapse-tags')">
              <div
                v-for="(item, idx) in selected.slice(1)"
                :key="idx"
                :class="nsSelect.e('collapse-tag')"
              >
                <el-tag
                  :key="item"
                  class="in-tooltip"
                  :closable="
                    !select.disabled &&
                    !select.selectedMaps.get(item)?.[select.config.disabled]
                  "
                  :size="collapseTagSize"
                  :type="props.tagType"
                  disable-transitions
                  :style="{ margin: '2px' }"
                  @close="deleteTag(item)"
                >
                  <span
                    :class="nsSelect.e('tags-text')"
                    :style="{
                      maxWidth: select.inputWidth - 75 + 'px'
                    }"
                  >
                    <slot :value="item" :option="select.selectedMaps.get(item)">
                      {{
                        select.selectedMaps.get(item)?.[select.config.label] ??
                        item
                      }}
                    </slot>
                  </span>
                </el-tag>
              </div>
            </div>
          </el-scrollbar>
        </template>
      </el-tooltip>
      <span v-else :class="nsSelect.e('tags-text')">
        + {{ selected.length - 1 }}
      </span>
    </el-tag>
  </span>

  <transition v-if="!props.collapseTags">
    <span
      :class="[nsSelect.b('tags-wrapper'), { 'has-prefix': selected.length }]"
    >
      <el-scrollbar :max-height="props.tagsHeight" always>
        <el-tag
          v-for="item in selected"
          :key="item"
          :closable="
            !select.disabled &&
            !select.selectedMaps.get(item)?.[select.config.disabled]
          "
          :size="collapseTagSize"
          :type="props.tagType"
          disable-transitions
          @close="deleteTag(item)"
        >
          <span
            :class="nsSelect.e('tags-text')"
            :style="{ maxWidth: select.inputWidth - 75 + 'px' }"
          >
            <slot :value="item" :option="select.selectedMaps.get(item)">
              {{ select.selectedMaps.get(item)?.[select.config.label] ?? item }}
            </slot>
          </span>
        </el-tag>
      </el-scrollbar>
    </span>
  </transition>
</template>

<script setup lang="ts">
import { useNamespace } from 'element-plus'
import { computed, inject } from 'vue'
import { ElTag, ElTooltip, ElScrollbar } from 'element-plus'
import { selectInjectionKey } from './token'

const nsSelect = useNamespace('select')
const select = inject(selectInjectionKey)!

const emit = defineEmits<{
  (e: 'remove-tag', val: any): void
}>()

const { props } = select

const selected = computed(() => [...select.selectedMaps.keys()])

const collapseTagSize = computed(() =>
  ['small'].includes(select.selectSize) ? 'small' : 'default'
)

const deleteTag = (val: any) => {
  select.selectedMaps.delete(val)
  emit('remove-tag', val)
}

const tagTextStyle = computed(() => {
  const { inputWidth } = select
  const maxWidth = inputWidth > 123 ? inputWidth - 123 : inputWidth - 75
  return { maxWidth: `${maxWidth}px` }
})
</script>
