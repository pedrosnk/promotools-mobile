( function(){

window.YesNoWithTextQuestionView = Backbone.View.extend({

  events : {
    'click .yes-button, .no-button': 'handleClickButton',
    'click .dont-remember-button, .send-button': 'handleTextClickButton',
    'focus :input.text-input' : 'hideHeader',
    'focusout :input.text-input' : 'showHeader',
  },

  initialize: function(options) {
    this.options = jQuery.extend(true, {}, this.defaultOptions, options);
    this.answerModel     = { _type: 'Answer::YesNo', value: null, label: this.options.labelName };
    this.answerTextModel = { _type: 'Answer::TextBox', value: null, label: this.options.labelName };
    $(this.el).find('.yes-no-text-option').hide();
  },

  render : function() {
    console.log(" == Render YesNoWithTextQuestionView");
  },

  handleClickButton: function(e){
    App.utils.setMarkedButton(e);
    var el = $(e.currentTarget);
    var optionsList = el.closest('.options-yes-no');
    if (el.hasClass("yes-button")) {
      this.answerModel.value = true;
      //$(this.el).find('.yes-no-text-option').show(500);
      var viewEl = this.el;
      $(optionsList).transition({ opacity: 0 }, function(){
        $(optionsList).hide();
        $(viewEl).find('.yes-no-text-option')
          .transition({opacity: 0, duration: 1})
          .show()
          .transition({y: 150, duration: 1})
          .transition({opacity: 1, y: 0, duration: 300});
      });
    } else {
      this.answerModel.value = false;
      this.renderNextQuestion();
    }
  },

  handleTextClickButton: function(e){
    var el = $(e.currentTarget);
    if (el.hasClass('send-button')){
      this.answerTextModel.value = $(this.el).find("input[name='furniture-text-input']").val() || null;
    }
    App.utils.setMarkedButton(e);
    this.renderNextQuestion();
  },

  renderNextQuestion: function() {
    this.options.survey.questions.push(this.answerModel);
    this.options.survey.questions.push(this.answerTextModel);
    App.utils.nextQuestion(this.options.nextQuestion);
    if (typeof this.options.npsView !== "undefined" && this.options.npsView !== null) {
      var npsView = this.options.npsView;
      setTimeout(function(){
        npsView.render();
      }, 1500);
    }
  },

  hideHeader: function(){
    $("#header-survey").hide();
    $(".hide-keyboard").show();
    $(".hide-keyboard").css("top", "150px");
    $(".survey-container").css("margin-top", "-150px");
  },

  showHeader: function() {
    $("#header-survey").show();
    $(".hide-keyboard").hide();
    $(".survey-container").css("margin-top", "130px");
  }


});

})();
