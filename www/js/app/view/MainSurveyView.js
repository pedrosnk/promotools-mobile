( function(){

  window.MainSurveyView = Backbone.View.extend({

    events : {
      'click .slide' : 'showHomePage'
    },

    render : function() {      
      
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

      this.footerView = new FooterSurveyView({ 
        el : $('#footer'), 
      });

      this.footerView.on("showAgenda", this.showAgendaSection, this);
      this.footerView.on("showFeedback", this.showFeedbackSection, this);

      this.headerView.render();
      this.formView.render();

      this.sliderPresentationView();
    },

    showHomePage : function(){
      $('#splash').transition({opacity: 0}).hide();
      $(this.formView.el).show();
      $(this.headerView.el).show();   
      $(this.footerView.el).show();  
      $(".l-agenda").hide(); 
      
    },

    sliderPresentationView : function(){
      $(this.formView.el).hide();
      $(this.headerView.el).hide();   
      $(this.footerView.el).hide();  
      $(".l-agenda").hide(); 
      

      $('#presentation').bxSlider({
        adaptiveHeight: true,
        mode: 'fade',
        pager: false,
        touchEnabled: true,
        controls: false,
        auto: true
      });
    },

    showAgendaSection : function(e){      
      //TODO: EFFECTS
      $(this.formView.el).hide();
      $(this.headerView.el).hide();   
      $(".l-agenda").show();
    },

    showFeedbackSection : function(e){
      //TODO: EFFECTS      
      $(this.headerView.el).show();
      $(this.formView.el).show();

      this.headerView.render();
      this.formView.render();
      $(".l-agenda").hide();
    },

  });
})();
