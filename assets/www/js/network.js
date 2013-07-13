window.App = window.App || {};

window.App.network = {  
  
  BASE_URL: App.config.ENDPOINT || "http://10.0.2.2:3000",

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
    console.log("[SENDER] TRYING TO SUBMIT SURVEYS " + new Date());
    App.storage.surveysUnsent(_.bind(this.submitSurveysUnsent,this));
    //App.storage.surveysUnsent(this.submitSurveysUnsent);
  },

  sendSurvey: function(survey){
    App.storage.save(survey);
    this.sender();
  },

  submitSurveys: function(surveys){
    //sending to our server
    $.ajax({
      contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
      type: 'POST',
      url : this.BASE_URL + '/surveys.json',
      data : {surveys: surveys, client_id: App.config.CLIENT_KEY},
      crossDomain : true,
      dataType: 'json',
      success : _.bind(function(form, action) {
        console.log("@@@@ >> App.network.submitSurveys.success");
        this.updateSurveys(surveys, this.status.SUCCESS)
      }, this),
      error: _.bind(function(jqXHR, textStatus, errorThrown){
        console.log("@@@@ >> App.network.submitSurveys.error");
        this.reloadPage();
      }, this)
    });
  },

  updateSurveys: function(surveys, status) {
    surveys.forEach(function(survey) {
      survey.confirmed_sended = status;
      App.storage.update(survey);
    });
    this.reloadPage();
  },

  submitSurveysUnsent: function(tx, result) {
    console.log("@@@@ >> App.network.submitSurveysUnsent");
    var len = result.rows.length;
    console.log("UNSENT SURVEYS: " + len + " rows found.");
    surveys = [];
    for (var i=0; i<len; i++){
      console.log(JSON.stringify(result.rows.item(i)));
      surveys.push(result.rows.item(i));
    }
    this.submitSurveys(surveys);
  },

  reloadPage: function(){
    setTimeout(function() {
      $(".alert").hide();
      $("#nps-question").show();
    }, 500);
  }

};
