const Charts = require('./view/charts.js');
const $ = require('jquery');
const moment = require('moment');
const Filters = require('./filters.js');
const startToday = moment().startOf('day');
const endToday = moment().endOf('day'); 
const DataInstant = require('./models/datainstant.js');
const DataInstantsRepository = require('./repository/datainstants.repository.js');
const MatcherSetRepository = require('./repository/matcherset.repository.js');

let date = moment();

function calculateMainKPIfrom(data){
    let startTime = moment.unix( DataInstant.minOf(data) );
    let lastTime = moment.unix( DataInstant.maxOf(data) );    
    $('#startTime').html(startTime.format("HH:mm"));
    $('#lastTime').html(lastTime.format("HH:mm"));
    let diff = lastTime.diff(startTime)
    let hours = moment.utc(diff).format("H:mm");
    $('#total').html(hours);
    $('#efficency').html('Soon..');

    let date = moment().format(' D MMMM YYYY'); // October 22nd 2018, 7:20:06 am
    $('#btnChartsDate').html(date);

}

function drawChartsFrom(data){
    let conf = MatcherSetRepository.jsonConf();
    let chartsModels = MatcherSetRepository.getAllFrom(conf);
    var container = $('#chartsBoxes');

    chartsModels
        .map( (cm, index) => {
            let domElement = Charts.createChartDiv(container, cm.dom);
            console.log(cm)
            if (cm.width){
                $('#'+domElement).parent().parent().addClass('col-sm-'+cm.width); //setup layout
            }else{
                $('#'+domElement).parent().parent().addClass('col-sm-6'); //setup layout
            }
            $('#'+domElement).parent().parent().addClass('chartbox-margin');
            
            return { domElement: domElement,  model: cm };
        }).forEach( item => {
            //posticipate chart rendering 
            Charts.drawChartOf( item.model, data, item.domElement );
        });
}


// === MAIN 
DataInstantsRepository.getAll().then( allData => {
    let data = allData.filter( instant => instant.isToday() );
    calculateMainKPIfrom(data);
    drawChartsFrom(data);
}).catch(err=> console.error(err));