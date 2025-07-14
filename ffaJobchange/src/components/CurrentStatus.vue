<script setup lang="ts">
interface CharacterStatus {
  id: string
  name: string
  value: number | null
}

// 親からcurrentStatusを取得
const porps = defineProps<{
  currentStatuses: CharacterStatus[]
}>()
</script>
<template>
  <table>
    <thead>
      <tr>
        <th scope="col" class="b1" colspan="2">現在値</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="currentItem in currentStatuses" :key="currentItem.id">
        <th scope="row" class="b2">{{ currentItem.name }}</th>
        <td>{{ currentItem.value }}</td>
      </tr>
    </tbody>
  </table>
</template>
