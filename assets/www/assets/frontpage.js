$(document).ready(function(){var a=document.location.hash;a&&($target=$(a),$("html, body").stop().animate({scrollTop:$target.offset().top-75},900,"swing",function(){$("a[href$=home"+a+"]").parent().addClass("active")}))})