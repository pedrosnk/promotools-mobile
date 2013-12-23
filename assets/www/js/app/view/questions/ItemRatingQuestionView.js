( function(){

  window.ItemRatingQuestionView = Backbone.View.extend({

    events : {
      'click .rate': 'handleRatingItem',
    },

    initialize: function(options) {
      this.options = jQuery.extend(true, {}, this.defaultOptions, options);
      this.answerModel = { _type: 'Answer::MultipleChoice', value: null, rating_label: 'service' };
    },

    render : function() {
      console.log(" == Render ItemRatingQuestionView");
    },

    handleRatingItem : function(e){
      $(this.el).off('click', '.rate');
      App.utils.setMarkedButton(e);
      
      var rate = parseInt($(e.currentTarget).data("rate"));
      this.answerModel.value = rate;
      this.options.survey.questions.push(this.answerModel);

      this.selectRatingItem(rate)
      
      App.utils.nextQuestion(this.options.nextQuestion);
    },

    selectRatingItem : function(rate){      
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
      $(".select-answer").addClass(faceClass);
    }
  });
})();
