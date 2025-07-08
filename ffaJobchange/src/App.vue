<script setup lang="ts">
import { ref } from 'vue'

// キャラクターIDの定数
const characterId = ref('')

interface CharacterStatus {
  power: number | null
  intelligence: number | null
  faith: number | null
  vitality: number | null
  dexterity: number | null
  speed: number | null
  charm: number | null
  luck: number | null
}

// 現在の各ステータス値
const currentStatus = ref<CharacterStatus>({
  power: null,
  intelligence: null,
  faith: null,
  vitality: null,
  dexterity: null,
  speed: null,
  charm: null,
  luck: null,
})

// 目標の各ステータス値
const targetStatus = ref<CharacterStatus>({
  power: null,
  intelligence: null,
  faith: null,
  vitality: null,
  dexterity: null,
  speed: null,
  charm: null,
  luck: null,
})

// カプセルなしの各ステータス値
const uncpStatus = ref<CharacterStatus>({
  power: null,
  intelligence: null,
  faith: null,
  vitality: null,
  dexterity: null,
  speed: null,
  charm: null,
  luck: null,
})

// カプセル込みの各ステータス値
const cpStatus = ref<CharacterStatus>({
  power: null,
  intelligence: null,
  faith: null,
  vitality: null,
  dexterity: null,
  speed: null,
  charm: null,
  luck: null,
})

// 各合計金額の定数
let uncpSum = ref<number | null>(null)
let cpSum = ref<number | null>(null)
// toLocaleString('ja-JP')使用のためstring型として定義
const newUncpSum = ref<string>('')
const newCpSum = ref<string>('')

// ユーザー向けメッセージの定数
const message = ref('')
// ロードの表示・非表示
const isLoading = ref(false)
// カウントダウンタイマーの表示・非表示
const showCountdownTimer = ref(false)
// 反映ボタンの有効化
const isPush = ref(false)

// 10秒のカウントダウン計算用定数
const count = ref<number>(0)
// カウントダウンタイマー(setInterval)の変数
let timer: ReturnType<typeof setInterval> | null = null

// カウントが0になったらonFinish(ステータス反映)を実行する
const startCountDown = (sec: number) => {
  return new Promise<void>((onFinish) => {
    // 前回のタイマーを止める処理
    clearInterval(timer!)

    // countに10秒を代入
    count.value = sec
    // setInterval:一定時間ごとに処理を実行する
    timer = setInterval(() => {
      if (count.value > 1) {
        // countが1以上だったらカウントダウン
        count.value--
      } else {
        if (count.value === 1 && message.value !== 'ステータス反映しました。') {
          // 10秒経っても反映されない場合は90秒のカウントダウン開始
          count.value = 90
          message.value = 'サーバーがスリープ中かも...反映まで、たぶん'
        }
        // countが0になったらonFinish
        onFinish()
      }

      // 1000m/秒(1秒)毎にカウントダウン
    }, 1000)
  })
}

// 「反映」ボタンクリック時
const fetchCharacterStatus = async () => {
  // messageをクリア
  message.value = ''
  isPush.value = true

  if (characterId.value === '') {
    // ID未入力時
    message.value = 'キャラクターIDを入力してください。'
    return
  }
  // ID入力時、読み込み開始
  message.value = '反映まで、たぶん'
  // ローディング画面・カウントダウンタイマー表示
  isLoading.value = true
  showCountdownTimer.value = true

  // PaaSにデプロイしたAPIエンドポイント
  const backendApiUrl = 'https://ffajobchange-puppeteer.onrender.com/api/get-status'

  try {
    // Promise.all内の処理がすべて完了したらdataに格納
    const [data] = await Promise.all([
      (async () => {
        const response = await fetch(backendApiUrl, {
          // POSTリクエスト送信
          method: 'POST',
          // リクエストヘッダー：JSON形式を指定
          headers: {
            'Content-Type': 'application/json',
          },
          // characterIDをJSON形式で送信
          body: JSON.stringify({ characterId: characterId.value }),
        })

        // レスポンスがOKではない場合エラーを投げる
        if (!response.ok) {
          // JSON形式で届いたエラー
          const errorData = await response.json()
          throw new Error(
            // バックエンドから受け取ったメッセージ　もしくは　データ取得に失敗しちゃった！
            errorData.error || `データ取得に失敗しちゃった！${response.status}`,
          )
        }
        return response.json()
      })(),
      // カウントダウンタイマーを実行する
      startCountDown(10),
    ])

    console.log('データ取得できたよ！', data)

    // 取得した現在値データを、構文Object.keys(obj)でオブジェクトの中身を繰り返し処理定数に反映
    Object.keys(currentStatus.value).forEach((key) => {
      // keyを、interfaceで定義した<CharacterStatus>で型定義
      const k = key as keyof CharacterStatus
      currentStatus.value[k] = data[k]
    })
    message.value = 'ステータス反映しました。'
    isPush.value = false
  } catch (error: any) {
    // エラーが投げられたらエラー表示
    console.error(error)
    message.value =
      error.message || '※ステータス取得できませんでした。キャラクターIDを確認してください。'
  } finally {
    // ロード画面終了
    isLoading.value = false
    showCountdownTimer.value = false
  }
}

