define('collection/teams',
  ['backbone', 'model/team', 'config', 'storage'],
  function(Backbone, Team, Config, Storage) {
  "use strict";

  return Backbone.Collection.extend({
    url: Config.BASE_URL + 'swbsb/teams.json',
    model: Team,

    initialize: function(){
      Storage.getTeams(_.bind(function(teamsJson){
        this.add(teamsJson);
      }, this));
    },

    saveOnDb: function() {
      Storage.saveTeams(this);
    }
  });

});

