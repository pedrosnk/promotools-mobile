( function(){

  window.ItemRatingQuestionView = Backbone.View.extend({

    events : {
      'click .heart, .star': 'handleSelection'
    },

    initialize: function(options) {
      this.options = jQuery.extend(true, {}, this.defaultOptions, options);
      this.answerModel = { _type: 'Answer::RatingItem',
                        category: this.options.category,
                           value: null };

      if(this.answerModel.category == null){
        var category = $(this.el).find('ul.rating-values').data("category");
        this.answerModel.category = category;
      }
    },

    render : function() {
      console.log(" == Render ItemRatingQuestionView");
    },

    handleSelection : function(e){
      var rate = parseInt($(e.currentTarget).data("rate"));

      App.utils.remoteSelection(e);

      //mark selection in range
      var list = $(e.currentTarget).closest('ul').children();
      for(var i = 0; i < 5; i++){
        if(i + 1 <= rate) {
          var liElement = $(list.get(i)).children();
          $(liElement.get(0)).addClass("selected");;
        }
      }

      this.saveItemValue(rate)
    },

    saveItemValue : function(rate){
      this.answerModel.value = rate;
      App.utils.model.setValue(this.options.survey, this.answerModel);
      App.utils.nextQuestion(this.options.nextQuestion);
    },


  });
})();
