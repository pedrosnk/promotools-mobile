(function(){

var npsQuestion = $('#nps-question');

if (npsQuestion && npsQuestion.length > 0) {

  window.NpsQuestionView = Backbone.View.extend({

    events : {
      'click .nps-done': 'handleNPSQuestion',
    },

    initialize: function(options) {
      this.options = jQuery.extend(true, {}, this.defaultOptions, options);
      this.npsModel = { _type: 'Answer::Nps', value: null };
    },

    render : function() {
      console.log(" == Render NpsQuestionView");
      var menuWrapper = document.getElementById('slideshow-menu-wrapper');
      var cursor = document.getElementById('slideshow-menu-cursor');

      var slideshow = new Dragdealer('nps-slider', {
        steps: 11,
        snap: true,
        speed: 30,
        animationCallback: function(x, y) {
          var previousEl = $(".nps-red-target, .nps-green-target, .nps-yellow-target");
          previousEl.removeClass("nps-red-target nps-green-target nps-yellow-target");

          var target = '#nps-' + String(x * 10);
          var npsEl = $(target).find(".number");
          var npsValue = parseInt(npsEl.data("nps"));
          var targetClass = "nps-red-target";

          if(npsValue > 8) {
            targetClass = "nps-green-target";
          } else if (npsValue > 6 && npsValue < 9){
            targetClass = "nps-yellow-target";
          }

          npsEl.addClass(targetClass);
        }
      });

      slideshow.setStep(6);

      //We can improve it
      document.getElementById('nps-0').onclick = function(e){
        slideshow.setStep(1);
        return false;
      }

      document.getElementById('nps-1').onclick = function(){
        slideshow.setStep(2);
        return false;
      }

      document.getElementById('nps-2').onclick = function(){
        slideshow.setStep(3);
        return false;
      }

      document.getElementById('nps-3').onclick = function(){
        slideshow.setStep(4);
        return false;
      }

      document.getElementById('nps-4').onclick = function(){
        slideshow.setStep(5);
        return false;
      }

      document.getElementById('nps-5').onclick = function(){
        slideshow.setStep(6);
        return false;
      }

      document.getElementById('nps-6').onclick = function(){
        slideshow.setStep(7);
        return false;
      }

      document.getElementById('nps-7').onclick = function(){
        slideshow.setStep(8);
        return false;
      }

      document.getElementById('nps-8').onclick = function(){
        slideshow.setStep(9);
        return false;
      }

      document.getElementById('nps-9').onclick = function(){
        slideshow.setStep(10);
        return false;
      }

      document.getElementById('nps-10').onclick = function(){
        slideshow.setStep(11);
        return false;
      }
    },

    handleNPSQuestion : function(e){
      $(this.el).off('click', '.nps-done');
      App.utils.setMarkedButton(e);

      var targetRate = null;
      if($(".nps-red-target").length){
        targetRate =  $(".nps-red-target").data("nps");
      } else if($(".nps-yellow-target").length){
        targetRate = $(".nps-yellow-target").data("nps");
      } else {
        targetRate = $(".nps-green-target").data("nps");
      }
      this.npsModel.value = targetRate;
      this.options.survey.questions.push(this.npsModel);
      App.utils.nextQuestion(this.options.nextQuestion);
    }
  });
}
})();
