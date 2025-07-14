import { ref, type Ref } from 'vue'

export const useCountdown = () => {
  const count = ref<number>(0) // 10秒のカウントダウン計算用定数
  let timer: ReturnType<typeof setInterval> | null = null // カウントダウンタイマー(setInterval)の変数
  const showCountdownTimer = ref(false) // カウントダウンタイマーの表示・非表示

  // secとmessageRefを引数として受け取る
  const startCountdown = (sec: number, messageRef: Ref<string>) => {
    // カウントが0になったらonFinish(ステータス反映)を実行する
    return new Promise<void>((onFinish) => {
      clearInterval(timer!) // 前回のタイマーを止める処理
      count.value = sec // countに10秒を代入
      showCountdownTimer.value = true
      messageRef.value = '反映まで、たぶん'

      // setInterval:一定時間ごとに処理を実行する
      timer = setInterval(() => {
        if (count.value > 1) {
          // countが1以上だったらカウントダウン
          count.value--
        } else {
          if (count.value === 1 && messageRef.value === '反映まで、たぶん') {
            // 10秒経っても反映されない場合は90秒のカウントダウン開始
            count.value = 90
            messageRef.value = 'サーバーがスリープ中かも...もう少し待ってね'
          }
          onFinish() // countが0になったらonFinish
        }
      }, 1000) // 1000m/秒(1秒)毎にカウントダウン
    })
  }
  return {
    count,
    showCountdownTimer,
    startCountdown,
  }
}
