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

function drawChartsFrom(data){
    let conf = MatcherSetRepository.jsonConf();
    let chartsModels = MatcherSetRepository.getAllFrom(conf);
    var container = $('#chartsBoxes');

    chartsModels
        .map( cm => {
            let domElement = Charts.createChartDiv(container, cm.dom);
            $('#'+domElement).parent().parent().addClass('col-sm-6'); //setup layout
            return { domElement: domElement,  model: cm };
        }).forEach( item => {
            //posticipate chart rendering 
            Charts.drawChartOf( item.model, data, item.domElement );
        });
}

DataInstantsRepository.getAll().then( allData => {
    let data = allData.filter(isToday);
    calculateMainKPIfrom(data);
    drawChartsFrom(data);
}).catch(err=> console.error(err));