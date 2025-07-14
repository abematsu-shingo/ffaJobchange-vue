<template>
  <h2>転職金額計算スクリプト <span style="font-weight: lighter; font-size: 15px">v2.1.1</span></h2>
  <p>
    無料WEBゲームサイト<a href="http://www.game-can.com/" target="blank" rel="noopener noreferrer"
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
    <a href="http://essea-numero2.com/FFA_jobChange.html" target="_blank" rel="noopener noreferrer"
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
</template>
