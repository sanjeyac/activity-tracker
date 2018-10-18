const Matcher = require('./matcher.js');

//utils for reduce
function sum(a, b) {
    return a + b;
}


class MatcherSet {

    constructor(name, matchers) {
        this.name = name;
        this.matchers = matchers;
    }

    count(datainstants) {
        if (!this.matchers) {
            return []; //avoid null reference
        }
        return this.matchers
            .map(matcher => matcher.matchCountOf(datainstants))
            .reduce(sum, 0);
    }

    //static factory method
    static create(name,regexList) {
        let matchers = regexList.map( regex => new Matcher(regex));
        return new MatcherSet(name,matchers);
    }

}

module.exports = MatcherSet;