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

    // let duration = moment.duration(lastTime.diff(startTime));
    // let hours = duration.asHours().toFixed(2);    
    let diff = lastTime.diff(startTime)
    let hours = moment.utc(diff).format("H:mm");
    $('#total').html(hours);

    $('#efficency').html('Soon..');
}

function drawChartsFrom(data){

    let windowData = data.map ( item => item.window );
    
    let conf = MatcherSetRepository.jsonConf();
    let chartsModels = MatcherSetRepository.getAllFrom(conf);
    let appChart = chartsModels[0];
    let catChart = chartsModels[1];
    let webChart = chartsModels[2];

    let apps = appChart.drawModel(data);

    Charts.drawPie({
        element: 'appchart',
        labels: apps.labels,
        values: apps.values
    });    

    let categories = catChart.drawModel(data);
    Charts.drawPie({
        element: 'categorychart',
        labels: categories.labels,
        values: categories.values
    });    
    
    let justWebPagesData = data
        .filter( item => Filters.Applications.Firefox(item.window) || Filters.Applications.Chrome(item.window) ) ;

    let webpages = webChart.drawModel(justWebPagesData);

    Charts.drawBars({
        element: 'websitechart',
        labels: webpages.labels,
        values: webpages.values
    });        

}


DataInstantsRepository.getAll().then( allData => {

    let data = allData.filter(isToday);
    console.log("loaded data", data);

    calculateMainKPIfrom(data);
    drawChartsFrom(data);
}).catch(err=> console.log(err));
