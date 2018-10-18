//utils for reduce
function sum(a, b) {
    return a + b;
}


class MatcherSet {

    constructor(name,matchers){
        this.name = name;
        this.matchers = matchers;
    }

    count(datainstants){

        if (!this.matchers){
            return []; //avoid null reference
        }

        return this.matchers
                    .map( matcher => matcher.matchCountOf(datainstants) )
                    .reduce(sum,0);
    }    

}

module.exports = MatcherSet;