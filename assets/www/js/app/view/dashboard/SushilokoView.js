(function(){


  window.SushilokoView = Backbone.View.extend({


    createNPSGraph : function(model, response, options) {
     var npsChartView = new ColumnChartView({
        el : $('#nps-graph'),
        name : 'npsChart',
        score : response.nps
      });
      npsChartView.render();
    },

    createGoodReasonGraph : function(model, response, options) {
      var goodReasonGraphView = new PieChartView({
        el: $('#graph-good-reasons'),
        name : 'goodReasonChart',
        score: response.good_reason
      });
      goodReasonGraphView.render();
    },

    createBadReasonGraph : function(model, response, options){
      var badReasonGraphView = new PieChartView({
        el: $('#graph-bad-reasons'),
        name : 'badReasonChart',
        score: response.bad_reason
      });
      badReasonGraphView.render();
    },

    createSugestionsList : function(model, response, options) {
      var sugestionView = new SugestionView({
        el: $('#list-sugestions'),
        sugestions: response
      });
      console.log(response);
      sugestionView.render();
    },

    createEmailsList : function(model, response, options) {
      var emailsView = new EmailsView({
        el: $('#list-client-emails'),
        collection: response
      });
      emailsView.render();
    },

    createSocialCommentView : function(model, response, options){
      var socialCommentsView = new SocialCommentsView({
        el: $('#social-comments-table'),
        collection: response
      });
      socialCommentsView.render();
    },

    render : function(){

      $('select').selectpicker();

      var NPSDataModel = new DataPoint({
        url : '/dashboard/sushiloko/nps'
      });

      var GoodReasonDataModel = new DataPoint({
        url : '/dashboard/sushiloko/good-reason'
      });

      var BadReasonDataModel = new DataPoint({
        url : '/dashboard/sushiloko/bad-reason'
      });

      var SugestionsDataModel = new DataPoint( {
        url: '/dashboard/sushiloko/sugestions'
      });

      var EmailsDataModel = new DataPoint( {
        url: '/dashboard/sushiloko/emails'
      });

      this.FoursquareCommentsDataModel = new DataPoint( {
        url: '/dashboard/sushiloko/foursquare-comments'
      });

      NPSDataModel.fetch({
        success: this.createNPSGraph
      });

      GoodReasonDataModel.fetch({
        success: this.createGoodReasonGraph
      });

      BadReasonDataModel.fetch({
        success: this.createBadReasonGraph
      });

      SugestionsDataModel.fetch( {
        success: this.createSugestionsList,
      });

      EmailsDataModel.fetch( {
        success: this.createEmailsList,
      });

      this.FoursquareCommentsDataModel.fetch({
        success: this.createSocialCommentView,
        data: { store: this.store }
      });
    }

  })

})();
