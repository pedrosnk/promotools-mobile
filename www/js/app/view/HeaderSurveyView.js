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
    },

    render : function() {
      console.log(" >>>>> Rendering HeaderSurveyView === ");
      $(this._formEl).find(".question").size()   
      $('.go-back').addClass("no-more");   
    },

    goBack : function(e){      
      var currentQuestion = $(this._formEl).find(".question.current").get(0);  
      var index = _.indexOf(this._questionList, currentQuestion);
      
      if(index > 0){
        var previousQuestion = this._questionList.get(index - 1)
        App.utils.showPreviousQuestion(previousQuestion);
        $('.go-next').removeClass("no-more");
        //move to first
        (index == 1 ) ? $('.go-back').addClass("no-more") : $('.go-back').removeClass("no-more");
      } else {
        $('.go-back').addClass("no-more");
      }
    },

    goNext : function(e){
      var currentQuestion = $(this._formEl).find(".question.current").get(0);  
      var index = _.indexOf(this._questionList, currentQuestion);
      //last question is   
      if(index < $(this._questionList).size() - 1){
        var nextQuestion = this._questionList.get(index + 1)
        App.utils.nextQuestion(nextQuestion);
        $('.go-next').removeClass("no-more");
        $('.go-back').removeClass("no-more");
      } else {
        $('.go-next').addClass("no-more");
      }
    } 

  });
}
})();
