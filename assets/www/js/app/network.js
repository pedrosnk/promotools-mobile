define('network', ['config', 'storage'], function(Config, Storage) {
  'use strict';

 return {

  //BASE_URL: App.config.ENDPOINT || "http://promotools-survey.herokuapp.com/v1.0/surveys/sushiway/",
  //BASE_URL: App.config.ENDPOINT || "http://www.promotools.com.br/v1.0/surveys/sushiway/",
  BASE_URL: Config.ENDPOINT || "http://www.promotools.com.br/v1.0/surveys/sushiway/",
  CLIENT_KEY: Config.CLIENT_KEY || "VITRINE",

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
    Storage.handleAnsweredSurveys();
  },

  submitSurveys: function(surveys){
    console.log("@@@@ >> App.network.submitSurveys()");
    var full_url = this.BASE_URL + this.CLIENT_KEY
    console.log(">> [NETWORK] full_url == " + full_url);
    //sending surveys to our server
    $.ajax({
      contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
      type: 'POST',
      url : full_url,
      data : {surveys: surveys, client_id: Config.CLIENT_KEY},
      crossDomain : true,
      dataType: 'json',
      success : _.bind(function(form, action) {
        console.log("@@@@ >> App.network.submitSurveys.success - " + this.status.SUCCESS);
        surveys.forEach(function(survey) {
          Storage.updateStatus(survey, this.status.SUCCESS);
        });
 //       App.utils.reloadPage();
      }, this),
      error: function(jqXHR, textStatus, errorThrown){
        console.log("[NETWORK] ERROR in submitSurveys ");
 //       App.utils.reloadPage();
      }
    });
  },

};

});
