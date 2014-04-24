(function(){
'use strict';

window.CalendarView = Backbone.View.extend({

  el: '#calendar-view-main',

  initialize: function(){
    $.getJSON('http://localhost:3000/calendars/calendar_events')
    .done(this._calendarsSuccess);

    return this;
  },

  render: function(){
    App.storage.fetchCalendars();
    return this;
  },

  _calendarsSuccess: function(calendars){
    App.storage.saveCalendars(calendars);
  },

  _createCalendarCollection: function(calendars){

  }

});
})();
