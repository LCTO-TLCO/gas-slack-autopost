var USER_TOKEN = "TOKENTOKENTOKENTOKEN";

function myFunction() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  
  const lastRow = sheet.getLastRow();
  for(let row=1;row<lastRow;row++){
    // 実行済ならスキップ
    if(data[row][3] != ''){continue;}
    // 時間を取得
    var post_at = new Date(data[row][0]);
    // epoch秒変換
    var post_at_epoch = post_at.getTime()/1000;
    // メッセージ取得
    var text = data[row][2];
    // 関数に投げる
    SchedulePost2Slack(text,post_at_epoch);
    // 処理済フラグ
    sheet.getRange(row+1, 4).setValue("済")
    }
}


// scheduledMessage で　Slack にメッセージ投稿
// ユーザートークン推奨
// TODO 改行の扱いを調べる
function SchedulePost2Slack(message,date_epoch) {
  var channel = "#勤務報告";
  //var channel = "#アプリテスト";
  var jsonData =
  {
    "token":USER_TOKEN,
    "channel" : channel,
    "text" : message,
    "post_at":date_epoch,
    "link_names": true
  };
  var payload = JSON.stringify(jsonData);
  var options =
  {
    "headers": {"Authorization": "Bearer "+ USER_TOKEN},
    "method" : "post",
    "contentType" : "application/json",
    "payload" : payload
  };

  Logger.log(UrlFetchApp.fetch('https://slack.com/api/chat.scheduleMessage', options).getContentText());
}
