( function(){

  window.YesNoQuestionView = Backbone.View.extend({

    events : {
      'click .option': 'handleOptionSelection'
    },

    initialize: function(options) {
      this.options = jQuery.extend(true, {}, this.defaultOptions, options);
      this.answerModel = { _type: 'Answer::YesNo',
                        category: this.options.category,
                           value: null };

      if(this.answerModel.category == null){
        var category = $(this.el).find('ul.boolean-values').data("category");
        this.answerModel.category = category;
      }
    },

    render : function() {
      console.log(" == Render SingleChoiceQuestionView");
    },

    handleOptionSelection : function(e){
      //$(this.el).off('click', '.heart');
      App.utils.setMarkedButton(e);

      var option = $(e.currentTarget).data("option");
      this.answerModel.value = (option === "yes") ? true : false;

      App.utils.model.setValue(this.options.survey, this.answerModel);
      App.utils.nextQuestion(this.options.nextQuestion);
    },


  });
})();
