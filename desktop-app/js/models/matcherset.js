class MatcherSet {

    constructor(name,matchers){
        this.name = name;
        this.matchers = matchers;
    }

    getCounts(datainstants){

        if (!this.matchers){
            return []; //avoid null reference
        }

        return this.matchers.map( matcher => { 
            return {
                name: matcher.name, 
                value: matcher.matchCountOf(datainstants) 
            }
        });
    }    

}

module.exports = MatcherSet;