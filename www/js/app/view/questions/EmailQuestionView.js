(function(){

var emailQuestion = $('#email-question');

if (emailQuestion && emailQuestion.length > 0) {

  window.EmailQuestionView = Backbone.View.extend({

    events : {
      'click .send, .no-thanks': 'handleEmailQuestion',
    },

    initialize: function(options) {
      this.options = jQuery.extend(true, {}, this.defaultOptions, options);
      this.answerModel = { _type: 'Answer::Email', email_value: null };
    },

    render : function() {
      console.log(" == Render EmailQuestionView");
    },

    handleEmailQuestion : function(e){
      $(this.el).off('click', '.send');
      App.utils.setMarkedButton(e);

      var contact = $(this.el).find("input[name='user_contact']").val() || null;      
      this.answerModel.email_value = contact;
      App.utils.model.setValue(this.options.survey, this.answerModel);       
      App.utils.nextQuestion(this.options.nextQuestion);
    }
  });
}
})();

