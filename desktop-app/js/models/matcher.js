class Matcher{

    constructor(regex, name){
        this.name = name;
        this.regex = regex;
    }

    match(instant){
        let patt = new RegExp(this.regex);
        return patt.test(instant.window);
    }

    matchCountOf(datainstants){
        return datainstants.filter( this.match ).length;
    }

}

module.exports = Matcher;