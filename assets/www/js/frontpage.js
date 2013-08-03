$(document).ready(function(){

  var urlPathParam = document.location.hash;
  if(urlPathParam){
    $target = $(urlPathParam);
    $('html, body').stop().animate({
        'scrollTop': $target.offset().top - 75
    }, 900, 'swing', function () {
       $("a[href$=home"+ urlPathParam + "]").parent().addClass("active");
    });

  }

});

