window.App = window.App || {};

window.App.network = {

  ENDPOINT: App.config.ENDPOINT || 'http://0.0.0.0',
  CLIENT_NAME: App.config.CLIENT_NAME || 'client-name',
  API_VERSION: App.config.API_VERSION || 'api-version',
  CLIENT_KEY: App.config.CLIENT_KEY || "client-key",
  KEEP_ALIVE: "totems/ping",

  status: {
    ERROR: 0,
    SUCCESS: 1
  },

  initSenderJob : function() {
    console.log("[CRON] Init sender job");
    var cronFrequency = 'every 1 min';
    var textSched = later.parse.text(cronFrequency);
    var timer = later.setInterval(this.sender, textSched);
  },

  initKeepAlive : function() {
    var cronFrequency = 'every 20 min';
    var textSched = later.parse.text(cronFrequency);
    var timer = later.setInterval(this.sendKeepAlive, textSched);
  },

  sendKeepAlive: function () {
    var full_url = window.App.config.ENDPOINT + '/' +
      window.App.network.API_VERSION + '/' +
      window.App.network.KEEP_ALIVE;
    $.ajax({
      contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
      type: 'POST',
      url: full_url,
      data: { token: window.App.config.CLIENT_KEY },
      crossDomain : true,
      dataType: 'json',
      success: function(form, action) {
      //  console.log('[KEEP-ALIVE] Keep Alive Success');
      },
      error: function(jqXHR, textStatus, errorThrown) {
      //  console.log('[KEEP-ALIVE] Keep Alive ERROR');
      }
    });
  },

  sender: function(){
    console.log("[CRON] TRYING TO SUBMIT SURVEYS " + new Date());
    App.storage.handleAnsweredSurveys();
  },

  submitSurveys: function(surveys){
    console.log("@@@@ >> App.network.submitSurveys()");
    var full_url = this.ENDPOINT + '/' +
      this.API_VERSION + '/surveys/' +
      this.CLIENT_NAME;
    //sending surveys to our server
    $.ajax({
      contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
      type: 'POST',
      url : full_url,
      data : {surveys: surveys, client_id: App.config.CLIENT_KEY},
      crossDomain : true,
      dataType: 'json',
      success : function(form, action) {
        console.log("@@@@ >> [NETWORK] App.network.submitSurveys.success - " + App.network.status.SUCCESS);
        surveys.forEach(function(survey) {
          App.storage.updateStatus(survey, App.network.status.SUCCESS);
        });
 //       App.utils.reloadPage();
      },
      error: function(jqXHR, textStatus, errorThrown){
        console.log("[NETWORK] ERROR in submitSurveys ");
 //       App.utils.reloadPage();
      }
    });
  },

};
