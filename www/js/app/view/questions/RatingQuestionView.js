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
      var rate = parseInt($(e.currentTarget).data("rate"));
      this.rating[category] = rate;

      if(_.size(this.rating) === 4){
        var ratingTypes = ['enviroument', 'quality', 'variety', 'price'];
        for ( rate in ratingTypes ) {
          var ratingModel = { _type: 'Answer::MultipleChoice', value: this.rating[ratingTypes[rate]], rating_label: ratingTypes[rate] };
          this.options.survey.questions.push(ratingModel);
        }
        App.utils.nextQuestion(this.options.nextQuestion);
      }
    },

    selectItem : function(e){
      //remove previous markup in a category list
      App.utils.setMarkedButton(e);
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
