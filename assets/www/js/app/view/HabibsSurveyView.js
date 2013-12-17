(function(){

var habibsFormView = $('.habibs-form-view');

if (habibsFormView && habibsFormView.length > 0) {

  window.HabibsSurveyView = Backbone.View.extend({

    render : function() {
      console.log(" === Rendering VintageFormView === ");

      this.surveyDataModel = new Survey( {
        url: '/v1.0/surveys/habibs/conjunto',
        questions: []
      });

      var npsQuestion = new NpsQuestionView({
        el : $('#nps-question'),
        survey : this.surveyDataModel,
        nextQuestion : $("#rating-question"),
      });
      npsQuestion.render();

      var ratingQuestion = new RatingQuestionView({
        el : $('#rating-question'),
        survey : this.surveyDataModel,
        nextQuestion : $("#service-question"),
      });
      ratingQuestion.render();

      var ratingItemQuestion = new ItemRatingQuestionView({
        el : $('#service-question'),
        survey : this.surveyDataModel,
        nextQuestion : $("#email-question"),
        category : "treatment"
      });
      ratingItemQuestion.render();

      var emailQuestion = new EmailQuestionView({
        el : $('#email-question'),
        survey : this.surveyDataModel,
        nextQuestion : $("#feedback-question"),
      });
      emailQuestion.render();


      var feedbackQuestion = new FeedbackQuestionView({
        el : $('#feedback-question'),
        survey : this.surveyDataModel,
        nextQuestion : $("#thanks")
      });

      feedbackQuestion.on("finish", this.finishSurvey, this);
      feedbackQuestion.render();

    },

    //save data model and refresh view

    finishSurvey : function(){
      console.log("=== surveyDataModel = " + JSON.stringify(this.surveyDataModel.attributes));
      App.storage.saveModelData(this.surveyDataModel.attributes);

      setTimeout(_.bind( function() {
        this.surveyDataModel.save({}, {
          success : _.bind(function(model, response, options) {
            console.log("[BACKBONE] save success!!!");
            App.storage.updateStatus(model, App.network.status.SUCCESS);
            //this.render();
            window.location.reload();
          }, this),
          error : _.bind(function(model, xhr, options){
            console.log("[BACKBONE] save error!!!");
            App.storage.updateStatus(model, App.network.status.ERROR);
            //this.render();
            window.location.reload();
          }, this),
        });
      }, this), 2000);
    },


  });
}
})();
