const DB = require('./js/db.js');
const Charts = require('./js/charts.js');
const $ = require('jquery');
const moment = require('moment');
const startToday = moment().startOf('day');
const endToday = moment().endOf('day'); 

function isVisualStudio(input){
    return input.window.indexOf("Visual Studio")>1;
}

function isTerminal(input){
    return input.window.indexOf("terminal")>1;
}

function isFirefox(input){
    return input.window.indexOf("Firefox")>1;
}

function isChrome(input){
    return input.window.indexOf("Chrome")>1;
}

function isToday(input){
    return moment.unix(input.unixtime).isBetween(startToday,endToday);

}

DB.getDataFromDB().then( data => {

    let vscode = data.filter(isVisualStudio).length;
    let terminal = data.filter(isTerminal).length;
    let firefox = data.filter(isFirefox).length;
    let chrome = data.filter(isChrome).length;

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


    Charts.drawPie({
        element: 'appchart',
        labels: ['Visual Studio', 'Terminal',  'Firefox', 'Chrome'],
        values: [vscode,terminal,firefox,chrome]
    });    

}).catch(err=> console.error(err));


