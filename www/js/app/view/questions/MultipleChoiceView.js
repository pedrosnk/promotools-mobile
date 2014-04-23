( function(){

  window.MultipleChoiceView = Backbone.View.extend({

    events : {
      'click .option': 'handleItemChoice',
      'click .other' : 'handleOtherSelection',
      'click .send' : 'sendOptionInputInfo'
    },

    initialize: function(options) {
      this.options = jQuery.extend(true, {}, this.defaultOptions, options);
      this.answerModel = { _type: 'Answer::MultipleChoice',
                           category: this.options.category,
                           value: null };

      if (this.answerModel.choice_option == null){
        var category = $(this.el).find('.optins-values').data("option");
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
      var optionsList = $('ul.options-values');
      $(optionsList).transition({ opacity: 0 }, _.bind(function(){
        $(optionsList).hide();
        $(this.el).find('a.other').hide();
        $(this.el).find('.other-option').transition({opacity: 0, duration: 1}).show()
        .transition({y: 150, duration: 1})
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
