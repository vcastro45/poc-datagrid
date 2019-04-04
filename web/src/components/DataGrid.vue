<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-data-table
      class="data-grid"
      v-bind="props"
  >
    <template v-slot:item="item">
      {{log(item)}}
      <tr>
        <td v-if="showExpand">
          <v-icon
            v-if="getChild(item.item)"
            @click="isExpanded(item) ? contractRow(item) : expandRow(item)"
            class="icon-expandable"
            :class="{ 'icon-expanded': isExpanded(item) }"
          >
            mdi-chevron-right
          </v-icon>
        </td>
        <editable-cell class="text-xs-left" v-for="(header, i) in item.headers" :key="i" v-model="item.item[header.value]" v-if="item.item[header.value] !== undefined"/>
      </tr>

      <tr v-if="isExpanded(item)">
        <td :colspan="expandSize + 1" v-if="getChild(item.item)">
          <slot name="child" v-bind:child="getChild(item.item)"></slot>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import EditableCell from './EditableCell.vue'
import clone from 'lodash/clone'
import isFunction from 'lodash/isFunction'

@Component({
  components: {
    DataGrid,
    EditableCell
  }
})
export default class DataGrid extends Vue {
  log = console.log
  @Prop({ default: null })
  lineSize: string | null

  @Prop({ type: [String, Function], default: 'child' })
  itemChild: string | ((item: any) => boolean | undefined)

  get expandSize (): number {
    if (this.props.headers) {
      return this.props.headers.length
    } else if (this.props.items) {
      let larger = 1
      for (let item of this.props.items) {
        let size = Object.keys(item).length
        if (size > larger) larger = size
      }
      return larger
    }
    return 1
  }

  get showExpand () {
    return this.props['show-expand'] !== undefined
  }

  get linePadding (): string | null {
    if (this.lineSize) {
      return `py-${this.lineSize}`
    }
    return null
  }

  get props () {
    const attrs = clone(this.$attrs)
    delete attrs.value
    delete attrs.itemChild
    if (this.lineSize !== null) {
      (attrs as any).dense = true
    }
    return attrs
  }

  getChild (item: any): boolean {
    return isFunction(this.itemChild) ? this.itemChild(item) : item[this.itemChild]
  }

  contractRow (row: any): void {
    row.expand.on.input(false)
  }

  expandRow (row: any): void {
    row.expand.on.input(true)
  }

  isExpanded (row: any): boolean {
    return row.expand.props.value
  }
}
</script>

<style scoped lang="scss">
  .icon-expandable {
    transition: transform .5s;
  }

  .icon-expanded {
    transform: rotateZ(90deg);
  }
</style>
