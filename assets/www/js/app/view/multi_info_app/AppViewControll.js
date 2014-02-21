define('views/multiInfoApp/appViewController',
    ['backbone','collection/teams'], function(Backbone, Teams) {
  'use strict';
   return Backbone.View.extend({
    initialize: function(){
      this.teams = new Teams;
    },

    events : {
      'click .home-action': 'showHomeView',
      'click .team-action': 'showTeamView',
      'click .mentors-action': 'showMentorsView',
      'click .feedback-action': 'showFeedbackView',
    },

    render : function(){
      console.log("here we gooo...");
      this.showSelectedView("feedback-content-view");

    },

    showHomeView : function(e){
      this.setSelectedButton(e);
      this.showSelectedView("home-content-view");
    },

    showTeamView : function(e){
      this.setSelectedButton(e);
      this.showSelectedView("team-content-view");
      this.renderTeamsView()
      this.teams.fetch({success : _.bind(this.renderTeamsView, this)});
    },

    showMentorsView : function(e){
      this.setSelectedButton(e);
      this.showSelectedView("mentors-content-view");
    },

    showFeedbackView : function(e){
      this.setSelectedButton(e);
      this.showSelectedView("feedback-content-view");

      var weekendFormView = new WeekendFormView({
        el : $('#survey')
      });
      weekendFormView.render();
    },

    setSelectedButton : function(e){
      var menu = $(e.currentTarget).closest('.menu-itens');
      $(menu).find(".selected").removeClass("selected");
      $(e.currentTarget).addClass("selected");
    },

    renderTeamsView : function() {
      $('#teams-data').html(JST['swbsb/teams']({ teams: this.teams}));
    },

    showSelectedView : function(viewName){
      $('.home-content-view').hide();
      var contentViews = $(".view-content").children();

      $(contentViews).each(function(){
        if( $(this).hasClass(viewName)){
          $(this).show();
        }else {
          $(this).hide();
        }
      })
    }

  });

});
