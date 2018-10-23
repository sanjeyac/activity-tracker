const Charts = require('./view/charts.js');
const $ = require('jquery');
const moment = require('moment');
const Filters = require('./filters.js');
const DataInstant = require('./models/datainstant.js');
const DataInstantsRepository = require('./repository/datainstants.repository.js');
const MatcherSetRepository = require('./repository/matcherset.repository.js');

//date
let startTime = moment().startOf('day');
let endTime = moment().endOf('day'); 
let date = moment();
const today = moment();


//ui elements
const lblStartTime = $('#startTime');
const lblLastTime = $('#lastTime');
const lblTotal = $('#total');
const lblEfficency = $('#efficency');
const btnChartsDate = $('#btnChartsDate');
const btnPrevDay = $('#prevDayBtn');
const btnNextDay = $('#nextDayBtn');
const divChartBoxes = $('#chartsBoxes');

function calculateMainKPIfrom(data){
    let startTime = moment.unix( DataInstant.minOf(data) );
    let lastTime = moment.unix( DataInstant.maxOf(data) );    
    lblStartTime.html(startTime.format("HH:mm"));
    lblLastTime.html(lastTime.format("HH:mm"));
    let diff = lastTime.diff(startTime)
    let hours = moment.utc(diff).format("H:mm");
    lblTotal.html(hours);
    lblEfficency.html('Soon..');
    let date = startTime.format('D MMMM YYYY'); // October 22nd 2018, 7:20:06 am
    btnChartsDate.html(date);
}

function clear(){
    lblTotal.html('N.D.');
    $('#efficency').html('Soon..');
    lblStartTime.html('N.D.');
    lblLastTime.html('N.D.');   
    let date = startTime.format('D MMMM YYYY'); // October 22nd 2018, 7:20:06 am
    btnChartsDate.html(date);   
    divChartBoxes.html('<div class="no-data">NO DATA</div>');
}

function drawChartsFrom(data){
    let conf = MatcherSetRepository.jsonConf();
    let chartsModels = MatcherSetRepository.getAllFrom(conf);
    var container = divChartBoxes;

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
    divChartBoxes.html('');
    startTime = startTime.add(-1,'days');
    endTime = endTime.add(-1,'days');
    loadData(startTime, endTime);
}

function nextDay(){
    divChartBoxes.html('');
    startTime = startTime.add(1,'days');
    endTime = endTime.add(1,'days');
    loadData(startTime, endTime);
}

function loadData(start,end){
    DataInstantsRepository.getBetween(start.unix(), end.unix()).then( data => {
        if (data.length>0){
            calculateMainKPIfrom(data);
            drawChartsFrom(data);
        }else{
            clear();           
        }
    }).catch(err=> console.error(err));
}


// === MAIN 
btnPrevDay.click(prevDay);
btnNextDay.click(nextDay);
loadData(startTime, endTime);