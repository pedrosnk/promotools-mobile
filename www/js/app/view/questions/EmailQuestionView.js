(function(){

var emailQuestion = $('#email-question');

if (emailQuestion && emailQuestion.length > 0) {

  window.EmailQuestionView = Backbone.View.extend({

    events : {
      'click .send, .no-thanks': 'handleEmailQuestion',
      'focus :input.email' : 'hideHeader',
      'focusout :input.email' : 'showHeader',
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
      App.utils.updateProgressBar($("#survey-form-view .question").size(), $(this.options.survey.questions).size()); 
      App.utils.nextQuestion(this.options.nextQuestion);
    },

    hideHeader : function(){
      $("#header-survey").hide();
      $(".hide-keyboard").show();
      $(".hide-keyboard").css("top", "150px");
      $(".survey-container").css("margin-top", "-150px");
    },

    showHeader : function(){
      $("#header-survey").show();
      $(".hide-keyboard").hide();
      $(".survey-container").css("margin-top", "130px");
    }
  });
}
})();

