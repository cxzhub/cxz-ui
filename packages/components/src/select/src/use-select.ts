import { computed, nextTick, reactive, ref, unref, watch } from 'vue'
import { useFormItem, useSize, useNamespace } from 'element-plus'
import {
  getComponentSize,
  isEmpty,
  isFunction
} from 'element-plus/es/utils/index'
import { useElementSize } from '@vueuse/core'
import { debounce as lodashDebounce, isEqual, isArray } from 'lodash-es'

import type { CxzSelectProps } from './props'
import type { Config } from './select.types'

export function useSelect(props: CxzSelectProps, emit: any, config: Config) {
  const selectRef = ref()
  const popperRef = ref()
  const popperPaneRef = computed(() => popperRef.value?.popperRef?.contentRef)
  const inputRef = ref()
  const optionsRef = ref()
  const filterRef = ref()
  const tagsRef = ref()
  const prefixRef = ref()

  const selectSize = useSize()
  const { form, formItem } = useFormItem()
  const { width: inputWidth } = useElementSize(inputRef)
  const { height: tagsHeight } = useElementSize(tagsRef)
  const { width: prefixWidth } = useElementSize(prefixRef)
  const nsSelect = useNamespace('select')

  const states = reactive({
    expanded: false, // 是否展开
    mouseEnter: false, // 鼠标进入
    selectedMaps: new Map(), // 用来存储选中值的详细内容
    query: '', // 搜索框的值
    displayValue: '', // input框显示的值
    isFocus: false // 是否focus
  })
  const filterValue = ref('')

  const selectDisabled = computed(() => !!(props.disabled || form?.disabled))

  const showClose = computed(
    () =>
      props.clearable &&
      !selectDisabled.value &&
      states.mouseEnter &&
      !isEmpty(props.modelValue)
  )

  const handleClickOutside = () => {
    states.expanded = false
  }

  const toggleMenu = () => {
    if (!selectDisabled.value) {
      states.expanded = !states.expanded
    }
  }

  watch(
    () => states.expanded,
    (val) => {
      nextTick(() => {
        if (val) {
          setFocus()
        } else {
          setBlur()
        }
      })
      emit('visible-change', val)
    }
  )

  const setFocus = () => {
    if (!states.isFocus) {
      states.isFocus = true
      if (props.filterable) {
        filterRef.value?.focus?.()
      } else {
        inputRef.value?.focus?.()
      }
      emit('focus')
    }
  }

  const setSoftFocus = () => {
    inputRef.value?.focus()
  }

  const setBlur = () => {
    if (states.isFocus) {
      states.isFocus = false
      filterRef.value?.blur?.()
      inputRef.value?.blur?.()
      filterValue.value = ''
      emit('blur')
    }
  }

  const emitChange = (val1: any[] = [], val2: Record<string, any>[] = []) => {
    const value = props.multiple ? val1 : val1[0] ?? ''
    const option = props.multiple ? val2 : val2[0] ?? {}
    emit('update:modelValue', value)
    emit('change', value, option)

    if (props.validateEvent) {
      formItem?.validate('change').catch((err: any) => {
        console.warn(err)
      })
    }
  }

  const handleClearClick = () => {
    emitChange()
    filterValue.value = ''
    emit('clear')
  }

  watch(
    () => states.selectedMaps.keys(),
    (val) => {
      const keys = [...val]
      const equal = props.multiple
        ? isEqual(keys, props.modelValue)
        : isEqual(keys[0] ?? '', props.modelValue ?? '')

      if (!equal) {
        const values = [...states.selectedMaps.values()]
        emitChange(keys, values)
      }
    }
  )

  const currentPlaceholder = computed(() => {
    if (filterValue.value) {
      return ''
    }
    if (!isEmpty(props.modelValue)) {
      if (!props.multiple && states.isFocus && props.filterable) {
        return states.selectedMaps.get(props.modelValue)[config.label]
      }
      return ''
    }
    return props.placeholder
  })

  const currentDisplayValue = computed(() => {
    if (props.multiple || isEmpty(props.modelValue)) {
      return ''
    }
    if (!props.multiple && states.isFocus && props.filterable) {
      return ''
    }
    const val = isArray(props.modelValue)
      ? props.modelValue[0]
      : props.modelValue
    return states.selectedMaps.get(val)?.[config.label] ?? val
  })

  watch(currentDisplayValue, (val) => {
    // 解决回显文字被选中问题
    nextTick(() => {
      states.displayValue = val
    })
  })

  const debounce = computed(() => (props.remote ? 300 : 0))
  const handleQueryChange = (val: string) => {
    if (props.remote && isFunction(props.remoteMethod)) {
      props.remoteMethod(val)
    } else if (isFunction(props.filterMethod)) {
      props.filterMethod(val)
    } else {
      states.query = val
    }
  }
  const debouncedQueryChange = lodashDebounce((e) => {
    handleQueryChange(e)
  }, debounce.value)

  watch(filterValue, (val) => {
    debouncedQueryChange(val)
  })

  const onEscOrTab = () => {
    states.expanded = false
  }

  const onForward = () => {
    optionsRef.value?.onKeyboardNavigate('forward')
  }

  const onBackward = () => {
    optionsRef.value?.onKeyboardNavigate('backward')
  }

  const onKeyboardSelect = () => {
    optionsRef.value?.onKeyboardSelect()
  }

  watch(tagsHeight, () => {
    const input = inputRef.value.$el.querySelector('input') as HTMLInputElement
    const sizeInMap = getComponentSize(selectSize.value || form?.size)
    const height = Math.max(
      sizeInMap,
      tagsHeight.value + (tagsHeight.value > sizeInMap ? 6 : 0)
    )
    input.style.height = `${height - 2}px`
    popperRef.value?.updatePopper?.()
  })

  const wrapperKls = computed(() => {
    const classList = [nsSelect.b()]
    const _selectSize = unref(selectSize)
    if (_selectSize) {
      classList.push(nsSelect.m(_selectSize))
    }
    if (props.disabled) {
      classList.push(nsSelect.m('disabled'))
    }
    return classList
  })

  const selectTagsStyle = computed(() => ({
    maxWidth: `${inputWidth.value - 32}px`,
    width: '100%'
  }))

  return {
    // DOM
    selectRef,
    popperRef,
    popperPaneRef,
    inputRef,
    optionsRef,
    filterRef,
    tagsRef,
    prefixRef,

    // readonly data
    states,
    inputWidth,
    selectSize,
    selectDisabled,
    showClose,
    currentPlaceholder,
    nsSelect,
    prefixWidth,

    // style
    wrapperKls,
    selectTagsStyle,

    filterValue,

    // method
    handleClickOutside,
    toggleMenu,
    handleClearClick,
    setSoftFocus,
    onEscOrTab,
    onForward,
    onBackward,
    onKeyboardSelect
  }
}
