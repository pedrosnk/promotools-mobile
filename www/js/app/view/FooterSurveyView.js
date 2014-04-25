(function(){

var footerViewEl = $('#footer');

if (footerViewEl && footerViewEl.length > 0) {

  window.FooterSurveyView = Backbone.View.extend({

    events : {
      'click .feedback' : 'goToFeedback',      
      'click .agenda' : 'goToAgenda',
    },

    goToAgenda : function(e){
      this.setSelected(e);
      this.trigger("showAgenda");
    },

    goToFeedback : function(e){
      this.setSelected(e);
      this.trigger("showFeedback");
    },

    setSelected : function(e){
      var menu = $(e.currentTarget).closest(".menu")
      $(menu).find("li.selected").removeClass("selected");
      $(e.currentTarget).parent().addClass("selected");
    }

  });
}
})();
