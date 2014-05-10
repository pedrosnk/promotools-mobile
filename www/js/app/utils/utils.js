window.App = window.App || {};

window.App.utils = {
  model : {
    setValue : function(model, value){
      if(_.contains(model.questions, value)){
        var index = _.indexOf(model.questions, value);
        model.questions[index] = value;
      } else{
        model.questions.push(value);
      }
      model.trigger('change');
    }
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

  remoteSelection : function(e){
    //remote older selections
    var parentList = $(e.currentTarget).closest("ul");
    var selectedItens = $(parentList).find("li button.selected");
    _.each(selectedItens, function(item){
      $(item).removeClass("selected");
    })
  },

  setMarkedButton : function(e){
    this.remoteSelection(e);
    //set new selection
    var el = $(e.currentTarget);
    el.addClass("selected");
  },

  nextQuestion : function(next){
    setTimeout(function(){
      App.utils.showNextQuestion(next)
    }, 500);
  },

  moveToQuestion : function(questionToShow, direction){
    var current = $("#survey-form-view").find(".current");
    var move;

    if(direction === "next"){
      move = -$(current).width();
    } else {
      move = $(current).width();
    }

    $(current).transition({
      x: move,
      duration: 500,
      complete: function(){
        $(current).removeClass("current");
        $(questionToShow).addClass("current");
        $(current).removeAttr("style");
      },
      opacity: 0
    });
  },

  showNextQuestion : function(next){
    this.moveToQuestion(next, "next");
  },

  showPreviousQuestion : function(next){
    this.moveToQuestion(next, "previous");
  },

  updateProgressBar : function(total, actualSize){
    var progress = ((actualSize * 100) / total) + "%";
    $(".progress-bar").attr("style", "width : " + progress);
  }
}
