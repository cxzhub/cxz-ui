import { computed, nextTick, ref, watch } from 'vue'
import { flattenOptions, isValidOption } from './util'
import { isEmpty, isFunction } from 'element-plus/es/utils/index'
import { difference, isPlainObject, isArray } from 'lodash-es'
import { ElMessage } from 'element-plus'

import type { Option } from './select.types'
import type { SelectContext } from './token'

export function useSelectList(select: SelectContext) {
  const listRef = ref()
  const hoveringIndex = ref(-1)

  const filteredOptions = computed(() => {
    const { options, loading } = select.props
    const { config, query } = select
    if (loading) {
      return []
    }
    const temp = options
      .map((v) => {
        if (isArray(v[config.children])) {
          const filtered = v[config.children].filter((el: Option) =>
            isValidOption(el, config, query)
          )
          if (filtered.length > 0) {
            return {
              ...v,
              [config.children]: filtered
            }
          }
        } else if (isValidOption(v, config, query)) {
          return v
        }
        return null
      })
      .filter(Boolean) as Option[]

    return flattenOptions(temp, config)
  })

  const optionsAllDisabled = computed(() =>
    filteredOptions.value.every((option) => option.disabled)
  )

  const updateHoveringIndex = (idx: number) => {
    hoveringIndex.value = idx
  }

  const scrollToItem = (index: number) => {
    listRef.value?.scrollToItem(index)
  }

  const indexRef = computed<number>(() => {
    const { multiple, modelValue } = select.props
    const { config } = select
    if (multiple) {
      const len = (modelValue as [])?.length
      if (len) {
        return filteredOptions.value.findIndex(
          (o) => o[config.value] === modelValue[len - 1]
        )
      }
    } else if (!isEmpty(modelValue)) {
      return filteredOptions.value.findIndex(
        (o) => o[config.value] === modelValue
      )
    }
    return -1
  })

  watch(
    () => select.expanded,
    (val) => {
      if (val) {
        nextTick(() => {
          if (~indexRef.value) {
            updateHoveringIndex(indexRef.value)
            scrollToItem(hoveringIndex.value)
          }
        })
      }
    },
    {
      immediate: true
    }
  )

  const onKeyboardNavigate = (
    direction: 'forward' | 'backward',
    index: number = hoveringIndex.value
  ) => {
    const options = filteredOptions.value
    const { disabled, config } = select

    if (
      !['forward', 'backward'].includes(direction) ||
      options.length <= 0 ||
      disabled ||
      optionsAllDisabled.value
    ) {
      return
    }
    if (!select.expanded) {
      select.toggleMenu()
      return
    }

    let newIndex = -1
    if (direction === 'forward') {
      newIndex = index + 1
      if (newIndex >= options.length) {
        newIndex = 0
      }
    } else if (direction === 'backward') {
      newIndex = index - 1
      if (newIndex < 0 || newIndex >= options.length) {
        newIndex = options.length - 1
      }
    }
    const option = options[newIndex]
    if (option[config.disabled] || option.type === 'Group') {
      onKeyboardNavigate(direction, newIndex)
      return
    }
    updateHoveringIndex(newIndex)
    scrollToItem(newIndex)
  }

  const onKeyboardSelect = () => {
    if (!select.expanded) {
      select.toggleMenu()
    } else if (
      ~hoveringIndex.value &&
      filteredOptions.value[hoveringIndex.value]
    ) {
      onSelect(filteredOptions.value[hoveringIndex.value])
    }
  }

  const onHover = (val: any) => {
    hoveringIndex.value = val
  }

  const onSelect = async (val: Record<string, any>) => {
    const { config, selectedMaps } = select
    const { beforeSelect, multiple, multipleLimitText } = select.props

    const key = select.props.isObject ? val : val[config.value]
    const hasSelected = selectedMaps.has(key)

    if (isFunction(beforeSelect)) {
      try {
        const before = await beforeSelect(key, { ...val }, !hasSelected)
        if (before === false) {
          return
        }
      } catch (error) {
        return
      }
    }

    if (multiple) {
      if (hasSelected) {
        selectedMaps.delete(key)
      } else if (
        select.props.multipleLimit &&
        selectedMaps.size >= select.props.multipleLimit
      ) {
        ElMessage.warning(multipleLimitText)
      } else {
        selectedMaps.set(key, { ...val })
      }
      select.setSoftFocus()
    } else {
      if (!hasSelected) {
        selectedMaps.clear()
        selectedMaps.set(key, { ...val })
      }
      select.expanded = false
    }
  }

  watch(
    () => select.props.modelValue,
    (val) => {
      const { selectedMaps, config } = select
      if (isEmpty(val)) {
        selectedMaps.clear()
        return
      }

      const temp = isArray(val) ? [...val] : [val]
      const toDelete = difference([...selectedMaps.keys()], temp)

      temp.forEach((el) => {
        const isObject = isPlainObject(el)
        const key = isObject ? el[config.value] : el
        if (isEmpty(key)) {
          return
        }
        const item =
          filteredOptions.value?.find((o) => o[config.value] === key) ?? // 从options中获取
          selectedMaps.get(el) ?? // 看看是否已经暂存
          select.props.valueOptions?.find((o) => o[config.value] === key) ?? // 从valueOptions中获取
          (isObject ? el : {}) // 从modelValue中获取

        selectedMaps.set(el, { ...item })
      })

      toDelete.forEach((el) => {
        selectedMaps.delete(el)
      })
    },
    {
      immediate: true
    }
  )

  watch(filteredOptions, (val) => {
    if (!val?.length) {
      return
    }
    const { selectedMaps, config } = select

    for (const key of selectedMaps.keys()) {
      const item = val.find((o) => {
        const plainKey = isPlainObject(key) ? key[config.value] : key
        return o[config.value] === plainKey
      })
      if (item) {
        selectedMaps.set(key, item)
      }
    }
  })

  const listHeight = computed(() => {
    const { height, itemHeight } = select.props

    const totalHeight = filteredOptions.value.length * itemHeight
    return totalHeight > height ? height : totalHeight
  })

  const emptyText = computed(() => {
    const { loading, loadingText, emptyText: text } = select.props
    if (loading) {
      return loadingText
    }
    if (filteredOptions.value.length === 0) {
      return text
    }
    return null
  })

  return {
    listRef,
    filteredOptions,
    listHeight,
    emptyText,
    hoveringIndex,
    onKeyboardNavigate,
    onKeyboardSelect,
    onHover,
    onSelect
  }
}
