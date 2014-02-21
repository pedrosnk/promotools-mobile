window.PieChartView = ChartBaseView.extend({
  defaultOptions: {
    chart: {
      type: 'pie',
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
    },
    title:{
        text: ''
      },
      legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom'
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: false
              },
              showInLegend: true
          }
      },
      credits: {
        enabled: false
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },

      colors: ['#A4C95A', '#77CEAA', '#5B9CC6', '#5E68C7', '#8F5EC7', '#C75EA6'],

        // TODO: fech model data
        series: [{
            type: 'pie',
            name: 'Percentual',
            innerSize: '20%'
        }]
  }
});
