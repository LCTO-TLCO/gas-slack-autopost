# gas-slack-autopost
勤務報告自動化するやつ
- 初期設定
    + トークン取得する
      * 「ウェブアプリケーションとして導入」を有効にする
      * URLに接続して認証してトークンを手に入れる
    + トークンを入力する
      * usertoken_post.gs のUSER_TOKEN 入力
  - 使い方
    + シートに入力する
    + ボタンを押す
      * 多分スクリプトが反映されてるはず
    + 時間が過去じゃなければ行ける
      * だめそうなら https://script.google.com/home/projects/ とかで確認
- 注意
    + トークン取得、複数アカウントで入ろうとすると見れないみたい
        * シークレットモードとかで入って一つのアカウントでログインすればいける
