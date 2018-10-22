class ChartDataModel {

    constructor(matcherSets,chartType,domElement, width) {
        this.dom = domElement;
        this.matcherSets = matcherSets;
        this.chartType = chartType;
        this.width = width;
    }

    drawModel(datainstants) {
        console.log(datainstants)
        let labels = this.matcherSets.map( set => set.name );
        let values = this.matcherSets.map( set => set.count(datainstants) );
        return {labels,values};
    }
}

module.exports = ChartDataModel;