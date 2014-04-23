(function(){

var npsQuestion = $('#nps-question');

if (npsQuestion && npsQuestion.length > 0) {

  window.NpsQuestionView = Backbone.View.extend({

    events : {
      'click .nps': 'handleNPSQuestion',
    },

    initialize: function(options) {
      this.options = jQuery.extend(true, {}, this.defaultOptions, options);
      this.npsModel = { _type: 'Answer::Nps', value: null };
    },

    render : function() {
      console.log(" == Render NpsQuestionView");
      //$(this.el).addClass('current');
    },

    handleNPSQuestion : function(e){
      App.utils.setMarkedButton(e);
      this.npsModel.value = parseInt($(e.currentTarget).data("nps"));
      App.utils.model.setValue(this.options.survey, this.npsModel);
      App.utils.nextQuestion(this.options.nextQuestion);
    }
  });
}
})();


