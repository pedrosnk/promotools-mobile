window.BarChartView = ChartBaseView.extend({
  defaultOptions: {
    chart: {
      type: 'bar',
      margin: [ 50, 50, 100, 80]
    },

    title: {
        text: ''
    },

    xAxis: {
      title: {
        text: null
       }
    },
    yAxis: {
        min: 0,
        title: {
            text: ' '
        }
    },
    legend: {
        enabled: false
    },

    credits: {
      enabled: false
    },

    series: [{
        name: 'Avaliação',
        dataLabels: {
            enabled: true,
            color: '#FFFFFF',
            align: 'right',
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif',
                textShadow: '0 0 3px black'
            },
        },
        colorByPoint: true,
        colors: ['#A4C95A', '#77CEAA', '#5B9CC6', '#5E68C7', '#8F5EC7', '#C75EA6']
    }]
  }
});

