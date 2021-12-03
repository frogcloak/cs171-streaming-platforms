d3.csv("data/.csv").then(data => {
    // * TO-DO *
    data.forEach(function(d){
        d.survey = parseDate(d.survey)
    });

    // note that I opted to use a grouped list in the html to implement the bar charts, so they are plotted separately instead of together
    ownChart = new BarChart("bar-chart-own", data, configs[0]);
    elecChart = new BarChart("bar-chart-elec", data, configs[1]);
    latrineChart = new BarChart("bar-chart-latrine", data, configs[2]);
    religionChart = new BarChart("bar-chart-religion", data, configs[3]);

    let countDataByDay = Array.from(d3.rollup(data,leaves=>leaves.length,d=>d.survey),
        ([key, value]) => ({key, value})).sort(function (a, b) {
        return a.key - b.key});

    areachart = new AreaChart("area-chart", countDataByDay);


});