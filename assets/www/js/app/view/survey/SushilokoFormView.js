(function(){

var sushilokoFormView = $('.sushiloko-form-view');

if (sushilokoFormView && sushilokoFormView.length > 0) {

  console.log("sushilokoFormView = " + sushilokoFormView);
  console.log(sushilokoFormView);

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
      'focus :input.email-input, :input.feedback-input' : 'hideFooter',
      'focusout :input.email-input, :input.feedback-input' : 'showFooter',
    },

    render : function() {
      if( /iPhone|iPad/i.test(navigator.userAgent) ) {
        $('.survey-btn').css("padding-left", "21px");
        $('.survey-btn:last-of-type').css("padding-left", "13px");
      }

      $('#email_sugestion').hide();
      $('#claim_email_sugestion').hide();

      setTimeout(function() {
        $('.splash-screen').transition({
          opacity: 0,
          complete: function(){
            $(this).hide();
            utils.createProgressNumbers();
          },
          delay: 500

        });
      }, 3000);
    },

    handleGoodReasonQuestion : function(e){
      $(this.el).off('click', '.good-reason');
      //TODO: SET DATA IN MODEL
      config.DATA_SURVEY = { good_reason: e.currentTarget.innerText, confirmed_sended: 0, origin: "qrcode" };

      utils.setMarkedButton(e);
      utils.nextQuestion("#bad-reason-question")
    },

    handleBadReasonQuestion : function(e){
      $(this.el).off('click', '.bad-reason');
      config.DATA_SURVEY.bad_reason = e.currentTarget.innerText;
      utils.setMarkedButton(e);
      utils.nextQuestion($("#nps-question"));
    },

    handleNPSQuestion : function(e){
      $(this.el).off('click', '.nps');
      config.DATA_SURVEY.nps = e.currentTarget.innerText;

      utils.setMarkedButton(e);
      utils.nextQuestion($("#first-time-question"));
    },

    handleFirstTimeQuestion : function(e){
      $(this.el).off('click', '.first-time');
      utils.setMarkedButton(e);
      config.DATA_SURVEY.first_time = $(e.currentTarget).hasClass('yes') ? 1 : 0;

      if(config.DATA_SURVEY.nps > 6) {
        utils.nextQuestion($("#email-question"));
      } else{
        utils.nextQuestion($("#claim-email-question"));
      }
    },

    handleEmailQuestion : function(e){
      $(this.el).off('click', '.leave-email');
      var el = $(this).parent();
      config.DATA_SURVEY.email = el.find('input[name=user_contact]').val();
      utils.setMarkedButton(e);
      utils.nextQuestion($("#leave-sugestion"));
    },

    handleLeaveSugestionQuestion : function(e){
      $(this.el).off('click', '.email-question');
      utils.setMarkedButton(e);

      $('input[name=sugestion]').val(e.currentTarget.innerText);

      if($(e.currentTarget).hasClass('yes')){
        utils.nextQuestion($("#sugestion-box"));
      } else{
        config.DATA_SURVEY.sugestion = null;
        utils.finishSurvey();
      }
    },

    handleSubmitSurvey : function(e){
      $(this.el).off('click', '.submit-sugestion, .cancel-sugestion');

      utils.setMarkedButton(e);
      var el = $(this).parent();
      var feedback = el.find('textarea[name=feedback]').val();
      config.DATA_SURVEY.sugestion = feedback;
      utils.finishSurvey();
    },

    autoCompleteEmail : function(e){
      var el = $(e.currentTarget);

      el.mailcheck({
        domains: utils.mail.domains,
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

    hideFooter : function(){
      //$(".survey-container").scrollTop()
      $(".l-footer-survey").hide();
    },

    showFooter : function(){
      $(".l-footer-survey").show();
    }

  });
}
})();
