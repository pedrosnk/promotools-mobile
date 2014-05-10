window.Survey = Backbone.Model.extend({

  initialize: function(props){
    this.instanceUrl = props.url;
    this.questions = props.questions;
    this.client = props.client;
    this.store = props.store;
  } ,

  url: function(){
    return this.instanceUrl;
  },

  questions: function() {
    return this.questions;
  },

  parse: function (response){
    return  response;
  },


});

