<script setup lang="ts">
import { ref } from 'vue'
import { defineEmits, defineProps } from 'vue'

interface CharacterStatus {
  id: string
  name: string
  value: number | null
}

const props = defineProps<{
  data: {
    currentStatuses: CharacterStatus[]
    targetStatuses: CharacterStatus[]
    uncpStatuses: CharacterStatus[]
    cpStatuses: CharacterStatus[]
  }
}>()

const emits = defineEmits<{
  (e: 'newSum', uncpSumValue: string, cpSumValue: string): void
}>()

let uncpSum = ref<number | null>(null) // カプセルなしの合計値
const newUncpSum = ref<string>('') // toLocaleString
let cpSum = ref<number | null>(null) // カプセル込みの合計値
const newCpSum = ref<string>('') // toLocaleString

// 「目標金額を計算する」ボタンクリック時
const calcStatus = () => {
  // カプセルなしで、目標値×50000
  props.data.uncpStatuses.forEach((item, index) => {
    // Null合体演算子(??)：目標値がnullや空文字の場合0を返す。
    item.value = (props.data.targetStatuses[index].value ?? 0) * 50000
  })

  // カプセルなしの合計値
  uncpSum.value = props.data.uncpStatuses.reduce((sum, item) => {
    return sum + (item.value ?? 0)
  }, 0)

  newUncpSum.value = uncpSum.value.toLocaleString('ja-JP') // カプセルなしの合計値を3桁区切りに更新

  // カプセル込みで、目標値×50000
  props.data.cpStatuses.forEach((item, index) => {
    const currentIndex = props.data.currentStatuses[index].value ?? 0 // 現在値の各ステータス
    const targetIndex = props.data.targetStatuses[index].value ?? 0 // 目標値の各ステータス
    const formula = ((Math.floor(currentIndex / 10) - 1) * 10) / 2 // 計算式の定数
    if (currentIndex < 10) {
      // ステータス値が10より低い場合、計算がマイナスになるため、現在値を無視。目標値×50000
      item.value = targetIndex * 50000
    } else if (targetIndex < formula || props.data.targetStatuses[index].value === 0) {
      // 同系統へ変換後のカプセルが目標値より高い、もしくは目標値が0の場合、貯金額0
      item.value = 0
    } else {
      // 変換後のカプセルが目標値より低い場合、((目標値)-(カプセル))×50000
      item.value = (targetIndex - formula) * 50000
    }
  })

  // カプセル込みの合計値
  cpSum.value = props.data.cpStatuses.reduce((sum, item) => {
    return sum + (item.value ?? 0)
  }, 0)

  newCpSum.value = cpSum.value.toLocaleString('ja-JP') // カプセル込みの合計値を3桁区切りに変換

  emits('newSum', newUncpSum.value, newCpSum.value)
}
</script>
<template>
  <!-- 転職金額計算ボタン -->
  <button @click="calcStatus">目標金額を計算する</button>
</template>
