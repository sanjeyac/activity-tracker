class ChartDataModel {

    constructor(domElement,matcherSet,chartType) {
        this.dom = domElement;
        this.matcherSet = matcherSet;
        this.chartType = chartType;
    }

    drawModel(datainstants) {
        let data = matcherSet.getCounts(datainstants);
        let labels = data.map( item => item.name );
        let values = data.map( item => item.value );
        return {labels,values};
    }
}

module.exports = ChartDataModel;