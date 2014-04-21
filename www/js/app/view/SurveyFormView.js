(function(){

var formViewEl = $('#survey-form-view');

if (formViewEl && formViewEl.length > 0) {

  window.SurveyFormView = Backbone.View.extend({

    render : function() {
      console.log(" >>>>> Rendering SurveyFormView === ");

      this.surveyDataModel = new Survey({
        url: App.config.ENDPOINT,
        questions: [],
        metrics : [],        
        client : App.config.CLIENT_KEY,
        store : App.config.CLIENT_STORE
      });      


      var npsQuestion = new NpsQuestionView({
        cid: 0,
        el : $('#nps-question'),
        survey : this.surveyDataModel,        
        nextQuestion : $("#rating-service"),
      });
      npsQuestion.render();

      var ratingService = new ItemRatingQuestionView({
        cid: 1,
        el : $('#rating-service'),
        survey : this.surveyDataModel,        
        category : "service",
        nextQuestion : $("#rating-value-for-money"),
      });
      ratingService.render();

      var valueForMoney = new ItemRatingQuestionView({
        cid: 2,
        el : $("#rating-value-for-money"),
        survey : this.surveyDataModel,        
        category : "value-for-money",
        nextQuestion : $("#like-more"),
      });
      valueForMoney.render();


      var likeMore = new SingleChoiceQuestionView({
        cid: 3,
        el : $("#like-more"),
        survey : this.surveyDataModel,
        nextQuestion : $("#first-time"),
      });
      likeMore.render();

      var firstTime = new BooleanQuestionView({
        cid: 4,
        el : $("#first-time"),
        survey : this.surveyDataModel,
        nextQuestion : $("#email-question"),
      });
      firstTime.render();

      var email = new EmailQuestionView({
        cid: 5,
        el : $("#email-question"),
        survey : this.surveyDataModel,
        nextQuestion : $("#feedback"),
      });
      email.render();


      var feedbackQuestion = new FeedbackQuestionView({
        cid: 6,
        el : $('#feedback'),
        survey : this.surveyDataModel,
        nextQuestion : $("#thanks")
      });

      feedbackQuestion.on("finish", this.finishSurvey, this);
      feedbackQuestion.render();

    },

    //save data model and refresh view

    finishSurvey : function(){
      console.log("=== surveyDataModel = " + JSON.stringify(this.surveyDataModel.attributes));
      App.utils.nextQuestion($("#thanks"));

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
      }, this), 3000);
      
    },
 
  });
}
})();
