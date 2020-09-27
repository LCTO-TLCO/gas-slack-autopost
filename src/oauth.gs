var clientID = "CLIENTCLIENTID";
var clientSecret = "SECRETSECRET";

// doGetはWebアプリケーションとして公開したとき呼ばれる関数
// HTMLとかを返す
function doGet(request) {
  var slackService = getSlackService();
  var authorizationUrl = slackService.getAuthorizationUrl();
  var template = HtmlService.createTemplate('<a href="<?= authorizationUrl ?>" target="_blank">Authorize</a>.');
  template.authorizationUrl = authorizationUrl+"&user_scope=chat%3Awrite";
  return HtmlService.createHtmlOutput(template.evaluate());
}

// slack から戻ってきた時呼ばれる関数 HTMLを返せる
// 本来はリダイレクトしてアプリケーションに戻ってもらうのがいい
function authCallback(request) {
  var slackService = getSlackService();
  var isAuthorized = slackService.handleCallback(request);
  if (isAuthorized) {
    var html_page = HtmlService.createHtmlOutput('コピーしたスクリプトのusertoken_post.gsのUSER_TOKENにこの文字列を代入して保存してください：<br>'+getSlackService().getAccessToken())
    clearService();
    return html_page;
 
  } else {
    return HtmlService.createHtmlOutput('Denied.');
  }
}

// 手動実行して消せる
function clearService(){
  OAuth2.createService('slack')
  .setPropertyStore(PropertiesService.getUserProperties())
  .reset();
}

// OAuth2の設定
function getSlackService() {
  return OAuth2.createService('slack') // 任意の名前 slack使うからslackにしてる
  .setAuthorizationBaseUrl('https://slack.com/oauth/authorize')
  .setTokenUrl('https://slack.com/api/oauth.access')
  .setClientId(clientID)
  .setClientSecret(clientSecret)
  .setCallbackFunction('authCallback')
  .setPropertyStore(PropertiesService.getUserProperties()) // https://developers.google.com/apps-script/guides/properties
  //.setScope('chat:write'); // 複数scopeはスペース区切り
}
// https://lcto-tlco.slack.com/oauth/{}?client_id={}
// &scope=chat%3Awrite
// &user_scope=chat%3Awrite
// &state=&granular_bot_scope=1
// &redirect_uri={}
// &install_redirect=oauth
// &response_type=&response_mode=&nonce=&openid_connect=0&team=1
