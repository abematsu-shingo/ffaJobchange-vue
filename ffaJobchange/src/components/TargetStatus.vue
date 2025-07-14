<script setup lang="ts">
interface CharacterStatus {
  id: string
  name: string
  value: number | null
}

const props = defineProps<{
  targetStatuses: CharacterStatus[]
}>()
</script>
<template>
  <table>
    <thead>
      <tr>
        <th scope="col" class="b1" colspan="2">目標値</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="targetItem in targetStatuses" :key="targetItem.id">
        <th scope="row" class="b2">{{ targetItem.name }}</th>
        <td>
          <input v-model="targetItem.value" class="b3" type="text" placeholder="2.目標値を入力" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
