( function(){

  window.MultipleChoiceView = Backbone.View.extend({

   
    events : {
      'click .option': 'handleItemChoice',
      'click .other' : 'handleOtherSelection',
      'click .send' : 'sendOptionInputInfo'
    },

    initialize: function(options) {
      this.options = jQuery.extend(true, {}, this.defaultOptions, options);
      this.answerModel = { _type: 'Answer::SingleChoice', 
                   choice_option: this.options.category,
                           value: null };

      if (this.answerModel.choice_option == null){
        var category = $(this.el).find('.optins-values').data("option");
        this.answerModel.choice_option = category;
      }

    },

    render : function() {
      console.log(" == Render SingleChoiceQuestionView");
    },

    handleItemChoice : function(e){
      //$(this.el).off('click', '.heart');
      App.utils.setMarkedButton(e);

      var rate = $(e.currentTarget).data("option");
      this.answerModel.value = rate;
            
      App.utils.model.setValue(this.options.survey, this.answerModel);                                
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
      App.utils.nextQuestion(this.options.nextQuestion);
    }

  });
})();
