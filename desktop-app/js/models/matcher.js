class Matcher{

    constructor(regex, name){
        this.regex = regex;
        this.name = name; //optional
    }

    match(instant){
        if (this.regex){ //force string type check            
            let patt = this.toRegex(this.regex);
            return patt.test(instant.window);
        }
        return false;
    }

    matchCountOf(datainstants){
        let that = this;
        return datainstants.filter( instant => that.match(instant) ).length;
    }

    toRegex(regex){
        if (typeof(regex)==='object'){
            return new RegExp(regex);
        }else{
            var match = regex.match(new RegExp('^/(.*?)/([gimy]*)$'));
            if (match){
                return new RegExp(match[1], match[2]);     
            }else{
                return new RegExp(regex);     
            }
        }
    }

}

module.exports = Matcher;