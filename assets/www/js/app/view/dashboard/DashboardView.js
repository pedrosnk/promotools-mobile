(function(){

  /*
   * This view handle dashboard and graphs creation
   */
  window.DashboardView = Backbone.View.extend({

    initialize : function(){
      //TODO: WE MUST GET CLIENT AND STORE INFO DINAMICALLY
      //this.descriptorPath = window.location.pathname;
      this.client = $('#dashboard-filter').data('client-name');
      this.store = $('#dashboard-filter .store-select').find(':selected').data('type');

      this.descriptor = new DashboardDescriptor({
        store: this.store,
        client: this.client
      });
    },

    render : function(){
      this.descriptor.fetch({
        success: _.bind(this.createDashboard, this),
      });

      this.filterView = new FilterView({
        el : $('#dashboard-filter')
      });
      this.filterView.render();

      this.filterView.on('update', _.bind(this.updateBoard, this));
    },

    updateBoard : function(store){
      this.descriptor.store = store;

      this.descriptor.fetch({
        success: _.bind(this.createDashboard, this),
      });
      //TODO: get dashboard descriptor to specific store and refresh view
    },

    createDashboard : function(model, response, options) {
      this.setResumeInfo(response.resume);
      _.each(response.graphs, this.handleGraphCreation, this);
    },

    setResumeInfo: function(resume) {
      $('#answers_total').text(resume.answers_total);
      $('#valid_emails').text(resume.valid_emails);
      $('#interaction_averange').text(resume.interaction_averange);
      $('#first_timers').text(resume.first_timers);
      $('#nps_measure').text(resume.nps_measure);
    },

    handleGraphCreation : function(graph){
      switch (graph.ratingDataType){
        case "nps":
          this.handleNPSGraph(graph);
          break;

        case "email":
          break;

        case "feedback":
          break;

        default:
          this.handlePieChart(graph);
          break;
      }
    },

    handleNPSGraph : function (graph){
      this.NPSDataModel = new DataPoint({
        url : graph.url
      });

      this.NPSDataModel.fetch({
        success: this.createNPSGraph
      });
    },

    createNPSGraph : function(model, response, options) {
     var npsChartView = new ColumnChartView({
        el : $('#nps-graph'),
        name : 'npsChart',
        score : response.data
      });
      npsChartView.render();
    },

    handlePieChart : function(graph){
      var dataModel = new DataPoint({
        url : graph.url + "/count-rating-choices",
        renderTarget : graph.ratingDataType
      });

      dataModel.fetch({
        success: this.createPieGraph,
      });
    },

    createPieGraph : function(model, response, options){
      var elem = $('#'+ model.attributes.renderTarget + '_graph');
      var graphView = new PieChartView({
        el: elem,
        name : model.attributes.renderTarget,
        score: response["data"]
      });
      graphView.render();
    }

  })

})();

