const moment = require('moment');

const startToday = moment().startOf('day');
const endToday = moment().endOf('day'); 

function contains(value){
    return function(input){
        return input.toLowerCase().indexOf(value.toLowerCase())>1;
    }
}

module.exports = {
    
    Time : {
        today: function(input){
            return moment.unix(unixtime).isBetween(startToday,endToday);
        }
    },

    Applications : {
        "Visual Studio Code": contains("Visual Studio"),
        "Firefox": contains("Firefox"),
        "Chrome": contains("Chrome"),
        "Terminal": contains("Terminal")
    },

    Categories : {
        "Development": contains("Visual Studio"),
        "Social": contains("Facebook"),
        "Mail": contains("Inbox")
    },   
    
    WebPages : {
        "Facebook": contains("facebook"),
        "Firefox": contains("Firefox"),
        "Chrome": contains("Chrome"),
        "Terminal": contains("Terminal")
    },    

    with : function(filters,data){
        let labels = [];
        let values = [];
        for (var filter in filters) {
            if (filters.hasOwnProperty(filter)) {
                let filterFunction = filters[filter];
                let value = data.filter(filterFunction).length;
                console.log( "filter faunction ", filter, value)
                labels.push(filter);
                values.push(value);
            }
        }
        return { values, labels };
    }

}