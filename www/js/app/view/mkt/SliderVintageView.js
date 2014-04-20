(function(){

var vintageFormView = $('.carrousel');

if (vintageFormView && vintageFormView.length > 0) {

  window.SliderVintageView = Backbone.View.extend({

    events : {
      'click .go-to-survey' : 'handleShowSurvey',
    },

    handleShowSurvey : function(){
      this.slider.stopAuto();
      $('.vintage-form-view').removeClass('slider-bkg-home slider-bkg-itens');
      $('#header-survey').show();
      $('.survey-container').show();
      $('.slider-container').hide();
      this.survey.render();
    },

    render : function() {
      $('#header-survey').hide();
      $('.vintage-form-view').addClass('slider-bkg-home');
      $('.top-info').hide();
      $('.survey-container').hide();

      this.survey = new VintageSurveyView({
        el : $('#survey')
      });

      this.slider = $('.carrousel').bxSlider({
        adaptiveHeight: true,
        pager: false,
        auto: true,
        pause: 11000,
        minSlides: 1,
        maxSlides: 1,
        slideWidth: 900,
        nextText: '',
        prevText: '',

        onSlideBefore : function(slideElement, oldIndex, newIndex){
          if(newIndex == 0){
            $('.vintage-form-view').removeClass('slider-bkg-itens');
            $('.vintage-form-view').addClass('slider-bkg-home');
            $('.top-info').hide();

          } else {
            $('.vintage-form-view').removeClass('slider-bkg-home');
            $('.vintage-form-view').addClass('slider-bkg-itens')
            $('.top-info').show();
          }
        }
      });

      this.slider.goToSlide(1);
    }
  });
}
})();