const calcStatus = () => {
  // カプセルなしで、目標値×50000
  Object.keys(uncpStatus.value).forEach((key) => {
    const k = key as keyof CharacterStatus
    // Null合体演算子(??)：目標値がnullや空文字の場合0を返す。
    uncpStatus.value[k] = (targetStatus.value[k] ?? 0) * 50000
  })

  // カプセルなしの合計値
  uncpSum.value = Object.keys(uncpStatus.value).reduce((sum, key) => {
    const k = key as keyof CharacterStatus
    return sum + (uncpStatus.value[k] ?? 0)
  }, 0)

  newUncpSum.value = uncpSum.value.toLocaleString('ja-JP')

  // カプセル込みで、目標値×50000
  Object.keys(cpStatus.value).forEach((key) => {
    const k = key as keyof CharacterStatus
    const currentK = currentStatus.value[k] ?? 0
    const targetK = targetStatus.value[k] ?? 0
    const formula = ((Math.floor(currentK / 10) - 1) * 10) / 2
    // Null合体演算子(??)：目標値がnullや空文字の場合0を返す。
    if (currentK < 10) {
      // ステータス値が10より低い場合、計算がマイナスになるため、目標値×50000
      cpStatus.value[k] = targetK * 50000
    } else if (targetK < formula || targetStatus.value[k] === 0) {
      // 同系統へ変換後のカプセルが目標値より高い、もしくは目標値が0の場合、貯金額0
      cpStatus.value[k] = 0
    } else {
      // 変換後のカプセルが目標値より低い場合、((目標値)-(カプセル))×50000
      cpStatus.value[k] = (targetK - formula) * 50000
    }
  })

  // カプセル込みの合計値
  cpSum.value = Object.keys(cpStatus.value).reduce((sum, key) => {
    const k = key as keyof CharacterStatus
    return sum + (cpStatus.value[k] ?? 0)
  }, 0)

  newCpSum.value = cpSum.value.toLocaleString('ja-JP')
}

