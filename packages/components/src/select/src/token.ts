import type { InjectionKey, Ref } from 'vue'
import type { TooltipInstance } from 'element-plus'
import type { CxzSelectProps } from './props'

import { Config } from './select.types'

export interface SelectContext {
  props: CxzSelectProps
  selectRef: HTMLElement
  popperRef: Ref<TooltipInstance>
  expanded: boolean
  selectedMaps: Map<any, any>
  query: string
  config: Config
  disabled: boolean
  selectSize: string
  inputWidth: number
  setSoftFocus: () => void
  toggleMenu: () => void
}

export const selectInjectionKey: InjectionKey<SelectContext> =
  Symbol('CxzSelectInjection')
