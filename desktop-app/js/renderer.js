const Charts = require('./view/charts.js');
const $ = require('jquery');
const moment = require('moment');
const Filters = require('./filters.js');
const startToday = moment().startOf('day');
const endToday = moment().endOf('day'); 
const DataInstantsRepository = require('./repository/datainstants.repository.js');
const MatcherSetRepository = require('./repository/matcherset.repository.js');

function isToday(input){
    return moment.unix(input.unixtime).isBetween(startToday,endToday);
}

function calculateMainKPIfrom(data){
    let start = data.map( item => item.unixtime).reduce( (item,acc) => Math.min(item,acc) );
    let startTime = moment.unix(start);
    let last = data.map( item => item.unixtime).reduce( (item,acc) => Math.max(item,acc) );
    let lastTime = moment.unix(last);    
    $('#startTime').html(startTime.format("HH:mm"));
    $('#lastTime').html(lastTime.format("HH:mm"));
    let diff = lastTime.diff(startTime)
    let hours = moment.utc(diff).format("H:mm");
    $('#total').html(hours);
    $('#efficency').html('Soon..');
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

function drawChartsFrom(data){
    let conf = MatcherSetRepository.jsonConf();
    let chartsModels = MatcherSetRepository.getAllFrom(conf);
    $('#chartsBoxes').append('<div class="row top-spaced" id="ch_row"></div>');

    groupByTwo(chartsModels)
        .forEach( (couple, index) => {
            let row = $(`<div class="row top-spaced" id="row_${index}"></div>`);
            $('#chartsBoxes').append(row);

            let id0 = null;
            let id1 = null;

            if(couple[0]){
                id0 = Charts.createChartDiv(`#row_${index}`,couple[0].dom);
            }
            if(couple[1]){
                id1 = Charts.createChartDiv(`#row_${index}`,couple[1].dom);
            }
            if(id0){
                Charts.drawChartOf(couple[0],data,id0);
            }
            if(id1){
                Charts.drawChartOf(couple[1],data,id1);
            }            
        });
    
}

DataInstantsRepository.getAll().then( allData => {
    let data = allData.filter(isToday);
    calculateMainKPIfrom(data);
    drawChartsFrom(data);
}).catch(err=> console.error(err));