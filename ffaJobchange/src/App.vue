<script setup lang="ts">
import { ref } from 'vue'
import CharacterId from './components/CharacterId.vue'
import CurrentStatus from './components/CurrentStatus.vue'

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

const currentStatuses = createCharacterStatusRef() // 現在の各ステータス値
const targetStatuses = createCharacterStatusRef() // 目標の各ステータス値
const uncpStatuses = createCharacterStatusRef() // カプセルなしの各ステータス値
const cpStatuses = createCharacterStatusRef() // カプセル込みの各ステータス値

let uncpSum = ref<number | null>(null) // カプセルなしの合計値
const newUncpSum = ref<string>('') // toLocaleString
let cpSum = ref<number | null>(null) // カプセル込みの合計値
const newCpSum = ref<string>('') // toLocaleString

// 「目標金額を計算する」ボタンクリック時
const calcStatus = () => {
  // カプセルなしで、目標値×50000
  uncpStatuses.value.forEach((item, index) => {
    // Null合体演算子(??)：目標値がnullや空文字の場合0を返す。
    item.value = (targetStatuses.value[index].value ?? 0) * 50000
  })

  // カプセルなしの合計値
  uncpSum.value = uncpStatuses.value.reduce((sum, item) => {
    return sum + (item.value ?? 0)
  }, 0)

  newUncpSum.value = uncpSum.value.toLocaleString('ja-JP') // カプセルなしの合計値を3桁区切りに更新

  // カプセル込みで、目標値×50000
  cpStatuses.value.forEach((item, index) => {
    const currentIndex = currentStatuses.value[index].value ?? 0 // 現在値の各ステータス
    const targetIndex = targetStatuses.value[index].value ?? 0 // 目標値の各ステータス
    const formula = ((Math.floor(currentIndex / 10) - 1) * 10) / 2 // 計算式の定数
    if (currentIndex < 10) {
      // ステータス値が10より低い場合、計算がマイナスになるため、現在値を無視。目標値×50000
      item.value = targetIndex * 50000
    } else if (targetIndex < formula || targetStatuses.value[index].value === 0) {
      // 同系統へ変換後のカプセルが目標値より高い、もしくは目標値が0の場合、貯金額0
      item.value = 0
    } else {
      // 変換後のカプセルが目標値より低い場合、((目標値)-(カプセル))×50000
      item.value = (targetIndex - formula) * 50000
    }
  })

  // カプセル込みの合計値
  cpSum.value = cpStatuses.value.reduce((sum, item) => {
    return sum + (item.value ?? 0)
  }, 0)

  newCpSum.value = cpSum.value.toLocaleString('ja-JP') // カプセル込みの合計値を3桁区切りに変換
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
      <CharacterId :currentStatuses="currentStatuses" />

      <div class="status">
        <!-- キャラクターステータスの現在値 -->
        <CurrentStatus :currentStatuses="currentStatuses" />

        <p>⇒</p>

        <!-- キャラクターステータスの目標値 -->
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
                <input
                  v-model="targetItem.value"
                  class="b3"
                  type="text"
                  placeholder="2.目標値を入力"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 転職金額計算ボタン -->
      <button @click="calcStatus">目標金額を計算する</button>

      <div class="flex">
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
            <tr v-for="(uncpItem, index) in uncpStatuses" :key="uncpItem.id">
              <th scope="row" class="b2">{{ uncpItem.name }}</th>
              <td class="b3">{{ uncpItem.value }}</td>
              <td>{{ cpStatuses[index].value }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th class="b4">合計</th>
              <td class="b3 bold">{{ newUncpSum }}</td>
              <td class="b3 bold">{{ newCpSum }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <button @click="resetButton" class="reset">リセットする</button>
    </div>

    <!-- how to use -->
    <div id="howto" class="right">
      <h2>
        転職金額計算スクリプト <span style="font-weight: lighter; font-size: 15px">v2.1.0</span>
      </h2>
      <p>
        無料WEBゲームサイト<a
          href="http://www.game-can.com/"
          target="blank"
          rel="noopener noreferrer"
          >ゲームの缶詰</a
        >内、
        <a href="http://www.game-can.com/ffa/others.cgi" target="blank" rel="noopener noreferrer"
          >FF Adventure+</a
        >の転職金額計算WEBアプリです。
      </p>
      <p>
        ある程度確認済みですが、バグとか計算ミスとかあるかもしれません。<br />
        皆さんで使ってみて何か気付いたことやご要望があれば
        <a
          href="http://s2.game-can.com:8080/ffa/kairan.cgi?mode=login&id=matutake"
          target="blank"
          rel="noopener noreferrer"
          >matutake</a
        >
        の個メまでご連絡ください。
      </p>

      <hr />

      <h3>使い方</h3>
      <p>
        ID入力したら現在値に反映されるようにしました。不明点あれば教えて下さい。
        <br />もし利用できない場合は
        <a
          href="http://essea-numero2.com/FFA_jobChange.html"
          target="_blank"
          rel="noopener noreferrer"
          >旧ver</a
        >をご利用ください
      </p>
      <ol>
        <li>
          <b>「1」へキャラIDを入力して、「反映」ボタンをクリック</b><br />
          <span style="color: red"
            >反映を押してから10秒経っても反映しない場合は、たぶん「サーバースリープ中」です。そのまま1〜2分待ってください。</span
          >
          <br /><br />
        </li>
        <li>
          <b>「2」へ転職後の目標値を入力して、「目標金額を計算する」ボタンをクリック。</b>
          <br /><br />
        </li>
        <li><b>転職金額テーブルを確認。</b></li>
      </ol>
      <h3>注意事項</h3>
      <ul>
        <li>「リセットする」と書いてあるけど、実はただの更新ボタン。</li>
        <li>ステータスは、1ポイント50000ギルで計算。</li>
        <li>カプセル変換なしは、転職中のカプセル使用後に計算すると便利。</li>
        <li>合計金額のみ3桁区切りで表示。</li>
        <li>現在のステータスが1桁台のときに金額がマイナスになる現象を改善。</li>
        <li>
          最後のアクセスから15分経過するとサーバースリープ状態となります。matutakeがサーバー代を支払うとスリープしなくなります。乞うご期待。
        </li>
      </ul>
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
