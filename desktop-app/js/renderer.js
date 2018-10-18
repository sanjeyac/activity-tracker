const DB = require('./db.js');
const Charts = require('./charts.js');
const $ = require('jquery');
const moment = require('moment');
const Filters = require('./filters.js');
const startToday = moment().startOf('day');
const endToday = moment().endOf('day'); 

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
    let apps = Filters.with( Filters.Applications , windowData);

    Charts.drawPie({
        element: 'appchart',
        labels: apps.labels,
        values: apps.values
    });    

    let categories = Filters.with( Filters.Categories , windowData);
    Charts.drawPie({
        element: 'categorychart',
        labels: categories.labels,
        values: categories.values
    });    
    
    let justWebPagesData = data
        .map( item => item.window )
        .filter( item => Filters.Applications.Firefox(item) || Filters.Applications.Chrome(item) ) ;
    let webpages = Filters.with( Filters.WebPages , justWebPagesData);

    Charts.drawBars({
        element: 'websitechart',
        labels: webpages.labels,
        values: webpages.values
    });        

}


DB.getDataFromDB().then( allData => {

    let data = allData.filter(isToday);

    calculateMainKPIfrom(data);
    drawChartsFrom(data);
}).catch(err=> console.log(err));
