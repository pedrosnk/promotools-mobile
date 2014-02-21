define('config', function(){
  'use strict';
  return  {

  BASE_URL : "http://192.168.1.2:3000/",
  END_POINT : "v1.0/surveys/sushiway/taga",
  //BASE_URL : "http://promotools-survey.herokuapp.com/",
  //BASE_URL : "http://promotools.com.br/",
  //END_POINT : "v1.0/surveys/sushi_loko_409_sul",
  DATA_SURVEY : null,
  EMAIL_REGEX : /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/

  };
});

define('backbone', Backbone);
define('jquery', jQuery);
define('underscore', _);

