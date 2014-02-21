window.GenderChartView = ChartBaseView.extend({
  defaultOptions: {
    chart: {
      type: 'column',
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
        name: 'Porcentagem',
        dataLabels: {
            enabled: false,
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
        colorByPoint: true,
        colors: ['#0032FA', '#FF4747']
    }],
    tooltip: {
        pointFormat: '{series.name}: <b>{point.y}%</b>'
    },
  }
});

