const DB = require('./js/db.js');
const Charts = require('./js/charts.js');
const $ = require('jquery');
const moment = require('moment');
const Filters = require('./js/filters.js');
const startToday = moment().startOf('day');
const endToday = moment().endOf('day'); 

function isToday(input){
    return moment.unix(input.unixtime).isBetween(startToday,endToday);
}

DB.getDataFromDB().then( data => {

    // let isToday = Filters.Time.today;

    let start = data.filter(isToday).map( item => item.unixtime).reduce( (item,acc) => Math.min(item,acc) );
    let startTime = moment.unix(start);

    let last = data.filter(isToday).map( item => item.unixtime).reduce( (item,acc) => Math.max(item,acc) );
    let lastTime = moment.unix(last);    

    $('#startTime').html(startTime.format("HH:mm"));
    $('#lastTime').html(lastTime.format("HH:mm"));

    let duration = moment.duration(lastTime.diff(startTime));
    let hours = duration.asHours().toFixed(2);    
    $('#total').html(hours);

    $('#efficency').html('Soon..');

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
    
    let windowWebpagesData = data
        .map( item => item.window )
        .filter( item => Filters.Applications.Firefox(item) || Filters.Applications.Chrome(item) ) ;
    let webpages = Filters.with( Filters.WebPages , windowWebpagesData);

    Charts.drawBars({
        element: 'websitechart',
        labels: webpages.labels,
        values: webpages.values
    });        

}).catch(err=> console.log(err));


