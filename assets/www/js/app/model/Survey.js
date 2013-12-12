window.Survey = Backbone.Model.extend({

  initialize: function(props){
    this.instanceUrl = props.url;
    this.questions = props.questions;
    this.store = props.store;
    this.client = props.client;
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
