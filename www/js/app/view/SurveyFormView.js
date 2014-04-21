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
        nextQuestion : $("#rating-service"),
      });
      npsQuestion.render();

      var ratingService = new ItemRatingQuestionView({
        el : $('#rating-service'),
        survey : this._surveyDataModel,        
        category : "service",
        nextQuestion : $("#rating-value-for-money"),
      });
      ratingService.render();

      var valueForMoney = new ItemRatingQuestionView({
        el : $("#rating-value-for-money"),
        survey : this._surveyDataModel,        
        category : "value-for-money",
        nextQuestion : $("#like-more"),
      });
      valueForMoney.render();


      var likeMore = new SingleChoiceQuestionView({      
        el : $("#like-more"),
        survey : this._surveyDataModel,
        nextQuestion : $("#first-time"),
      });
      likeMore.render();

      var firstTime = new BooleanQuestionView({
        
        el : $("#first-time"),
        survey : this._surveyDataModel,
        nextQuestion : $("#email-question"),
      });
      firstTime.render();

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

    },

    //save data model and refresh view

    finishSurvey : function(){
      console.log("=== _surveyDataModel = " + JSON.stringify(this._surveyDataModel.attributes));
      App.utils.nextQuestion($("#thanks"));

      App.storage.saveModelData(this._surveyDataModel.attributes);

      setTimeout(_.bind( function() {
        this._surveyDataModel.save({}, {
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
