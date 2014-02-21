(function(){

var carltonFormView = $('.carlton-form-view');

if (carltonFormView && carltonFormView.length > 0) {

  console.log("carltonFormView = " + carltonFormView);
  console.log(carltonFormView);

  window.SurveyView = Backbone.View.extend({

    events : {
      'click .nps' : 'handleNPSQuestion',
      'click .checkin' : 'handleCheckinQuestion',
      'click .room' : 'handleRoomQuestion',
      'click .public-areas' : 'handlePublicAreasQuestion',
      'click .bar' : 'handleBarQuestion',
      'click .staff' : 'handleStaffQuestion',
      'click .returning' : 'handleReturningQuestion',
      'click .email' : 'handleEmailQuestion',
      'click .sugestion' : 'handleSugestionQuestion',
      'keydown :input.email-input' : 'autoCompleteEmail',      
      'focus :input.email-input, :input.feedback-input' : 'hideFooter',
      'focusout :input.email-input, :input.feedback-input' : 'showFooter',
    },

    render : function() {
      if( /iPhone|iPad/i.test(navigator.userAgent) ) {
        $('.survey-btn').css("padding-left", "21px");
        $('.survey-btn:last-of-type').css("padding-left", "13px");
      }

      $('#email_sugestion').hide();

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

    handleNPSQuestion : function(e){
      $(this.el).off('click', '.nps');    
      config.DATA_SURVEY = { nps: e.currentTarget.innerText, confirmed_sended: 0, origin: "qrcode" };

      utils.setMarkedButton(e);
      utils.nextQuestion($("#checkin-question"));
    },

    handleCheckinQuestion : function(e){
      $(this.el).off('click', '.checkin');    
      config.DATA_SURVEY.room =  e.currentTarget.innerText;

      utils.setMarkedButton(e);
      utils.nextQuestion($("#room-question"));
    },

    handleRoomQuestion : function(e){
      $(this.el).off('click', '.room');    
      config.DATA_SURVEY.room =  e.currentTarget.innerText;

      utils.setMarkedButton(e);
      utils.nextQuestion($("#public-areas-question"));
    },

    handlePublicAreasQuestion : function(e){
      $(this.el).off('click', '.public-areas');    
      config.DATA_SURVEY.publicAreas =  e.currentTarget.innerText;

      utils.setMarkedButton(e);
      utils.nextQuestion($("#bar-question"));
    },

    handleBarQuestion : function(e){
      $(this.el).off('click', '.bar');    
      config.DATA_SURVEY.bar =  e.currentTarget.innerText;

      utils.setMarkedButton(e);
      utils.nextQuestion($("#staff-question"));
    },

    handleStaffQuestion : function(e){
      $(this.el).off('click', '.staff');    
      config.DATA_SURVEY.staff =  e.currentTarget.innerText;

      utils.setMarkedButton(e);
      utils.nextQuestion($("#return-question"));
    },

    handleReturningQuestion : function(e){
      $(this.el).off('click', '.returning');    
      config.DATA_SURVEY.returning =  e.currentTarget.innerText;

      utils.setMarkedButton(e);
      utils.nextQuestion($("#email-question"));
    },

    handleEmailQuestion : function(e){
      $(this.el).off('click', '.email');    
      config.DATA_SURVEY.email =  e.currentTarget.innerText;

      utils.setMarkedButton(e);
      utils.nextQuestion($("#leave-sugestion"));
    },

    handleSugestionQuestion : function(e){
      $(this.el).off('click', '.sugestion');    
      
      var feedback = $(this.el).find("textarea[name='feedback']").val();
      config.DATA_SURVEY.sugestion = feedback;
      utils.finishSurvey();

      utils.setMarkedButton(e);
      utils.nextQuestion($("#thanks-message"));
    },    

    autoCompleteEmail : function(e){
      var el = $(e.currentTarget);

      el.mailcheck({
        domains: utils.mail.domains,
        suggested: function(element, suggestion) {
          $('#email_sugestion').show();
          $('#email_sugestion_link').html(suggestion.full);
        },
        empty: function(element) {
        }
      });
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
