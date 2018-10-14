var Chartist = require('../lib/chartist.min.js');

function drawPie(data, element){
      
    var options = {
      labelInterpolationFnc: function(value) {
        return value[0]
      }
    };
    
    var responsiveOptions = [
      ['screen and (min-width: 640px)', {
        chartPadding: 30,
        labelOffset: 100,
        labelDirection: 'explode',
        labelInterpolationFnc: function(value) {
          return value;
        }
      }],
      ['screen and (min-width: 1024px)', {
        labelOffset: 80,
        chartPadding: 20
      }]
    ];
    
    new Chartist.Pie(element, data, options, responsiveOptions);
}

module.exports = {
    drawPie: drawPie
}