window.DATA_SURVEY = null;

$("#nps-question-itens").children().click(function(e){
    e.preventDefault();
    window.DATA_SURVEY = { nps : e.currentTarget.innerText };

    $("#nps-question").hide();
    $("#reason-question").show();
});

$("#reason-question-itens").children().click(function(e){
    e.preventDefault();    
    window.DATA_SURVEY.reason = e.currentTarget.innerText;

    $("#reason-question").hide();
    $("#first-time-question").show();
});

$("#first-time-question").children().click(function(e){
    e.preventDefault();
    
    if($(e.currentTarget).hasClass('yes')){
        window.DATA_SURVEY.first_time = 1;
    } else {
        window.DATA_SURVEY.first_time = 0;
    }

    $("#first-time-question").hide();

    if(window.DATA_SURVEY.nps > 7) {
        $("#email-question").show();
    } else{
        $("#claim-email-question").show();
    }
});

$(".email-question-yes, .email-question-no").click(function(e){
    e.preventDefault();    
    var el = $(e.toElement.parentNode);
    window.DATA_SURVEY.email = el.find('input[name=user_contact]').val();

    $("#email-question").hide();
    $("#claim-email-question").hide();
    $("#leave-sugestion").show();
});

$("#leave-sugestion").children().click(function(e){
  console.log(" >> on leave-sugestion");
  e.preventDefault();
  window.DATA_SURVEY.sugestion = e.currentTarget.innerText;

  if($(e.currentTarget).hasClass('yes')){
      $("#leave-sugestion").hide();
      $("#sugestion-box").show();
  } else{
  	$(".alert").show();
    window.App.network.submitSurvey(window.DATA_SURVEY);
  }

});

$(".submit-sugestion").click(function(e){
  console.log(" >> on submit-sugestion");
	$(".alert").show();
	var el = $(e.toElement.parentNode);
  var feedback = el.find('textarea[name=feedback]').val();
  window.DATA_SURVEY.sugestion = feedback;
  window.App.network.submitSurvey(window.DATA_SURVEY);
});

