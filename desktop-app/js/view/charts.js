var Chart = require('chart.js');
const $ = require('jquery');

const BG_COLORS = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)'
];

const FG_COLORS = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)'
];

//utility
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

//grouping utility
function groupByTwo(array){
  return array.reduce( function(acc,item){
    if (acc.length == 0){
      acc.push([item]);
      return acc;
    }
    var lastElement = acc[acc.length-1];
    if ( lastElement.length < 2 ){
      lastElement.push(item);
      return acc;
    }
    acc.push([item]);
    return acc;
  }, [] )  
}

function draw(options) {
  var ctx = document.getElementById(options.element).getContext('2d');
  return new Chart(ctx, {
    type: options.type,
    data: {
      labels: options.labels,
      datasets: [{
        data: options.values,
        backgroundColor: BG_COLORS,
        borderColor: FG_COLORS,
        borderWidth: 1
      }]
    },
    options: {
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          display: false
        }]
      }
    }
  });
}

function createChartDiv(parentDiv, name) {
  let chart_id = "chart_" + makeid();
  let chart = $(`
      <div>
          <div class="card chart">
              <label class="name">${name}</label>
              <canvas id="${chart_id}" class="chart" style="width:100%;height:150px"></canvas>
          </div>
      </div>
  `);
  $(parentDiv).append(chart);
  return chart_id;

}

function drawChartOf(chartModel, instants, elementId) {
  let data = chartModel.drawModel(instants);

  let options = {
    type: 'pie',
    element: elementId,
    labels: data.labels,
    values: data.values
  }
  if (chartModel.chartType == "bars") {
    options.type = 'bar';
  } 
  draw(options); 

}

module.exports = {
  createChartDiv: createChartDiv,
  drawChartOf: drawChartOf
}