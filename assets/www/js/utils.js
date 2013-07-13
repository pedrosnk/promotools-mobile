window.App = window.App || {};

window.App.utils = {  

  handleAnswer: function(survey) {
    App.storage.save(survey);
    App.storage.handleAnsweredSurveys();
  },

  reloadPage: function(){
    console.log(">>>>  App.utils.reloadPage");
    setTimeout(function() {
      $(".alert").hide();
      $("#nps-question").show();
    }, 500);
  }

};