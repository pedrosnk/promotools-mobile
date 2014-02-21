window.App = window.App || {};

window.App.utils = {
  mail : {
    domains : ['hotmail.com', 'gmail.com', 'aol.com','yahoo.com.br'],
  },

  timer : {

    reloadAppOnTimeout : function(e){
      window.touchScheduler = null;
      $(document).click(App.utils.timer.startScreenTimeOut);
    },

    startScreenTimeOut : function() {
      if (window.touchScheduler !== null){
        window.clearTimeout(window.touchScheduler);
      }

      window.touchScheduler = setTimeout(App.utils.timer.reloadApp, 50000); // 1 minutes to shutdown (300000 =  5min)
    },

    reloadApp : function() {
      window.location.reload();
    }

  },

  setMarkedButton : function(e){
    var el = $(e.currentTarget);
    //get a button or a li children, witch is a button
    var button = el.hasClass("survey-btn") || el.hasClass("survey-large-btn") ? el : el.children();
    button.addClass("selected");
  },

  nextQuestion : function(next){
    setTimeout(function(){
      App.utils.showNextQuestion(next)
    }, 500);
  },

  showNextQuestion : function(next){
    var current = $(".survey-container").find(".current");

    //not move on progress bar in this cases
    if($(current).attr("id") != "leave-sugestion" && $(current).attr("id") != "sugestion-box" && $(next).attr("id") != "returning-question"){
      App.utils.updateProgressBar();
    }

    $(current).transition({
      x: -$(current).width(),
      duration: 800,
      complete: function(){
        $(current).removeClass("current");
        $(next).addClass("current");
      },
      opacity: 0
    });
  },

  createProgressNumbers : function(){
    var total = $(".survey-progress").children().length - 1;
    var progressEl = $(".survey-progress .order");
    $(progressEl).find(".status").text(1);
    $(progressEl).find(".total").text(total);
  },

  updateProgressBar : function(){
    var currentEl = $(".survey-progress").find(".current");
    currentEl.removeClass("current");

    var nextEl = currentEl.next().hasClass("status") ? currentEl.next() : $(".first");
    nextEl.addClass("current");

    var progressEl = $(".survey-progress .order").find(".status");
    $(progressEl).text(parseInt(progressEl.text()) + 1);
  },

  finishSurvey : function(){
    App.utils.nextQuestion($("#thanks-message"));
    App.utils.handleAnswer(App.config.DATA_SURVEY);

    setTimeout(function() {
      window.location.reload();
    }, 6000);
  },

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
  },



};
