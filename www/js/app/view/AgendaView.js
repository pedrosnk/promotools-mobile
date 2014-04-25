( function(){

  window.AgendaView = Backbone.View.extend({

    events : {
      'click #day-one-menu' : 'showDayOneAgenda',
      'click #day-two-menu' : 'showDayTwoAgenda'
    },

    render : function() {

    },

    showDayOneAgenda : function(e){
      $(e.currentTarget).addClass("active");
      $("#day-two-menu").removeClass("active");
      
      $("#day2").hide();      
      $("#day1").show();
      $("#day1 > .list-agenda").transition({y: 150, duration: 1}).transition({opacity: 1, y: 0, duration: 300});

    },

    showDayTwoAgenda : function(e){
      $(e.currentTarget).addClass("active");
      $("#day-one-menu").removeClass("active");
      $("#day1").hide();
      $("#day2").show();
      $("#day2 > .list-agenda").transition({y: 150, duration: 1}).transition({opacity: 1, y: 0, duration: 300});  
    }


  });
})();