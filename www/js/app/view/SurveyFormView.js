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

      var ratingInfra = new ItemRatingQuestionView({
        el : $("#rating-infra-organization"),
        survey : this._surveyDataModel,
        nextQuestion : $('#rating-section'),
      });
      ratingInfra.render();

      var ratingSection = new ItemRatingQuestionView({
        el : $('#rating-section'),
        survey : this._surveyDataModel,
        nextQuestion :  $("#how-you-meet-us"),
      });
      ratingSection.render();

      var likeMore = new MultipleChoiceView({
        el : $("#how-you-meet-us"),
        survey : this._surveyDataModel,
        nextQuestion : $("#first-time"),
      });
      likeMore.render();

      var firstTime = new YesNoQuestionView({
        el : $("#first-time"),
        survey : this._surveyDataModel,
        nextQuestion : $("#come-again"),
      });
      firstTime.render();

      var comeAgain = new YesNoQuestionView({
        el : $("#come-again"),
        survey : this._surveyDataModel,
        nextQuestion : $("#nps-question"),
      });
      comeAgain.render();

      var npsQuestion = new NpsQuestionView({
        el : $('#nps-question'),
        survey : this._surveyDataModel,
        nextQuestion : $("#email-question"),
      });
      npsQuestion.render();

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
      feedbackQuestion.render();
      console.log('teste console.l;og');
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
