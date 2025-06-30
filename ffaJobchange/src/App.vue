<script setup></script>
<template>
  <h1>FFA+転職金額計算スクリプト</h1>
  <div class="flex">
    <div class="left">
      <input type="text" placeholder="1.キャラIDを入力" /><button>反映</button>

      <div class="status">
        <table>
          <thead>
            <tr>
              <th scope="col" class="b1" colspan="2">現在値</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" class="b2">力</th>
              <td>{{ power }}</td>
            </tr>
            <tr>
              <th scope="row" class="b2">知能</th>
              <td>{{ intelligence }}</td>
            </tr>
            <tr>
              <th scope="row" class="b2">信仰心</th>
              <td>{{ faith }}</td>
            </tr>
            <tr>
              <th scope="row" class="b2">生命力</th>
              <td>{{ vitality }}</td>
            </tr>
            <tr>
              <th scope="row" class="b2">器用さ</th>
              <td>{{ dexterity }}</td>
            </tr>
            <tr>
              <th scope="row" class="b2">速さ</th>
              <td>{{ speed }}</td>
            </tr>
            <tr>
              <th scope="row" class="b2">魅力</th>
              <td>{{ charm }}</td>
            </tr>
            <tr>
              <th scope="row" class="b2">運</th>
              <td>{{ luck }}</td>
            </tr>
          </tbody>
        </table>

        <p>⇒</p>

        <table>
          <thead>
            <tr>
              <th scope="col" class="b1" colspan="2">目標値</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" class="b2">力</th>
              <td><input class="b3" type="text" placeholder="2.ここに目標値を入力" /></td>
            </tr>
            <tr>
              <th scope="row" class="b2">知能</th>
              <td><input class="b3" type="text" placeholder="2.ここに目標値を入力" /></td>
            </tr>
            <tr>
              <th scope="row" class="b2">信仰心</th>
              <td><input class="b3" type="text" placeholder="2.ここに目標値を入力" /></td>
            </tr>
            <tr>
              <th scope="row" class="b2">生命力</th>
              <td><input class="b3" type="text" placeholder="2.ここに目標値を入力" /></td>
            </tr>
            <tr>
              <th scope="row" class="b2">器用さ</th>
              <td><input class="b3" type="text" placeholder="2.ここに目標値を入力" /></td>
            </tr>
            <tr>
              <th scope="row" class="b2">速さ</th>
              <td><input class="b3" type="text" placeholder="2.ここに目標値を入力" /></td>
            </tr>
            <tr>
              <th scope="row" class="b2">魅力</th>
              <td><input class="b3" type="text" placeholder="2.ここに目標値を入力" /></td>
            </tr>
            <tr>
              <th scope="row" class="b2">運</th>
              <td><input class="b3" type="text" placeholder="2.ここに目標値を入力" /></td>
            </tr>
          </tbody>
        </table>
      </div>
      <button>目標金額を計算する</button>

      <div class="flex">
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
              <td class="b3">{{ uncpPower }}</td>
              <td>{{ cpPower }}</td>
            </tr>
            <tr>
              <th scope="row" class="b2">知能</th>
              <td class="b3">{{ uncpIntelligence }}</td>
              <td class="b3">{{ cpIntelligence }}</td>
            </tr>
            <tr>
              <th scope="row" class="b2">信仰心</th>
              <td class="b3">{{ uncpFaith }}</td>
              <td class="b3">{{ cpFaith }}</td>
            </tr>
            <tr>
              <th scope="row" class="b2">生命力</th>
              <td class="b3">{{ uncpVitality }}</td>
              <td class="b3">{{ cpVitality }}</td>
            </tr>
            <tr>
              <th scope="row" class="b2">器用さ</th>
              <td class="b3">{{ uncpDexterity }}</td>
              <td class="b3">{{ cpDexterity }}</td>
            </tr>
            <tr>
              <th scope="row" class="b2">速さ</th>
              <td class="b3">{{ uncpSpeed }}</td>
              <td class="b3">{{ cpSpeed }}</td>
            </tr>
            <tr>
              <th scope="row" class="b2">魅力</th>
              <td class="b3">{{ uncpCharm }}</td>
              <td class="b3">{{ cpCharm }}</td>
            </tr>
            <tr>
              <th scope="row" class="b2">運</th>
              <td class="b3">{{ uncpLuck }}</td>
              <td class="b3">{{ cpLuck }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th class="b4">合計</th>
              <td class="b3 bold">{{ uncpSum }}</td>
              <td class="b3 bold">{{ cpSum }}</td>
            </tr>
          </tfoot>
        </table>
        <button class="reset"><a onclick="window.location.reload(true);">リセットする</a></button>
      </div>
    </div>

    <div class="right">
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
        >の転職金額計算WEBアプリです。<br />
        以前同志が作って下さっていた計算スクリプトはサーバー切れ？っぽいので新しく作りました。
      </p>
      <h3>使い方</h3>
      <p>ID入力したら現在値に反映されるようにしました。不明点あれば教えて下さい。</p>
      <ol>
        <li><b>「1」へキャラIDを入力</b><br /><br /></li>
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
        <li>
          9000兆ギル以上は指数表記（0.00e+00みたいな表示）になります。9000兆ギル以上貯金したい超上級者の方はごめんなさい。要望があれば改善します。
        </li>
        <li>
          ある程度確認済みですが、バグとか計算ミスとかあるかもしれません。皆さんで使ってみて何か気付いたことやご要望があれば
          <a
            href="http://s2.game-can.com:8080/ffa/kairan.cgi?mode=login&id=matutake"
            target="blank"
            rel="noopener noreferrer"
            >matutake</a
          >
          の個メまでご連絡ください。
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
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
.reset {
  margin: auto 0 0 0;
}
.reset a {
  text-decoration: none;
  color: #364047;
}
.reset a:hover {
  cursor: default;
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
  #src {
    width: 99vw;
    height: 20px;
  }
  .b1 {
    width: 99vw;
  }
  .b2 {
    width: 15vw;
  }
  .b3 {
    width: 79vw;
  }
  .status {
    width: 99vw;
    display: block;
  }
  .status p {
    display: none;
  }
  .left {
    width: 99vw;
  }
  .right {
    display: none;
  }
  .last-table .b3 {
    width: 40vw;
  }
}
</style>
