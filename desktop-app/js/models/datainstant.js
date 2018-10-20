const moment = require('moment');
const startToday = moment().startOf('day');
const endToday = moment().endOf('day'); 

class DataInstant {
    constructor(window,unixtime){
        this.window = window;
        this.unixtime = unixtime;
    }

    isToday(){
        return moment.unix(this.unixtime).isBetween(startToday,endToday);
    }    

    static minOf(instants){
        return instants.map( item => item.unixtime).reduce( (item,acc) => Math.min(item,acc) );
    }

    static maxOf(instants){
        return instants.map( item => item.unixtime).reduce( (item,acc) => Math.max(item,acc) );
    }

}

module.exports = DataInstant;