(function(){

var ratingQuestion = $('#rating-question');

if (ratingQuestion && ratingQuestion.length > 0) {

  window.RatingQuestionView = Backbone.View.extend({

    events : {
      'click .btn-item': 'handleRating',
    },

    initialize: function(options) {
      this.options = jQuery.extend(true, {}, this.defaultOptions, options);
    },

    render : function() {
      console.log(" == Render RatingQuestionView");
      this.rating = {};
    },

    handleRating : function(e){
      this.selectItem(e)
      var category = $(e.currentTarget).closest('.rating-optins-list').data("category");
      var rate = $(e.currentTarget).data("rate");      
      this.rating[category] = rate;

      if(_.size(this.rating) === 4){        
        this.options.survey.set({rating: this.rating});                                              
        utils.nextQuestion(this.options.nextQuestion); 
      }
    },

    selectItem : function(e){
      //remove previous markup in a category list
      var categoryList = $(e.currentTarget).closest('.rating-optins-list');
      var previousMarkupInCategory = $(categoryList).find(".active");
      if (previousMarkupInCategory){
        previousMarkupInCategory.removeClass("active");
      }
      $(e.currentTarget).addClass("active");      
    }
  });
}
})();    
