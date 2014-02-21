window.DataPoint = Backbone.Model.extend({
  idAttribute: "id",

  initialize: function(props){
    this.instanceUrl = props.url;
    this.store = props.store;
    this.client = props.client;
  } ,

  url: function(){
    return this.instanceUrl;
  },

  parse: function (response){
    return  response;
  },


});
