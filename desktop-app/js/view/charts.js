var Chart = require('chart.js');
const $ = require('jquery');

function drawPie(options) {
  var ctx = document.getElementById(options.element).getContext('2d');
  return new Chart(ctx, {
    type: 'pie',
    data: {
      labels: options.labels,
      datasets: [{
        data: options.values,
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
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

function drawBars(options) {
  var ctx = document.getElementById(options.element).getContext('2d');
  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: options.labels,
      datasets: [{
        data: options.values,
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function createChartBox(){
  const div = `
    <div class="row top-spaced">
      <div class="col">
        <div class="card chart">
          <label class="name">Applications</label>
          <canvas class="chart" style="width:100%;height:150px"></canvas>
        </div>
      </div>
    </div>  
  `;
  return $(div);
}

module.exports = {
  drawPie: drawPie,
  drawBars: drawBars
}