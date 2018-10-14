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

function isToday(unixtime){
    return moment.unix(unixtime).isBetween(startToday,endToday);

}

DB.getDataFromDB().then( data => {

    // var todaysData = data.filter(isToday);
    // var minHour = todaysData.reduce( (item,acc) => acc = Math.min(item.unixtime,acc) );
    // var maxHour = todaysData.reduce( (item,acc) => acc = Math.max(item.unixtime,acc) );
    // $('#oraInizio').html(minHour.toString());
    // $('#oraFine').html(minHour.toString());

    var vscode = data.filter(isVisualStudio).length;
    var terminal = data.filter(isTerminal).length;
    var firefox = data.filter(isFirefox).length;
    var chrome = data.filter(isChrome).length;

    Charts.drawPie({
        labels: ['Visual Studio', 'Terminal',  'Firefox', 'Chrome'],
        series: [vscode,terminal,firefox,chrome]
    },'#ct-chart1');

    Charts.drawPie({
        labels: ['Visual Studio', 'Terminal',  'Firefox', 'Chrome'],
        series: [vscode,terminal,firefox,chrome]
    },'#ct-chart2');    

});
