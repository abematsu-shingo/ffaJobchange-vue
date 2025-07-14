<script setup lang="ts">
import { ref } from 'vue'
import CharacterId from './components/CharacterId.vue'
import CurrentStatus from './components/CurrentStatus.vue'
import TargetStatus from './components/TargetStatus.vue'
import CalcButton from './components/CalcButton.vue'
import CalcStatus from './components/CalcStatus.vue'
import HowToUse from './components/HowToUse.vue'

// 各ステータスの型定義
interface CharacterStatus {
  id: string
  name: string
  value: number | null
}

// 各ステータス値オブジェクト配列
const createCharacterStatusRef = () => {
  return ref<CharacterStatus[]>([
    { id: 'power', name: '力', value: null },
    { id: 'intelligence', name: '知能', value: null },
    { id: 'faith', name: '信仰心', value: null },
    { id: 'vitality', name: '生命力', value: null },
    { id: 'dexterity', name: '器用さ', value: null },
    { id: 'speed', name: '速さ', value: null },
    { id: 'charm', name: '魅力', value: null },
    { id: 'luck', name: '運', value: null },
  ])
}

const characterData = ref({
  currentStatuses: createCharacterStatusRef(), // 現在の各ステータス値
  targetStatuses: createCharacterStatusRef(), // 目標の各ステータス値
  uncpStatuses: createCharacterStatusRef(), // カプセルなしの各ステータス値
  cpStatuses: createCharacterStatusRef(), // カプセル込みの各ステータス値
})

// <CalcButton>のemit受取
const sumStatus = {
  newUncpSum: ref<string>(''),
  newCpSum: ref<string>(''),
}
const handleNewSum = (uncpSumValue: string, newCpSumValue: string) => {
  sumStatus.newUncpSum.value = uncpSumValue
  sumStatus.newCpSum.value = newCpSumValue
}

// リセットボタンクリック時、画面更新
const resetButton = () => {
  window.location.reload()
}
</script>

<template>
  <h1>FFA+転職金額計算スクリプト</h1>
  <nav>
    <a href="#howto">使い方</a>
  </nav>
  <div class="flex">
    <div class="left">
      <!-- キャラクターID入力、反映ボタン -->
      <CharacterId :currentStatuses="characterData.currentStatuses" />

      <div class="status">
        <!-- キャラクターステータスの現在値 -->
        <CurrentStatus :currentStatuses="characterData.currentStatuses" />
        <p>⇒</p>
        <!-- キャラクターステータスの目標値 -->
        <TargetStatus :targetStatuses="characterData.targetStatuses" />
      </div>

      <!-- 転職金額計算ボタン -->
      <CalcButton :data="characterData" @newSum="handleNewSum" />

      <div class="flex">
        <!-- 転職金額 -->
        <CalcStatus :data="characterData" :sumData="sumStatus" />
      </div>
      <button @click="resetButton" class="reset">リセットする</button>
    </div>

    <!-- how to use -->
    <div id="howto" class="right">
      <HowToUse />
    </div>
  </div>
</template>

<style>
nav {
  display: none;
}
h2,
h3 {
  margin-bottom: 0;
}
p {
  margin-top: 0;
}
table {
  border: 0;
  background-color: #c2d1e2;
}
tbody th {
  text-align: left;
}
th,
td {
  background-color: #fff;
  color: #364047;
  font-size: 10pt;
  font-weight: normal;
}
.b1 {
  background: #3769bb;
  border: solid 3px;
  border-color: #99c #336 #336 #99c;
  color: #fff;
  text-align: center;
  width: 25vw;
}
.b2 {
  background-color: #c2d1e2;
  border: solid 1px;
  border-color: #fff #669 #669 #ccf;
  width: 5vw;
}
.b3 {
  width: 20vw;
}
.b4 {
  background: #3769bb;
  border: solid 3px;
  border-color: #99c #336 #336 #99c;
  color: #fff;
  text-align: center;
}
.bold {
  font-weight: bold;
}
textarea {
  padding: 0 2px;
  margin: 0;
}
button {
  font-size: 10pt;
  background-color: #ffffff;
  border: solid 1px #364047;
  margin-bottom: 10px;
}
a {
  color: #0052d5;
}
a:hover {
  color: #5093ff;
}
li {
  margin-bottom: 5px;
}
.status {
  display: flex;
  width: 55vw;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
.flex {
  display: flex;
}
.left {
  width: 60vw;
}
.right {
  padding: 0 20px 0;
  width: 40vw;
  border: solid 1px;
  color: #364047;
  font-size: 9pt;
}

@media screen and (max-width: 480px) {
  h1 {
    font-size: 25px;
    margin-bottom: 0;
  }
  nav {
    display: block;
    margin-bottom: 10px;
  }
  .b1 {
    width: 95vw;
  }
  .b2 {
    width: 15vw;
  }
  .b3 {
    width: 80vw;
  }
  .flex {
    display: block;
  }
  .status {
    width: 95vw;
    display: block;
  }
  .status p {
    display: none;
  }
  .left {
    width: 95vw;
  }
  .right {
    width: 85vw;
  }
  .last-table .b3 {
    width: 40vw;
  }
}
</style>
