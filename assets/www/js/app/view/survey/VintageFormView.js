(function(){

var vintageFormView = $('.vintage-form-view');

if (vintageFormView && vintageFormView.length > 0) {

  window.SurveyView = Backbone.View.extend({

    render : function() {
      console.log(" === Rendering VintageFormView === ");

      this.surveyDataModel = new Survey( {
        url: '/v1.0/surveys/vintage/brasilia'
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
        nextQuestion : $("#treatment-question"),
      });
      ratingQuestion.render();

      var ratingItemQuestion = new ItemRatingQuestionView({
        el : $('#treatment-question'),
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
        nextQuestion : $("#thanks-message"),
      });      

      feedbackQuestion.on("finish", this.finishSurvey, this);      
      feedbackQuestion.render();

    },

    //save data model and refresh view

    finishSurvey : function(){
      console.log("=== surveyDataModel = " + this.surveyDataModel);   

      this.surveyDataModel.save({}, {
        success : _.bind(function(model, response, options) {
          console.log("save success!!!");
          window.location.reload();
          //this.render();          
        }, this),
        error : function(model, xhr, options){
          console.log("save success!!!");
          //window.location.reload();
          this.render();
        }
      });
      
    },



  });
}
})();
