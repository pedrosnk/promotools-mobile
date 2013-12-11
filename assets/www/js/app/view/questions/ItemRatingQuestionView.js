( function(){

  window.ItemRatingQuestionView = Backbone.View.extend({

    events : {
      'click .rate': 'handleRatingItem',
    },

    initialize: function(options) {
      this.options = jQuery.extend(true, {}, this.defaultOptions, options);
    },

    render : function() {
      console.log(" == Render ItemRatingQuestionView");
    },

    handleRatingItem : function(e){
      this.selectRatingItem(e)

      var category = $(e.currentTarget).closest('.optins-list').data("category");
      var rate = parseInt($(e.currentTarget).data("rate"));
      var category_obj = {};
      category_obj[category] = rate;
      //TODO: SET DATA IN MODEL
      //config.DATA_SURVEY[this.options.category] = rate;
      this.options.survey.set(category_obj) ;
      App.utils.nextQuestion(this.options.nextQuestion);
    },

    selectRatingItem : function(e){
      $(this.el).off('click', '.rate');
      App.utils.setMarkedButton(e);

      var rate = parseInt($(e.currentTarget).data("rate"));
      $(".select-answer p").hide();
      var faceClass;
      switch(rate) {
        case 1:
          faceClass = 'bad-face';
          break;
        case 2:
          faceClass = 'regular-face';
          break;
        case 3:
          faceClass = 'good-face';
          break;
        case 4:
          faceClass = 'awesome-face'
          break;
      }
      console.log('[]');
      console.log(faceClass);
      $(".select-answer").addClass(faceClass);
    }
  });
})();
