(function(){
'use strict';

window.CalendarView = Backbone.View.extend({

  el: '#calendar-view',

  initialize: function(){
    $.getJSON(BrappsSupport.calendarUrl())
    .done(_.bind(this._calendarsSuccess, this));

    return this;
  },


  render: function(){
    return this;
  },

  _calendarsSuccess: function(calendars){
    App.storage.saveCalendars(calendars, _.bind(this._loadCalendars, this));
  },

  _loadCalendars: function() {
    App.storage.fetchCalendars(_.bind(this._createCalendarCollection, this));
  },

  _createCalendarCollection: function(calendars){
    this.calendarsCollection = new CalendarCollection(calendars);
  }

});
})();
