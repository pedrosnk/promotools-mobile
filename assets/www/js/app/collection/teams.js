define('collection/teams',
  ['backbone', 'model/team', 'config'],
  function(Backbone, Team, Config) {
  "use strict";

  return Backbone.Collection.extend({
    url: Config.BASE_URL + 'swbsb/teams.json',
    model: Team,

    saveOnDB: function() {

    }
  });

});

