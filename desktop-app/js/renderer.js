const Charts = require('./view/charts.js');
const $ = require('jquery');
const moment = require('moment');
const Filters = require('./filters.js');
const startToday = moment().startOf('day');
const endToday = moment().endOf('day'); 
const DataInstant = require('./models/datainstant.js');
const DataInstantsRepository = require('./repository/datainstants.repository.js');
const MatcherSetRepository = require('./repository/matcherset.repository.js');

function calculateMainKPIfrom(data){
    let startTime = moment.unix( DataInstant.minOf(data) );
    let lastTime = moment.unix( DataInstant.maxOf(data) );    
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
    let data = allData.filter( instant => instant.isToday() );
    calculateMainKPIfrom(data);
    drawChartsFrom(data);
}).catch(err=> console.error(err));