$(document).ready(function(){

  var landing = $('.l-landing');
  if (landing  && landing.length > 0){
    var urlPathParam = document.location.hash;
    if(urlPathParam){
      $target = $(urlPathParam);
      $('html, body').stop().animate({
          'scrollTop': $target.offset().top - 75
      }, 900, 'swing', function () {
         $("a[href$=home"+ urlPathParam + "]").parent().addClass("active");
      });
    }
  }
  

});