// ResetButton
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
      <!-- キャラクターID入力フォーム -->
      <input type="text" placeholder="1.キャラIDを入力" v-model="characterId" />
      <button @click="fetchCharacterStatus" :disabled="isPush">反映</button>

      <!-- ユーザー向けメッセージがあれば表示 -->
      <p style="color: red" v-show="message">
        {{ message }}
        <input type="text" size="2" v-if="showCountdownTimer" :value="count" disabled />
      </p>

      <div class="status">
        <!-- キャラクターステータスの現在値 -->
        <table>
          <thead>
            <tr>
              <th scope="col" class="b1" colspan="2">現在値</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" class="b2">力</th>
              <td>{{ currentStatus.power }}</td>
            </tr>
            <tr>
              <th scope="row" class="b2">知能</th>
              <td>{{ currentStatus.intelligence }}</td>
            </tr>
            <tr>
              <th scope="row" class="b2">信仰心</th>
              <td>{{ currentStatus.faith }}</td>
            </tr>
            <tr>
              <th scope="row" class="b2">生命力</th>
              <td>{{ currentStatus.vitality }}</td>
            </tr>
            <tr>
              <th scope="row" class="b2">器用さ</th>
              <td>{{ currentStatus.dexterity }}</td>
            </tr>
            <tr>
              <th scope="row" class="b2">速さ</th>
              <td>{{ currentStatus.speed }}</td>
            </tr>
            <tr>
              <th scope="row" class="b2">魅力</th>
              <td>{{ currentStatus.charm }}</td>
            </tr>
            <tr>
              <th scope="row" class="b2">運</th>
              <td>{{ currentStatus.luck }}</td>
            </tr>
          </tbody>
        </table>

        <p>⇒</p>

        <!-- キャラクターステータスの目標値 -->
        <table>
          <thead>
            <tr>
              <th scope="col" class="b1" colspan="2">目標値</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" class="b2">力</th>
              <td>
                <input
                  v-model="targetStatus.power"
                  class="b3"
                  type="text"
                  placeholder="2.目標値を入力"
                />
              </td>
            </tr>
            <tr>
              <th scope="row" class="b2">知能</th>
              <td>
                <input
                  v-model="targetStatus.intelligence"
                  class="b3"
                  type="text"
                  placeholder="2.目標値を入力"
                />
              </td>
            </tr>
            <tr>
              <th scope="row" class="b2">信仰心</th>
              <td>
                <input
                  v-model="targetStatus.faith"
                  class="b3"
                  type="text"
                  placeholder="2.目標値を入力"
                />
              </td>
            </tr>
            <tr>
              <th scope="row" class="b2">生命力</th>
              <td>
                <input
                  v-model="targetStatus.vitality"
                  class="b3"
                  type="text"
                  placeholder="2.目標値を入力"
                />
              </td>
            </tr>
            <tr>
              <th scope="row" class="b2">器用さ</th>
              <td>
                <input
                  v-model="targetStatus.dexterity"
                  class="b3"
                  type="text"
                  placeholder="2.目標値を入力"
                />
              </td>
            </tr>
            <tr>
              <th scope="row" class="b2">速さ</th>
              <td>
                <input
                  v-model="targetStatus.speed"
                  class="b3"
                  type="text"
                  placeholder="2.目標値を入力"
                />
              </td>
            </tr>
            <tr>
              <th scope="row" class="b2">魅力</th>
              <td>
                <input
                  v-model="targetStatus.charm"
                  class="b3"
                  type="text"
                  placeholder="2.目標値を入力"
                />
              </td>
            </tr>
            <tr>
              <th scope="row" class="b2">運</th>
              <td>
                <input
                  v-model="targetStatus.luck"
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
            <tr>
              <th scope="row" class="b2">力</th>
              <td class="b3">{{ uncpStatus.power }}</td>
              <td>{{ cpStatus.power }}</td>
            </tr>
            <tr>
              <th scope="row" class="b2">知能</th>
              <td class="b3">{{ uncpStatus.intelligence }}</td>
              <td class="b3">{{ cpStatus.intelligence }}</td>
            </tr>
            <tr>
              <th scope="row" class="b2">信仰心</th>
              <td class="b3">{{ uncpStatus.faith }}</td>
              <td class="b3">{{ cpStatus.faith }}</td>
            </tr>
            <tr>
              <th scope="row" class="b2">生命力</th>
              <td class="b3">{{ uncpStatus.vitality }}</td>
              <td class="b3">{{ cpStatus.vitality }}</td>
            </tr>
            <tr>
              <th scope="row" class="b2">器用さ</th>
              <td class="b3">{{ uncpStatus.dexterity }}</td>
              <td class="b3">{{ cpStatus.dexterity }}</td>
            </tr>
            <tr>
              <th scope="row" class="b2">速さ</th>
              <td class="b3">{{ uncpStatus.speed }}</td>
              <td class="b3">{{ cpStatus.speed }}</td>
            </tr>
            <tr>
              <th scope="row" class="b2">魅力</th>
              <td class="b3">{{ uncpStatus.charm }}</td>
              <td class="b3">{{ cpStatus.charm }}</td>
            </tr>
            <tr>
              <th scope="row" class="b2">運</th>
              <td class="b3">{{ uncpStatus.luck }}</td>
              <td class="b3">{{ cpStatus.luck }}</td>
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
        転職金額計算スクリプト <span style="font-weight: lighter; font-size: 15px">v2.0.0</span>
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

<style scoped>
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
