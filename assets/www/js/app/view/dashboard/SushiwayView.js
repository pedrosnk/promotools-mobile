(function(){
  "use strict";

  window.SushiwayView = Backbone.View.extend({

    events : {
      'change .store-select' : 'handleStoreSelection'
    },

    initialize : function() {
      this.store = $('.store-select').find(':selected').data('type');
      this.NPSDataModel = new DataPoint({
        url : '/dashboard/sushiway/nps'
      });

      this.GoodReasonDataModel = new DataPoint({
        url : '/dashboard/sushiway/good-reason'
      });

      this.BadReasonDataModel = new DataPoint({
        url : '/dashboard/sushiway/bad-reason'
      });

      this.BigNumberDataModel = new DataPoint({
        url: '/dashboard/sushiway/big-numbers'
      });

      this.GenderDataModel = new DataPoint({
        url: '/dashboard/sushiway/get_graph'
      });

      this.AgeDataModel = new DataPoint({
        url: '/dashboard/sushiway/get_graph'
      });

      this.FrequencyDataModel = new DataPoint({
        url: '/dashboard/sushiway/get_graph'
      });

      this.NpsClassificationDataModel = new DataPoint({
        url: '/dashboard/sushiway/get_graph'
      });

      this.SugestionsDataModel = new DataPoint( {
        url: '/dashboard/sushiway/sugestions'
      });

      this.EmailsDataModel = new DataPoint( {
        url: '/dashboard/sushiway/emails'
      });

      this.FoursquareCommentsDataModel = new DataPoint( {
        url: '/dashboard/sushiway/foursquare-comments'
      });
    },

    handleStoreSelection : function(element) {
      this.store = $(".store-select").find(":selected").data("type");
      this.render();
    },

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

    createGenderGraph : function(model, response, options){
      var genderGraphView = new GenderChartView({
        el: $('#graph-gender'),
        name : 'genderChart',
        score: response.score
      });
      genderGraphView.render();
    },

    createAgeGraph : function(model, response, options){
      var pieChartView = new PieChartView({
        el: $('#graph-age'),
        name : 'ageChart',
        score: response.score
      });
      pieChartView.render();
    },

    createFrequencyGraph : function(model, response, options){
      var pieChartView = new PieChartView({
        el: $('#graph-frequency'),
        name : 'frequencyChart',
        score: response.score
      });
      pieChartView.render();
    },

    createNpsClassificationGraph : function(model, response, options){
      var barChartView = new BarChartView({
        el: $('#graph-nps-classification'),
        name : 'npsClassificationChart',
        score: response.score
      });
      barChartView.render();
    },

    createSugestionsList : function(model, response, options) {
      var sugestionView = new SugestionView({
        el: $('#list-sugestions'),
        sugestions: response
      });
      sugestionView.render();
    },

    createEmailsList : function(model, response, options) {
      var emailsView = new EmailsView({
        el: $('#list-client-emails'),
        collection: response
      });
      emailsView.render();
      setTimeout(function(){
        $('.expand-vertical .m-info-box').height($('#list-client-emails').parent().height() + 150);
      }, 1500 );
    },

    createSocialCommentView : function(model, response, options){
      var socialCommentsView = new SocialCommentsView({
        el: $('#social-comments-table'),
        collection: response
      });
      socialCommentsView.render();
    },

    populateBigNumbers: function(model, response, options) {
      $('#answers_total').text(response.big_numbers.answers);
      $('#valid_emails').text(response.big_numbers.valid_emails);
      $('#interaction_averange').text(response.big_numbers.interaction_averange);
      $('#first_timers').text(response.big_numbers.first_timers);
      $('#nps_measure').text(response.big_numbers.nps_measure);
    },

    render : function(){

      $('select').selectpicker();

      this.NPSDataModel.fetch({
        success: this.createNPSGraph,
        data: { store: this.store }
      });

      this.GoodReasonDataModel.fetch({
        success: this.createGoodReasonGraph,
        data: { store: this.store }
      });

      this.BadReasonDataModel.fetch({
        success: this.createBadReasonGraph,
        data: { store: this.store }
      });

      this.GenderDataModel.fetch({
        success: this.createGenderGraph,
        data: {
          store: this.store,
          graph: 'gender'
        }
      });

      this.AgeDataModel.fetch({
        success: this.createAgeGraph,
        data: {
          store: this.store,
          graph: 'age_range'
        }
      });

      this.FrequencyDataModel.fetch({
        success: this.createFrequencyGraph,
        data: {
          store: this.store,
          graph: 'frequency'
        }
      });

      this.NpsClassificationDataModel.fetch({
        success: this.createNpsClassificationGraph,
        data: {
          store: this.store,
          graph: 'nps_classification'
        }
      });

      this.BigNumberDataModel.fetch( {
        success: this.populateBigNumbers,
        data: { store: this.store }
      });

      this.SugestionsDataModel.fetch( {
        success: this.createSugestionsList,
        data: { store: this.store }
      });

      this.EmailsDataModel.fetch( {
        success: this.createEmailsList,
        data: { store: this.store }
      });

      this.FoursquareCommentsDataModel.fetch({
        success: this.createSocialCommentView,
        data: { store: this.store }
      });

    }

  })

})();
