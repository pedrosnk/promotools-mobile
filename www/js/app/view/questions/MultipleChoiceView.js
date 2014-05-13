( function(){

  window.MultipleChoiceView = Backbone.View.extend({

    events : {
      'click .option': 'handleItemChoice',
      'click .other' : 'handleOtherSelection',
      'click .send' : 'sendOptionInputInfo',
      'click .show-options-values' : 'showOptionsValues'
    },

    initialize: function(options) {
      this.options = jQuery.extend(true, {}, this.defaultOptions, options);
      this.answerModel = { _type: 'Answer::MultipleChoice',
                           category: this.options.category,
                           value: null };

      if (this.answerModel.category == null){
        var category = $(this.el).find('.options-values').data("category");
        this.answerModel.category = category;
      }

    },

    render : function() {
      console.log(" == Render MultipleChoiceQuestionView");
    },

    handleItemChoice : function(e){
      //$(this.el).off('click', '.heart');
      App.utils.setMarkedButton(e);

      var rate = $(e.currentTarget).data("option");
      this.answerModel.value = rate;

      App.utils.model.setValue(this.options.survey, this.answerModel);
      App.utils.updateProgressBar($("#survey-form-view .question").size(), $(this.options.survey.questions).size());
      App.utils.nextQuestion(this.options.nextQuestion);
    },

    handleOtherSelection : function(e){
      var optionsList = $(e.currentTarget).closest('ul.options-values');

      $(optionsList).transition({ opacity: 0 }, _.bind(function(){
        $(optionsList).hide();
        $(this.el).closest('a.other').hide();
        var optionInput = $(this.el).find('.other-option');

        optionInput.transition({opacity: 0, duration: 1}).show()
        .transition({y: 150, duration: 1})
        .transition({opacity: 1, y: 0, duration: 300});
      }, this));
    },

    showOptionsValues : function(e){      
      var optionsLink = $(e.currentTarget).parent('.other-option');
      var optionsList = $(e.currentTarget).parent().parent().find('.options-values');

      $(optionsList).transition({ opacity: 0 }, _.bind(function(){
        $(optionsLink).hide();
        $(optionsList).transition({opacity: 0, duration: 1}).show()
        .transition({y: 120, duration: 1})
        .transition({opacity: 1, y: 0, duration: 300});
      }, this));
    },

    sendOptionInputInfo : function(e){
      var option = $(this.el).find("input[name='other_option']").val() || null;
      this.answerModel.value = option;

      App.utils.model.setValue(this.options.survey, this.answerModel);
      App.utils.updateProgressBar($("#survey-form-view .question").size(), $(this.options.survey.questions).size());
      App.utils.nextQuestion(this.options.nextQuestion);
    }

  });
})();
