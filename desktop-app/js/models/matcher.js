class Matcher{

    constructor(regex, name){
        this.regex = regex;
        this.name = name; //optional
    }

    match(instant){
        if (this.regex){ //force string type check
            let patt = new RegExp(this.regex);
            return patt.test(instant.window);
        }
        return false;
    }

    matchCountOf(datainstants){
        let that = this;
        return datainstants.filter( instant => that.match(instant) ).length;
    }

}

module.exports = Matcher;