if(window.App === undefined){
  window.App = {};
}

window.App.network = {
  // BASE_URL: "http://promotools-survey.herokuapp.com",
  BASE_URL: "http://0.0.0.0:3000",
  STATUS: {
    ERROR: 0,
    SUCCESS: 1 
  },

  initSenderJob : function(){  
    console.log("#### ------>>> INIT SENDER JOB");
    var cronFrequency = 'every 1 min';
    var textSched = later.parse.text(cronFrequency);
    var timer = later.setInterval(this.sender, textSched);               
  },

  sender: function(){
    console.log("[CRON] TRYING TO SUBMIT SURVEYS " + new Date());
    App.db.surveysUnsent(_.bind(this.submitSurveysUnsent,this));
  },

  submitSurvey: function(survey){
    this.submitSurveys([survey]);
  },

  submitSurveys: function(surveys){
    surveys.forEach(function(survey) {
      if(survey.id === undefined || survey.id === null){
         App.db.save(survey);
      }
    });

    //sending to our server
    $.ajax({
      contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
      type: 'POST',
      url : this.BASE_URL + '/surveys.json',
      data : {surveys: surveys},
      crossDomain : true,
      dataType: 'json',
      success : _.bind(function(form, action) {
        this.updateSurveys(surveys, this.STATUS.SUCCESS)
      }, this),
      error: _.bind(function(jqXHR, textStatus, errorThrown){
        this.updateSurveys(surveys,this.STATUS.ERROR)
      }, this)
    });
  },

  updateSurveys: function(surveys, status) {
    surveys.forEach(function(survey) {
      survey.confirmed_sended = status;
      App.db.update(survey);
    });
    this.reloadPage();
  },

  submitSurveysUnsent: function(result) {
    var len = result.rows.length;
    console.log("UNSENT SURVEYS: " + len + " rows found.");
    surveys = [];
    for (var i=0; i<len; i++){
      console.log(JSON.stringify(result.rows.item(i)));
      console.log("Row = " + i + " ID = " + result.rows.item(i).id + " Data =  " + result.rows.item(i).data);
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
