(function(){

var formViewEl = $('#survey-form-view');

if (formViewEl && formViewEl.length > 0) {

  window.SurveyFormView = Backbone.View.extend({
    initialize: function(options) {
      //this.options = jQuery.extend(true, {}, this.defaultOptions, options);
      this._surveyDataModel = options.surveyDataModel;
    },



    render : function() {
      console.log(" >>>>> Rendering SurveyFormView === ");

      var npsQuestion = new NpsQuestionView({
        el : $('#nps-question'),
        survey : this._surveyDataModel,        
        nextQuestion : $("#rating-customer-service"),
      });
      npsQuestion.render();

      var customerService = new ItemRatingQuestionView({
        el : $("#rating-customer-service"),
        survey : this._surveyDataModel,        
        nextQuestion : $('#rating-money-for-value'),
      });
      customerService.render();

      var ratingMoneyForValue = new ItemRatingQuestionView({
        el : $('#rating-money-for-value'),
        survey : this._surveyDataModel,        
        nextQuestion :  $("#why-you-chose-us"),
      });
      ratingMoneyForValue.render();

      var whyChoseUs = new MultipleChoiceView({      
        el : $("#why-you-chose-us"),
        survey : this._surveyDataModel,
        category : "like-more",
        nextQuestion : $("#how-you-meet-us"),
      });
      whyChoseUs.render();

      var howMeetUs = new MultipleChoiceView({      
        el : $("#how-you-meet-us"),
        survey : this._surveyDataModel,
        category : "channel",
        nextQuestion : $("#first-time"),
      });
      howMeetUs.render();


      var firstTime = new YesNoQuestionView({        
        el : $("#first-time"),
        survey : this._surveyDataModel,
        nextQuestion : $("#come-again"),
      });
      firstTime.render();

      var comeAgain = new YesNoQuestionView({        
        el : $("#come-again"),
        survey : this._surveyDataModel,
        nextQuestion : $("#email-question"),
      });
      comeAgain.render();


      var email = new EmailQuestionView({
        el : $("#email-question"),
        survey : this._surveyDataModel,
        nextQuestion : $("#feedback"),
      });
      email.render();

      var feedbackQuestion = new FeedbackQuestionView({        
        el : $('#feedback'),
        survey : this._surveyDataModel,
        nextQuestion : $("#thanks")
      });

      feedbackQuestion.on("finish", this.finishSurvey, this);
      //feedbackQuestion.render();
    },

    //save data model and refresh view

    finishSurvey : function(){
      console.log("=== surveyDataModel = " + JSON.stringify(this._surveyDataModel.toJSON()));
      App.utils.nextQuestion($("#thanks"));

      App.storage.saveModelData(this._surveyDataModel.toJSON());

      setTimeout(function() {
        window.location.reload();
      }, 3000);

    },

  });
}
})();
