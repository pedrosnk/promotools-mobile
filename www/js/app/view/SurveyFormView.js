(function(){

var formViewEl = $('#survey-form-view');

if (formViewEl && formViewEl.length > 0) {

  window.SurveyFormView = Backbone.View.extend({

    render : function() {
      console.log(" >>>>> Rendering SurveyFormView === ");

      this.surveyDataModel = new Survey({
        url: App.config.ENDPOINT,
        questions: [],
        client : App.config.CLIENT_KEY,
        store : App.config.CLIENT_STORE
      });

      var npsQuestion = new NpsQuestionView({
        el : $('#nps-question'),
        survey : this.surveyDataModel,
        nextQuestion : $("#rating-service"),
      });
      npsQuestion.render();

      var ratingService = new ItemRatingQuestionView({
        el : $('#rating-service'),
        survey : this.surveyDataModel,
        category : "service",
        nextQuestion : $("#rating-value-for-money"),
      });
      ratingService.render();

      var valueForMoney = new ItemRatingQuestionView({
        el : $("#rating-value-for-money"),
        survey : this.surveyDataModel,
        category : "value-for-money",
        nextQuestion : $("#like-more"),
      });
      valueForMoney.render();


      var likeMore = new MultipleChoiceView({
        el : $("#like-more"),
        survey : this.surveyDataModel,
        nextQuestion : $("#first-time"),
      });
      likeMore.render();

      var firstTime = new YesNoQuestionView({
        el : $("#first-time"),
        survey : this.surveyDataModel,
        nextQuestion : $("#email-question"),
      });
      firstTime.render();

      var email = new EmailQuestionView({
        el : $("#email-question"),
        survey : this.surveyDataModel,
        nextQuestion : $("#feedback"),
      });
      email.render();


      var feedbackQuestion = new FeedbackQuestionView({
        el : $('#feedback'),
        survey : this.surveyDataModel,
        nextQuestion : $("#thanks")
      });

      feedbackQuestion.on("finish", this.finishSurvey, this);
      feedbackQuestion.render();

    },

    //save data model and refresh view

    finishSurvey : function(){
      console.log("=== surveyDataModel = " + JSON.stringify(this.surveyDataModel.toJSON()));
      App.utils.nextQuestion($("#thanks"));

      App.storage.saveModelData(this.surveyDataModel.toJSON());

      setTimeout(function() {
        //window.location.reload();
      }, 3000);

    },

  });
}
})();
