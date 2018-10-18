class Matcher{

    constructor(name, regex){
        this.name = name;
        this.regex = regex;
    }

    match(instant){
        var patt = new RegExp(this.regex);
        return patt.test(instant.window);
    }

    matchCountOf(datainstants){
        return datainstants.filter( this.match ).length;
    }

}

module.exports = Matcher;