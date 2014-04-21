( function(){

  window.MainSurveyView = Backbone.View.extend({

    render : function() {
      console.log(" >>>>> Render MainSurveyView");
      
      this.formView = new SurveyFormView({ el : $('#survey-form-view') });
      this.headerView = new HeaderSurveyView({ el : $('#header-view'), formEl : this.formView.el });

      this.headerView.render();
      this.formView.render();
    },
   
  });
})();
