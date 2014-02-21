(function(){
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

      var category = $(e.currentTarget).closest('.rating-optins-list').data("category");
      var rate = $(e.currentTarget).data("rate");      
      //TODO: SET DATA IN MODEL         
      //config.DATA_SURVEY[this.options.category] = rate;  
      this.options.survey.set({category : rate});
      utils.nextQuestion(this.options.nextQuestion);              
    },

    selectRatingItem : function(e){
      $(this.el).off('click', '.rate');
      utils.setMarkedButton(e);

      var rate = $(e.currentTarget).data("rate");
      $(".select-answer p").hide();
      $(".select-answer").addClass(rate + "-face");     
    }    
  });
})();    
