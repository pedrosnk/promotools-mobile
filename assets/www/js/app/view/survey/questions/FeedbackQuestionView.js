(function(){

var feedbackQuestion = $('#feedback-question');

if (feedbackQuestion && feedbackQuestion.length > 0) {

  window.FeedbackQuestionView = Backbone.View.extend({

    events : {
      'click .send-feedback': 'handleSendFeedback',
      'focus :input.feedback-input' : 'hideHeader',
      'focusout :input.feedback-input' : 'showHeader',
    },

    initialize: function(options) {
      this.options = jQuery.extend(true, {}, this.defaultOptions, options);
    },

    render : function() {
      console.log(" == Render FeedbackQuestionView");     
    },

    handleSendFeedback : function(e){
      utils.setMarkedButton(e);
      var feedback = $(this.el).find("textarea[name='feedback']").val() || null ;
      this.options.survey.set({sugestion: feedback});
      this.trigger("finish", this);
      utils.nextQuestion(this.options.nextQuestion);    
    },

    hideHeader : function(){
      $("#header-survey").hide();
      $(".hide-keyboard").show();
    },

    showHeader : function(){
      $("#header-survey").show();
      $(".hide-keyboard").hide();
    }
  });
}
})();    