( function(){

  window.MainSurveyView = Backbone.View.extend({

    render : function() {
      console.log(" >>>>> Render MainSurveyView");
      
      this.surveyDataModel = new Survey({
        url: App.config.ENDPOINT,
        questions: [],
        client : App.config.CLIENT_KEY,
        store : App.config.CLIENT_STORE
      });     

      this.formView = new SurveyFormView({ 
        el : $('#survey-form-view'),
        surveyDataModel : this.surveyDataModel  
      });

      this.headerView = new HeaderSurveyView({ 
        el : $('#header-view'), 
        formEl : this.formView.el,
        surveyDataModel : this.surveyDataModel  
      });

      this.headerView.render();
      this.formView.render();
    },



  });
})();
