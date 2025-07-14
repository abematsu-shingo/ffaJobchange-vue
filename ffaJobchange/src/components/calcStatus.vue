<script setup lang="ts">
import { ref, type Ref } from 'vue'

interface CharacterStatus {
  id: string
  name: string
  value: number | null
}

const props = defineProps<{
  data: {
    uncpStatuses: CharacterStatus[]
    cpStatuses: CharacterStatus[]
  }
  sumData: {
    newUncpSum: Ref<string>
    newCpSum: Ref<string>
  }
}>()
</script>
<template>
  <!-- 転職金額 -->
  <table class="last-table">
    <thead>
      <tr>
        <th scope="col" class="b1" colspan="3">転職金額</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="col" class="b2"><b>ステ名</b></th>
        <th scope="col" class="b2"><b>カプセルなし</b></th>
        <th scope="col" class="b2"><b>カプセル込み</b></th>
      </tr>
      <tr v-for="(uncpItem, index) in props.data.uncpStatuses" :key="uncpItem.id">
        <th scope="row" class="b2">{{ uncpItem.name }}</th>
        <td class="b3">{{ uncpItem.value }}</td>
        <td>{{ props.data.cpStatuses[index].value }}</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th class="b4">合計</th>
        <td class="b3 bold">{{ props.sumData.newUncpSum }}</td>
        <td class="b3 bold">{{ props.sumData.newCpSum }}</td>
      </tr>
    </tfoot>
  </table>
</template>
