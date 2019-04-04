<template>
  <td class="editable-cell" contenteditable="true" ref="cell">
    {{ item }}
  </td>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class EditableCell extends Vue {
  @Prop({ default: '' })
  value: any

  item: any = ''

  get valueType () {
    return typeof this.value
  }

  mounted () {
    const cell = this.$refs.cell as Element
    cell.addEventListener('input', this.onContentEditableInput)
  }

  beforeDestroy () {
    const cell = this.$refs.cell as Element
    cell.removeEventListener('input', this.onContentEditableInput)
  }

  onContentEditableInput (e: any) {
    if (e && e.path && e.path.length) {
      const elem: HTMLElement = e.path[0]
      const value = elem.innerText.trim()
      if (this.valueType === 'number' && !isNaN(value as number)) {
        const parseFunction = (value as number) % 1 === 0 ? parseInt : parseFloat
        this.$emit('input', parseFunction(value))
      } else {
        this.$emit('input', value)
      }
    }
  }

  placeCaretAtEnd (el: HTMLElement) {
    el.focus()
    if (typeof window.getSelection !== 'undefined'
      && typeof document.createRange !== 'undefined') {
      let range = document.createRange()
      range.selectNodeContents(el)
      range.collapse(false)
      let sel = window.getSelection()
      if (sel) {
        sel.removeAllRanges()
        sel.addRange(range)
      }
    } else if (typeof (document.body as any).createTextRange !== 'undefined') {
      let textRange = (document.body as any).createTextRange()
      textRange.moveToElementText(el)
      textRange.collapse(false)
      textRange.select()
    }
  }


  @Watch('value', { immediate: true })
  onValueChanged (newVal: any) {
    this.item = newVal
  }

  @Watch('item')
  onItemChanged () {
    const cell = this.$refs.cell as HTMLInputElement
    this.placeCaretAtEnd(cell)
  }
}
</script>
