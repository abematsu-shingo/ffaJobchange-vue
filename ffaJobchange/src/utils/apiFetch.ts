/**
 * 指定されたキャラクターIDで、バックエンドAPIからステータスデータをフェッチします。
 * @param characterId フェッチするキャラクターのID。
 * @returns フェッチされたステータスデータを含むPromise。
 * @throws APIリクエストが失敗した場合、またはレスポンスが不正な場合にエラーをスローします。
 */
export const fetchCharacterData = async (characterId: string): Promise<any> => {
  // PaaSにデプロイしたAPIエンドポイント
  const backendApiUrl = 'https://ffajobchange-puppeteer.onrender.com/api/get-status'

  const response = await fetch(backendApiUrl, {
    // POSTリクエスト送信
    method: 'POST',
    // リクエストヘッダー：JSON形式を指定
    headers: {
      'Content-Type': 'application/json',
    },
    // characterIDをJSON形式で送信
    body: JSON.stringify({ characterId: characterId }),
  })

  // レスポンスがOKではない場合、エラーを投げる
  if (!response.ok) {
    const errorData = await response.json() // JSON形式で届いたエラー
    throw new Error(
      // バックエンドから受け取ったメッセージ　もしくは　データ取得に失敗しちゃった！
      errorData.error || `データ取得に失敗しちゃった！${response.status}`,
    )
  }

  // レスポンスがOKだった場合、responseをJSON形式で返す。
  return response.json()
}
