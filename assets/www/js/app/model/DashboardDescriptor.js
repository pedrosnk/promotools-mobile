window.DashboardDescriptor = Backbone.Model.extend({
  idAttribute: "id",

  initialize: function(props){
    this.store = props.store;
    this.client = props.client;
  } ,

  url: function(){
    var instanceUrl = "";
    if(this.store === "all"){
         instanceUrl = '/dashboard/' + this.client + '/descriptor';
    } else {
        instanceUrl = '/dashboard/' + this.client + '/' + this.store +'/descriptor';
    }
    return instanceUrl;
  },

  parse: function (response){
    return  response;
  },


});
