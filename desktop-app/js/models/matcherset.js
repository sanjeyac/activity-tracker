export default class MatcherSet {

    constructor(name,matchers){
        this.name = name;
        this.matchers = matchers;
    }

    getCounts(datainstants){
        return matchers.map( matcher => { 
            return {
                name: matcher.name, 
                value: matcher.matchCountOf(datainstants) 
            }
        });
    }    

}
