(function(){

  window.SurveyView = Backbone.View.extend({

    events : {
      'click .frequency' : 'handleFrequencyQuestion',
      'click .returning' : 'handleReturningClientQuestion',
      'click .good-reason' : 'handleGoodReasonQuestion',
      'click .bad-reason' : 'handleBadReasonQuestion',
      'click .nps' : 'handleNPSQuestion',
      'click .demographic' : 'handleDemographicQuestion',
      'click .leave-email' : 'handleEmailQuestion',
      'click .leave-sugestion' : 'handleLeaveSugestionQuestion',
      'click .submit-sugestion, .cancel-sugestion' : 'handleSubmitSurvey',
      'focus :input.email-input, :input.feedback-input' : 'hideHeaderAndFooter',
      'focusout :input.email-input, :input.feedback-input' : 'showHeaderAndFooter',
    },

    render : function() {
      console.log(" == BACKBONE VIEW ROCKS == ");
      return this;
    },

    handleGoodReasonQuestion : function(e){
      App.config.DATA_SURVEY = { good_reason: e.currentTarget.innerText, confirmed_sended: 0, origin: "totem" };
      $(this.el).off('click', '.good-reason');
      //TODO: SET DATA IN MODEL
      App.config.DATA_SURVEY.good_reason = e.currentTarget.innerText;
      App.utils.setMarkedButton(e);
      App.utils.nextQuestion("#bad-reason-question")
    },

    handleBadReasonQuestion : function(e){
      $(this.el).off('click', '.bad-reason');
      App.config.DATA_SURVEY.bad_reason = e.currentTarget.innerText;
      App.utils.setMarkedButton(e);
      App.utils.nextQuestion($("#nps-question"));
    },

    handleNPSQuestion : function(e){
      $(this.el).off('click', '.nps');
      App.config.DATA_SURVEY.nps = e.currentTarget.innerText;

      App.utils.setMarkedButton(e);
      App.utils.nextQuestion($("#frequency-reason-question"));
    },

    handleFrequencyQuestion : function(e){
      $(this.el).off('click', '.frequency');
      //TODO: SET DATA IN MODEL
      App.utils.setMarkedButton(e);
      App.config.DATA_SURVEY.frequency = e.currentTarget.innerText;

      if(App.config.DATA_SURVEY.frequency === "Primeira vez") {
        App.utils.nextQuestion($("#returning-question"));
      } else{
        App.config.DATA_SURVEY.want_return = null;
        App.utils.nextQuestion($("#demographic-question"));
      }
    },

    handleReturningClientQuestion : function(e){
      $(this.el).off('click', '.returning');
      App.config.DATA_SURVEY.want_return = e.currentTarget.innerText;
      App.utils.setMarkedButton(e);
      App.utils.nextQuestion($("#demographic-question"));
    },

    handleDemographicQuestion : function(e){
      if($(e.currentTarget).hasClass("age")){
        $('.age').removeClass("selected")
        App.config.DATA_SURVEY.age = e.currentTarget.innerText;

      } else {
        $('.sex').removeClass("selected")
        App.config.DATA_SURVEY.sex = e.currentTarget.innerText.trim();
      }

      App.utils.setMarkedButton(e);

      //just go to next question if both params are completed
      if(App.config.DATA_SURVEY.age != null && App.config.DATA_SURVEY.sex != null){
        if(App.config.DATA_SURVEY.nps > 6) {
          App.utils.nextQuestion($("#email-question"));
        } else{
          App.utils.nextQuestion($("#claim-email-question"));
        }
      }
    },

    handleEmailQuestion : function(e){
      $(this.el).off('click', '.leave-email');
      var el = $(this).parent();
      var email = null;
      if($(this.el).find("input[name='user_contact']").val()){
        email = $(this.el).find("input[name='user_contact']").val();
      } else {
        email = $(this.el).find("input[name='claim_user_contact']").val();
      }
      App.config.DATA_SURVEY.email = email;
      App.utils.setMarkedButton(e);
      App.utils.nextQuestion($("#leave-sugestion"));
    },

    handleLeaveSugestionQuestion : function(e){
      $(this.el).off('click', '.email-question');
      App.utils.setMarkedButton(e);

      if($(e.currentTarget).hasClass('yes')){
        App.utils.nextQuestion($("#sugestion-box"));
      } else{
        App.config.DATA_SURVEY.sugestion = null;
        App.utils.finishSurvey();
      }
    },

    handleSubmitSurvey : function(e){
      $(this.el).off('click', '.submit-sugestion, .cancel-sugestion');

      App.utils.setMarkedButton(e);
      var feedback = $(this.el).find("textarea[name='feedback']").val();
      App.config.DATA_SURVEY.sugestion = feedback;

      console.log("---------")
      console.log(" FEEDBACK = " + feedback)

      App.utils.finishSurvey();
    },

    selectEmailSuggestion : function(e){
      e.preventDefault();
      var currentEl = $(e.currentTarget);
      var emailSuggested = currentEl.html();
      currentEl.parent().parent().children('input[name=user_contact]').val(emailSuggested);
      currentEl.parent().hide();
    },

    hideHeaderAndFooter : function(){
      //$(".survey-container").scrollTop()
      $(".l-footer-survey").hide();
      $('.l-header-survey').hide();
    },

    showHeaderAndFooter : function(){
      $(".l-footer-survey").show();
      $('.l-header-survey').show();
    }

  });

})();
