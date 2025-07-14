<script setup lang="ts">
import { ref } from 'vue'
import { fetchCharacterData } from '@/utils/apiFetch' // api取得ユーティリティ関数
import { useCountdown } from '@/composables/useCountdown' // 取得までのカウントcomposable

// 各ステータスの型定義
interface CharacterStatus {
  id: string
  name: string
  value: number | null
}

// 親からcurrentStatusを取得
const props = defineProps<{
  currentStatuses: CharacterStatus[]
}>()

const characterId = ref('') // キャラクターIDの定数
const message = ref('') // ユーザー向けメッセージの定数
const isLoading = ref(false) // ロードの表示・非表示
const isPush = ref(false) // 反映ボタンの有効化
const { count, showCountdownTimer, startCountdown } = useCountdown() // カウントダウンの定数・関数

// 「反映」ボタンクリック時
const fetchCharacterStatus = async () => {
  message.value = '' // messageをクリア
  isPush.value = true // 反映ボタン無効化

  // バリデーション
  if (characterId.value === '') {
    // ID未入力時
    message.value = 'キャラクターIDを入力してください。'
    isPush.value = false
    return
  } else if (/^.*[^ -~｡-ﾟ].*$/.test(characterId.value)) {
    // ユーザーの入力値に全角が含まれていた場合
    message.value = 'キャラクターIDは半角英数字で入力してください。'
    isPush.value = false
    return
  } else if (!/^[a-zA-Z0-9]{4,8}$/.test(characterId.value)) {
    // 半角英数字以外の文字列　かつ　4〜8文字でない場合
    message.value = 'キャラクターIDは半角英数字4〜8文字で入力してください。'
    isPush.value = false
    return
  }

  // ID入力時、読み込み開始
  isLoading.value = true // ローディング画面表示
  showCountdownTimer.value = true // カウントダウンタイマー表示

  try {
    // Promise.all内の処理がすべて完了したらdataに格納
    const [data] = await Promise.all([
      fetchCharacterData(characterId.value), // api取得実行。引数にcharacterIdを渡す
      startCountdown(10, message), // カウントダウンタイマーを実行。引数に10カウントとmessage refを渡す
    ])

    console.log('データ取得できたよ！', data)

    // 展開したcurrentStatusへ、取得したデータを反映
    props.currentStatuses.forEach((item) => {
      if (item.id in data) {
        item.value = Number(data[item.id as keyof typeof data])
      }
    })

    message.value = 'ステータス反映しました。'
    isPush.value = false
  } catch (error: any) {
    // エラーが投げられたらエラー表示
    console.log(`データ取得に失敗しちゃった！${error}`)
    if (error.message === 'Failed to fetch') {
      // サーバーに接続できなかった場合
      message.value = 'サーバーに接続できませんでした。管理者に問い合わせてください。'
    } else {
      // サーバー到達後に何かしらエラーがあった場合
      message.value =
        error.message || '※ステータス取得できませんでした。キャラクターIDを確認してください。'
    }
  } finally {
    isLoading.value = false // ロード画面終了
    showCountdownTimer.value = false // タイマー画面削除
    isPush.value = false // 反映ボタン有効化
  }
}
</script>
<template>
  <!-- キャラクターID入力フォーム -->
  <input type="text" placeholder="1.キャラIDを入力" v-model="characterId" />
  <button @click="fetchCharacterStatus" :disabled="isPush">反映</button>

  <!-- ユーザー向けメッセージがあれば表示 -->
  <p style="color: red" v-show="message">
    {{ message }}
    <input type="text" size="2" v-if="showCountdownTimer" :value="count" />
  </p>
</template>
