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

      /*
      this.footerView = new FooterSurveyView({ el : $('#footer') });
      this.agendaView = new AgendaView({ el : $('#agenda') });
      this.footerView.on("showAgenda", this.showAgendaSection, this);
      this.footerView.on("showFeedback", this.showFeedbackSection, this);
      */

      this.headerView.render();
      this.formView.render();

      this.sliderPresentationView();
    },

    showHomePage : function(){
      $('#splash').transition({opacity: 0},  _.bind(function(){
        $("#splash").hide();
        $(this.formView.el).show();
        $(this.headerView.el).show();
        $("#footer").show();
        $(this.headerView.el).find('.right, .left').show();
        //$(this.footerView.el).transition({y: 150, duration: 1}).transition({opacity: 1, y: 0, duration: 300}).show();

      }, this));

    },

    sliderPresentationView : function(){
      $(this.formView.el).hide();
      $(this.headerView.el).hide();
      $("#footer").hide();

      $('#presentation').bxSlider({
        adaptiveHeight: true,
        mode: 'fade',
        pager: false,
        touchEnabled: true,
        controls: false,
        auto: true,
        pause: 7000
      });
    },

    /*
    showAgendaSection : function(e){
      $(this.formView.el).hide();
      $(".progress-bar").hide();
      $(this.headerView.el).show();
      $(this.headerView.el).find('.right, .left').hide();

      $(".l-agenda").show();

      $(".column-days").transition({ x: 15, opacity: 1 });
      $("#day1 .list-agenda").transition({y: 150, duration: 1}).transition({opacity: 1, y: 0, duration: 300});
    },

    showFeedbackSection : function(e){
      $(".progress-bar").show();
      $(this.headerView.el).show();
      $(this.headerView.el).find('.right, .left').show();
      $(this.formView.el).show();
      $(".l-agenda").hide();
    },
    */
  });
})();
