(function(){

var feedbackQuestion = $('#feedback');

if (feedbackQuestion && feedbackQuestion.length > 0) {

  window.FeedbackQuestionView = Backbone.View.extend({

    events : {
      'click .send, .no-thanks': 'handleSendFeedback',
    },

    initialize: function(options) {
      this.options = jQuery.extend(true, {}, this.defaultOptions, options);
      this.answerModel = { _type: 'Answer::Feedback', value: null };
    },

    render : function() {
      console.log(" == Render FeedbackQuestionView");
    },

    handleSendFeedback : function(e){
      $(this.el).off('click', '.send');
      App.utils.setMarkedButton(e);
      var feedback = $(this.el).find("textarea[name='feedback']").val() || null ;
      this.answerModel.value = feedback;
      App.utils.model.setValue(this.options.survey, this.answerModel);      
      console.log('[DEBUG] ' +  JSON.stringify(this.options.survey));
      this.trigger("finish", this);
      App.utils.nextQuestion(this.options.nextQuestion);
    },

  });
}
})();
