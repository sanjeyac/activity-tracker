const DB = require('./js/db.js');
const Charts = require('./js/charts.js');
const $ = require('jquery');
const moment = require('moment');
const Filters = require('./js/filters.js');
const KPI = require('./js/kpis.js');
const startToday = moment().startOf('day');
const endToday = moment().endOf('day'); 

function isToday(input){
    return moment.unix(input.unixtime).isBetween(startToday,endToday);
}


function calculateMainKPIfrom(data){
    let kpi = KPI.kpi(data.map( item => item.unixtime) );
    $('#startTime').html(kpi.startTime.format("HH:mm"));
    $('#lastTime').html(kpi.lastTime.format("HH:mm"));
    $('#total').html(kpi.hours);
    $('#efficiency').html(kpi.efficiency);
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


DB.getDataFromDB().then( data => {
    calculateMainKPIfrom(data);
    drawChartsFrom(data);
}).catch(err=> console.log(err));
