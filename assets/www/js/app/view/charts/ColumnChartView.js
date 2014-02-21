window.ColumnChartView = ChartBaseView.extend({

  defaultOptions: {
    chart: {
      type: 'column',
      margin: [ 50, 50, 100, 80]
    },

    title: {
        text: ''
    },

    xAxis: {
        categories: [
            '0','1','2','3','4','5','6','7','8','9','10'
        ],
        labels: {
            align: 'right',
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        },
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
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            x: 4,
            y: 10,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif',
                textShadow: '0 0 3px black'
            },
        },
        colorByPoint: false,
        colors: ['#A4C95A', '#77CEAA', '#5B9CC6', '#5E68C7', '#8F5EC7', '#C75EA6']
    }]
  }

});
