define('model/team',['backbone'], function(Backbone){
  "use strict";

  return Backbone.Model.extend({
    statusPercent: function(){
      var tasks = this.get('tasks');
      var doneCount = 0;

      for(var i in tasks) {
        if(tasks[i].done) {
          doneCount += 1;
        }
      }
      return (doneCount * 100) / tasks.length;
    }
  });

});

