(function(){

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
      'focus :input.email-input, :input.feedback-input' : 'hideHeaderAndFooter',
      'focusout :input.email-input, :input.feedback-input' : 'showHeaderAndFooter',
    },

    render : function() {
      console.log(" == BACKBONE VIEW ROCKS == ");
      $('#email_sugestion').hide();
      return this;
    },


    handleNPSQuestion : function(e){
      $(this.el).off('click', '.nps');    
      App.config.DATA_SURVEY = { nps: e.currentTarget.innerText, confirmed_sended: 0, origin: "qrcode" };

      App.utils.setMarkedButton(e);
      App.utils.nextQuestion($("#checkin-question"));
    },

    handleCheckinQuestion : function(e){
      $(this.el).off('click', '.checkin');    
      App.config.DATA_SURVEY.room =  e.currentTarget.innerText;

      App.utils.setMarkedButton(e);
      App.utils.nextQuestion($("#room-question"));
    },

    handleRoomQuestion : function(e){
      $(this.el).off('click', '.room');    
      App.config.DATA_SURVEY.room =  e.currentTarget.innerText;

      App.utils.setMarkedButton(e);
      App.utils.nextQuestion($("#public-areas-question"));
    },

    handlePublicAreasQuestion : function(e){
      $(this.el).off('click', '.public-areas');    
      App.config.DATA_SURVEY.publicAreas =  e.currentTarget.innerText;

      App.utils.setMarkedButton(e);
      App.utils.nextQuestion($("#bar-question"));
    },

    handleBarQuestion : function(e){
      $(this.el).off('click', '.bar');    
      App.config.DATA_SURVEY.bar =  e.currentTarget.innerText;

      App.utils.setMarkedButton(e);
      App.utils.nextQuestion($("#staff-question"));
    },

    handleStaffQuestion : function(e){
      $(this.el).off('click', '.staff');    
      App.config.DATA_SURVEY.staff =  e.currentTarget.innerText;

      App.utils.setMarkedButton(e);
      App.utils.nextQuestion($("#return-question"));
    },

    handleReturningQuestion : function(e){
      $(this.el).off('click', '.returning');    
      App.config.DATA_SURVEY.returning =  e.currentTarget.innerText;

      App.utils.setMarkedButton(e);
      App.utils.nextQuestion($("#email-question"));
    },

    handleEmailQuestion : function(e){
      $(this.el).off('click', '.email');    
      App.config.DATA_SURVEY.email =  e.currentTarget.innerText;

      App.utils.setMarkedButton(e);
      App.utils.nextQuestion($("#leave-sugestion"));
    },

    handleSugestionQuestion : function(e){
      $(this.el).off('click', '.sugestion');    
      
      var feedback = $(this.el).find("textarea[name='feedback']").val();
      App.config.DATA_SURVEY.sugestion = feedback;
      App.utils.finishSurvey();

      App.utils.setMarkedButton(e);
      App.utils.finishSurvey();
      //App.utils.nextQuestion($("#thanks-message"));
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
