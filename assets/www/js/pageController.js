$(document).ready(function(){
  $('#email_sugestion').hide();
  $('#claim_email_sugestion').hide();

  window.DATA_SURVEY = null;
  window.BASE_URL = "http://localhost:3000/";
  window.END_POINT = "v1.0/surveys/sushi_loko_409_sul";
  window.EMAIL_REGEX = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/

  var domains = ['hotmail.com', 'gmail.com', 'aol.com','yahoo.com.br'];

  $('#email_sugestion_link,#claim_email_sugestion_link').click(function(e){
    e.preventDefault();
    var emailSuggested = $(this).html();
    $(this).parent().parent().children('input[name=user_contact]').val(emailSuggested);
    $(this).parent().hide();
  });

  $('input[name=user_contact]').on('keydown', function() {
    $('#email_sugestion').hide();
    $('#claim_email_sugestion').hide();
    $(this).mailcheck({
      domains: domains,
      suggested: function(element, suggestion) {
        $('#email_sugestion, #claim_email_sugestion').show();
        $('#email_sugestion_link, #claim_email_sugestion_link').html(suggestion.full);
      },
      empty: function(element) {
      }
    });
  });

  $('.email-input, .feedback-input').on('focus', function(){
    //$(".survey-container").scrollTop()
    $(".l-footer-survey").hide();
  });

  $('.email-input, .feedback-input').on('focusout', function(){
    $(".l-footer-survey").show();
  });

  setTimeout(function() {
    $('.splash-screen').hide();
    _createProgressNumbers();
  }, 3000)

  function _setMarkedButton(e){
    var el = $(e.currentTarget);
    //get a button or a li children, witch is a button
    var button = el.hasClass("survey-btn") || el.hasClass("survey-large-btn") ? el : el.children();
    button.addClass("selected");
    button.transition({scale: 0.95 }).transition({scale: 1 });
  };

  function _nextQuestion(next){
    setTimeout(function(){
      _showNextQuestion(next)
    }, 1000);
  };

  function _showNextQuestion(next){
    var current = $(".survey-container").find(".current");

    //not not progress bar in this cases
    if($(current).attr("id") != "leave-sugestion" && $(current).attr("id") != "sugestion-box"){
      _updateProgressBar();
    }

    $(current).transition({
      x: $(current).width(),
      duration: 500,
      complete: function(){
        $(current).removeClass("current");
        next.addClass("current");
      }
    });
  };

  function _createProgressNumbers(){
    var total = $(".survey-progress").children().length - 1;
    var progressEl = $(".survey-progress .order");
    $(progressEl).find(".status").text(1);
    $(progressEl).find(".total").text(total);
  };

  function _updateProgressBar(){
    var currentEl = $(".survey-progress").find(".current");
    currentEl.removeClass("current");

    var nextEl = currentEl.next().hasClass("status") ? currentEl.next() : $(".first");
    nextEl.addClass("current");

    var progressEl = $(".survey-progress .order").find(".status");
    $(progressEl).text(parseInt(progressEl.text()) + 1);
  };

  function submitSurvey(){
    var surveys = [window.DATA_SURVEY];

  	$.ajax({
  		contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
  		type: 'POST',
  		url : window.BASE_URL + window.END_POINT,
  		data : {surveys: surveys },
      crossDomain : true,
      dataType: 'json',
  	});
  };

  function finishSurvey(){
    setTimeout(function(){
      _showNextQuestion($("#thanks-message"));
    }, 1000);
    // submitSurvey();
    window.App.utils.handleAnswer(window.DATA_SURVEY);
    setTimeout(function() {
      window.location.reload();
    }, 5000);
  };

  $("#nps-question-itens").children().click(function(e){
    window.DATA_SURVEY = { nps : e.currentTarget.innerText, confirmed_sended: 0, origin: "web" };
    _setMarkedButton(e);
    _nextQuestion($("#reason-question"));
  });

  $("#reason-question-itens .column-left, #reason-question-itens .column-right").children().click(function(e){
    window.DATA_SURVEY.reason = e.currentTarget.innerText;
    _setMarkedButton(e);
    _nextQuestion($("#first-time-question"));
  });

  $("#first-time-question").children().click(function(e){
    _setMarkedButton(e);

<<<<<<< HEAD
    if(window.DATA_SURVEY.nps > 5) {
        $("#email-question").show();
=======
    window.DATA_SURVEY.first_time = $(e.currentTarget).hasClass('yes') ? 1 : 0;

    if(window.DATA_SURVEY.nps > 5) {
      _nextQuestion($("#email-question"));
>>>>>>> 12fdf1e895818475280f7171084bc8b2a917dda8
    } else{
      _nextQuestion($("#claim-email-question"));
    }
  });

  $(".email-question-yes, .email-question-no").click(function(e){
    var el = $(this).parent();
    window.DATA_SURVEY.email = el.find('input[name=user_contact]').val();
    _setMarkedButton(e);
    _nextQuestion($("#leave-sugestion"));
  });

  $("#leave-sugestion").children().click(function(e){
    _setMarkedButton(e);
    $('input[name=sugestion]').val(e.currentTarget.innerText);

    if($(e.currentTarget).hasClass('yes')){
      _nextQuestion($("#sugestion-box"));
    } else{
      window.DATA_SURVEY.sugestion = null;
    	finishSurvey();
    }
  });

  $(".submit-sugestion, .cancel-sugestion").click(function(e){
    _setMarkedButton(e);
  	var el = $(this).parent();
    var feedback = el.find('textarea[name=feedback]').val();
    window.DATA_SURVEY.sugestion = feedback;
    finishSurvey();
  });


  /*
   *  UTILITIES
   */

  jQuery.ajaxSetup({
    'beforeSend': function(xhr) {xhr.setRequestHeader("Accept", "text/javascript")}
  });

});
