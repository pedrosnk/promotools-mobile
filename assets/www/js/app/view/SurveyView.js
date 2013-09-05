(function(){

  window.SurveyView = Backbone.View.extend({

    events : {
      'click .good-reason' : 'handleGoodReasonQuestion',
      'click .bad-reason' : 'handleBadReasonQuestion',
      'click .nps' : 'handleNPSQuestion',
      'click .first-time' : 'handleFirstTimeQuestion',
      'click .leave-email' : 'handleEmailQuestion',
      'click .leave-sugestion' : 'handleLeaveSugestionQuestion',
      'click .submit-sugestion, .cancel-sugestion' : 'handleSubmitSurvey',
      'keydown :input.email-input' : 'autoCompleteEmail',
      'click #email_sugestion_link, #claim_email_sugestion_link' : 'selectEmailSuggestion',
      'focus :input.email-input, :input.feedback-input' : 'hideHeaderAndFooter',
      'focusout :input.email-input, :input.feedback-input' : 'showHeaderAndFooter',
    },

    render : function() {
      console.log(" == BACKBONE VIEW ROCKS == ");
      $('#email_sugestion').hide();
      $('#claim_email_sugestion').hide();
    },

    handleGoodReasonQuestion : function(e){
      $(this.el).off('click', '.good-reason');
      //TODO: SET DATA IN MODEL
      App.config.DATA_SURVEY = { good_reason: e.currentTarget.innerText, confirmed_sended: 0, origin: "qrcode" };

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
      App.utils.nextQuestion($("#first-time-question"));
    },  

    handleFirstTimeQuestion : function(e){
      $(this.el).off('click', '.first-time');
      App.utils.setMarkedButton(e);
      App.config.DATA_SURVEY.first_time = $(e.currentTarget).hasClass('yes') ? 1 : 0;      

      if(App.config.DATA_SURVEY.nps > 6) {
        App.utils.nextQuestion($("#email-question"));
      } else{
        App.utils.nextQuestion($("#claim-email-question"));
      }
    },

    handleEmailQuestion : function(e){
      $(this.el).off('click', '.leave-email');
      var el = $(this).parent();
      App.config.DATA_SURVEY.email = el.find('input[name=user_contact]').val();
      App.utils.setMarkedButton(e);
      App.utils.nextQuestion($("#leave-sugestion"));
    },

    handleLeaveSugestionQuestion : function(e){
      $(this.el).off('click', '.email-question');      
      App.utils.setMarkedButton(e);

      $('input[name=sugestion]').val(e.currentTarget.innerText);

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
      var el = $(this).parent();
      var feedback = el.find('textarea[name=feedback]').val();
      App.config.DATA_SURVEY.sugestion = feedback;
      App.utils.finishSurvey();
    },

    autoCompleteEmail : function(e){
      $('#email_sugestion').hide();
      $('#claim_email_sugestion').hide();
      
      var el = $(e.currentTarget);
      
      el.mailcheck({
        domains: App.utils.mail.domains,
        suggested: function(element, suggestion) {
          $('#email_sugestion, #claim_email_sugestion').show();
          $('#email_sugestion_link, #claim_email_sugestion_link').html(suggestion.full);
        },
        empty: function(element) {
        }
    });
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