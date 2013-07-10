if(window.App === undefined){
  window.App = {};
}

window.App.network = {
  // BASE_URL: "http://promotools-survey.herokuapp.com",
  BASE_URL: "http://0.0.0.0:3000",

  submitSurvey: function(survey){
    this.submitSurveys([survey]);
  },

  reloadPage: function(){
    setTimeout(function() {
      $(".alert").hide();
      $("#nps-question").show();
    }, 500);
  },

  submitSurveys: function(surveys){
    console.log("on submitSurvey data = " + surveys);
    $.ajax({
      contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
      type: 'POST',
      url : this.BASE_URL + '/surveys.json',
      data : {surveys: surveys},
      crossDomain : true,
      dataType: 'json',
      success : _.bind(function(form, action) {
        console.log("submitSurveys.success");
        console.log(surveys);
        surveys.forEach(function(survey) {
          survey.confirmed_sended = 1;
          App.db.save(survey);
        });
        this.reloadPage();
      }, this),
      error: _.bind(function(jqXHR, textStatus, errorThrown){
        console.log("!!!!!!!!!!!!!!!!!!! submitSurveys.ERROR");
        console.log(surveys);
        surveys.forEach(function(survey) {
          survey.confirmed_sended = 0;
          if(survey.id !== undefined || survey.id !== null){
             App.db.save(survey);
          }
        });
        this.saveLater();
        this.reloadPage();
      }, this)
    });
  },

  saveLater: function() {
    console.log('[CRON] >>>> save later');
    setTimeout(_.bind(function(){
      App.db.surveysUnsent(_.bind(this.submitSurveysUnsent,this));
    },this) ,300000);
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
  }
};
