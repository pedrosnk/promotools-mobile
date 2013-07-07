if(window.App === undefined){
  window.App = {};  
}


window.App.network = {
  BASE_URL: "http://promotools-survey.herokuapp.com",

  submitSurvey: function(survey){
    console.log("on submitSurvey data = " + survey);
    $.ajax({ 
      contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
      type: 'POST',     
      url : this.BASE_URL + '/surveys.json',
      data : survey,
      crossDomain : true,
      dataType: 'json',        
      success : function(form, action) {
        survey.confirmed_sended = 1;
        App.db.save(survey);
        setTimeout(function() { 
            $(".alert").hide(); 
            window.location.reload();
          },500); 
      },
      error: function(jqXHR, textStatus, errorThrown){
        survey.confirmed_sended = 0;
        App.db.save(survey);
      }
    });
  }
  
};