(function(){

var headerViewEl = $('#header-view');

if (headerViewEl && headerViewEl.length > 0) {

  window.HeaderSurveyView = Backbone.View.extend({
    events : {
      'click .go-back' : 'goBack',      
      'click .go-next' : 'goNext'
    },

    initialize: function(options) {
      this._formEl = options.formEl;
      this._questionList = $(this._formEl).find(".question");
      this._surveyDataModel = options.surveyDataModel;
      this._surveyDataModel.on("updateProgressBar", this.updateProgressBar, this);
    },

    render : function() {
      $(this._formEl).find(".question").size()   
      $('.go-back').addClass("no-more");  
      $('.go-next').addClass("no-more");   
    },

    goBack : function(e){      
      var currentQuestion = $(this._formEl).find(".question.current").get(0);  
      var currentQuestionId = _.indexOf(this._questionList, currentQuestion);

      if(currentQuestionId > 0){
        var previousQuestion = this._questionList.get(currentQuestionId - 1)
        App.utils.showPreviousQuestion(previousQuestion);
        this.moveNavMarker(previousQuestion);
      }
    },

    goNext : function(e){
      var currentQuestion = $(this._formEl).find(".question.current").get(0);  
      var currentQuestionId = _.indexOf(this._questionList, currentQuestion);
      var answeredListSize = $(this._surveyDataModel.questions).size();

      if(currentQuestionId < answeredListSize){
        var nextEl = this._questionList.get(currentQuestionId + 1)
        App.utils.showNextQuestion(nextEl);  
        this.moveNavMarker(nextEl);     
      }
    },

    moveNavMarker : function(nextEl){
      var currentQuestion = nextEl;  
      var answeredListSize = $(this._surveyDataModel.questions).size();
      var currentQuestionId = _.indexOf(this._questionList, currentQuestion);      
      var nextQuestionId = currentQuestionId + 1;
      var previousQuestionId = currentQuestionId - 1;
      console.log("------------------------------------ ");
      console.log("currentQuestionId = " + currentQuestionId);
      console.log("nextQuestionId     = " + nextQuestionId);
      console.log("previousQuestionId = " + previousQuestionId);

      if(previousQuestionId < 0){
        $('.go-back').addClass("no-more");            
      } else {
        $('.go-back').removeClass("no-more");            
      }

      if(nextQuestionId > answeredListSize){
        $('.go-next').addClass("no-more");  
      } else { 
        $('.go-next').removeClass("no-more");            
      }
      
    },

    updateProgressBar : function(){
      App.utils.updateProgressBar($(this._questionList).size(), $(this._surveyDataModel.questions).size()); 
      $('.go-back').removeClass("no-more");
    } 

  });
}
})();
