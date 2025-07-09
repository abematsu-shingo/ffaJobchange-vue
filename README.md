# FFA+転職金額計算スクリプト - フロントエンド

このリポジトリは、[ゲームの缶詰](http://www.game-can.com/) 内にある ブラウザ CGI ゲーム [FF Adventure+](http://www.game-can.com/ffa/others.cgi) の転職金額を計算するための Web アプリケーションのフロントエンド部分です。

Vue.js で構築されており、[バックエンド API](https://github.com/abematsu-shingo/ffaJobchange-puppeteer) と連携して、キャラクターのステータスを取得・現在値テーブルに反映し、目標値テーブルの数値を元に計算結果を表示します。

## 目次

-   [機能概要](#機能概要)
-   [技術スタック](#技術スタック)
-   [プロジェクトセットアップ](#プロジェクトセットアップ)
    -   [前提条件](#前提条件)
    -   [インストール](#インストール)
    -   [開発サーバーの起動](#開発サーバーの起動)
    -   [本番ビルド](#本番ビルド)
-   [API 連携](#api連携)
-   [ディレクトリ構造](#ディレクトリ構造)
-   [ライセンス](#ライセンス)

## 機能概要

-   キャラクター ID を入力し、現在のステータスをバックエンド API から取得・表示。
-   目標ステータスを入力し、転職に必要なギル（カプセルあり/なし）を計算。
-   計算結果の表示。
-   入力値のフロントエンドバリデーション。

## 技術スタック

-   **フレームワーク**: Vue.js (vue3)
-   **ビルドツール**: Vite
-   **言語**: TypeScript
-   **スタイル**: CSS (scoped styles)

## プロジェクトセットアップ

### 前提条件

-   Node.js (v18 以上推奨)
-   npm または Yarn

### インストール

```bash
git clone [あなたのフロントエンドリポジトリのURL]
cd [リポジトリ名]
npm install
```

### 開発サーバーの起動

```bash
npm run dev
# または yarn dev
```

このコマンドを実行すると、開発サーバーが起動し、通常 `http://localhost:5173` でアプリケーションにアクセスできるようになります。

### 本番ビルド

デプロイ用の静的ファイルを生成します。

```bash
npm run build
# または yarn build
```

ビルドされたファイルは `dist` ディレクトリに出力されます。この `dist` ディレクトリの内容を静的ファイルホスティングサービス（例: Netlify, Vercel, 各種レンタルサーバー、等）にデプロイしてください。

## API 連携

このフロントエンドは、以下のバックエンド API エンドポイントと連携します。

-   **API エンドポイント**: `https://ffajobchange-puppeteer.onrender.com/api/get-status`
-   **メソッド**: `POST`
-   **リクエストボディ**: `{ "characterId": "your_character_id" }`
-   **レスポンスボディ**: キャラクターのステータス情報を含む JSON オブジェクト

## ディレクトリ構造

```
.
├── public/                # 静的アセット
├── src/
│   ├── components/        # Vueコンポーネント (現在はなし)
│   ├── App.vue            # メインのVueコンポーネント
│   ├── main.ts            # アプリケーションのエントリーポイント
│   └── shims.d.ts         # VueファイルをTypeScriptとして認識させるためのファイル
├── index.html             # HTMLテンプレート
├── vite.config.ts         # Viteの設定ファイル
├── package.json           # プロジェクトの依存関係とスクリプト
└── tsconfig.json          # TypeScriptの設定ファイル
```

## ライセンス

このプロジェクトは、MIT ライセンスの下でライセンスされています。
