(function(){
  /*
   * This view handle filter events and trigger actions to update dashboard
   */
  window.FilterView = Backbone.View.extend({

    events : {
      'change .store-select' : 'handleStoreSelection'
    },

    render : function(){
      $('select').selectpicker();
      this.store = $('.store-select').find(':selected').data('type');
    },

    handleStoreSelection : function(){
      this.store = $(".store-select").find(":selected").data("type");
      this.trigger('update',this.store);
    }
  });

})();
