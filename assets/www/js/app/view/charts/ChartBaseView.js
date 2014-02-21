window.ChartBaseView = Backbone.View.extend({

  defaultOptions: {
    chart: {}
  },

  initialize: function(options) {
    this.options = jQuery.extend(true, {}, this.defaultOptions, options);
    this.options.chart.renderTo = this.el;
    this.options.series[0].data = this.options.score;
  },

  render: function(){
    // Destroy previous chart
    //if @chart then @chart.destroy()

    if(this.model){
      this.defaultOptions.series = [this.model.toJSON()]
    }
    else if (this.collection){
      if (this.collection instanceof Series){
        this.defaultOptions.series = this.collection.options[0]
      }
      else{
        this.defaultOptions.series = this.collection.toJSON();
      }
    }

    this.chart = new Highcharts.Chart(this.options);
    return this
  }

});
