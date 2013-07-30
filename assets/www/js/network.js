window.App = window.App || {};

window.App.network = {

  //BASE_URL: App.config.ENDPOINT || "http://10.0.2.2:3000",
  BASE_URL: App.config.ENDPOINT || "http://192.168.1.104:3000",
  CLIENT_KEY: App.config.CLIENT_KEY || "sushi_loko_406_sul",

  status: {
    ERROR: 0,
    SUCCESS: 1
  },

  initSenderJob : function(){
    console.log("[CRON] Init sender job");
    var cronFrequency = 'every 1 min';
    var textSched = later.parse.text(cronFrequency);
    var timer = later.setInterval(this.sender, textSched);
  },

  sender: function(){
    console.log("[CRON] TRYING TO SUBMIT SURVEYS " + new Date());
    App.storage.handleAnsweredSurveys();
  },

  submitSurveys: function(surveys){
    console.log("@@@@ >> App.network.submitSurveys()");
    var full_url = this.BASE_URL + "/v1.0/surveys/" + this.CLIENT_KEY
    console.log("[NETWORK] full_url == " + full_url);
    //sending surveys to our server
    $.ajax({
      contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
      type: 'POST',
      url : full_url,
      data : {surveys: surveys, client_id: App.config.CLIENT_KEY},
      crossDomain : true,
      dataType: 'json',
      success : function(form, action) {
        console.log("@@@@ >> App.network.submitSurveys.success - " + App.network.status.SUCCESS);
        surveys.forEach(function(survey) {
          App.storage.updateStatus(survey, App.network.status.SUCCESS);
        });
        App.utils.reloadPage();
      },
      error: function(jqXHR, textStatus, errorThrown){
        console.log("[NETWORK] ERROR in submitSurveys ");
        App.utils.reloadPage();
      }
    });
  },

};
