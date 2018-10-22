const Charts = require('./view/charts.js');
const $ = require('jquery');
const moment = require('moment');
const Filters = require('./filters.js');
const DataInstant = require('./models/datainstant.js');
const DataInstantsRepository = require('./repository/datainstants.repository.js');
const MatcherSetRepository = require('./repository/matcherset.repository.js');

let startTime = moment().startOf('day');
let endTime = moment().endOf('day'); 

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

    let date = startTime.format('D MMMM YYYY'); // October 22nd 2018, 7:20:06 am
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

function prevDay(){
    $('#chartsBoxes').html('');
    startTime = startTime.add(-1,'days');
    endTime = endTime.add(-1,'days');
    loadData(startTime, endTime);
}

function nextDay(){
    $('#chartsBoxes').html('');
    var now = moment();

    startTime = startTime.add(1,'days');
    endTime = endTime.add(1,'days');
    loadData(startTime, endTime);
}

function loadData(start,end){
    DataInstantsRepository.getBetween(start.unix(), end.unix()).then( data => {
        // let data = allData.filter( instant => instant.isToday() );
        console.log(startTime,endTime,data)
        if (data.length>0){
            calculateMainKPIfrom(data);
            drawChartsFrom(data);
        }else{
            $('#chartsBoxes').html('');
            let date = startTime.format('D MMMM YYYY'); // October 22nd 2018, 7:20:06 am
            $('#btnChartsDate').html(date);            
        }
    }).catch(err=> console.error(err));
}


// === MAIN 
$('#prevDayBtn').click(prevDay);
$('#nextDayBtn').click(nextDay);
loadData(startTime, endTime);