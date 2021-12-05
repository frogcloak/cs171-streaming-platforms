// let pieHeight = document.getElementById('typePrime').clientHeight * 0.8;
// let rScale = d3.scaleLinear()
//     .range([pieHeight * 0.5, pieHeight]);

loadPie();

function loadPie() {
    d3.csv("data/all_count.csv"). then(csv=>{

        // prepare data
        let data = csv
        let rankedID = ["Prime", "Netflix", "Hulu", "Disney", "HBO"];
        let types = [];
        let genres = [];
        let ratings = [];
        rankedID.forEach(function(d) {
            types.push("type"+d);
            genres.push("genre"+d);
            ratings.push("rating"+d)
        })
        let defaultGenres = ["Drama", "Drama", "Drama", "Comedy", "Drama"]

        let rScale = d3.scaleLinear();
        rScale.domain([Math.min.apply(Math, data.map(function(d) { return d.total; })),
            Math.max.apply(Math, data.map(function(d) { return d.total; }))]);

        data.forEach(function(d,i) {
                new PieChart(types[i], d, ["movie"], rankedID[i], rScale, "TV show");
                new PieChart(ratings[i], d, ["G/TV-G", "PG/TV-PG", "PG-13/TV-14", "R/TV-MA"], rankedID[i], rScale, "");
            }
        )


    });
}




class PieChart {

    // constructor method to initialize Timeline object
    constructor(parentElement, data, key, title, rScale, not_lab) {
        this.parentElement = parentElement;
        this.data = data;
        this.key = key;
        this.title = title;
        this.rScale = rScale;
        this.not_lab = not_lab;
        this.grayColors = ["#d9d9d9","#bdbdbd","#969696","#636363","#252525"];
        this.highlight = '#B58659'
        this.highlight2 = '#2b4d72'
        this.platformColors = {
            "Netflix": "#CF3038",
            "Hulu": '#62bc51',
            "Prime Video":  '#faa223',
            "Disney+": '#0279ad',
            "HBO": '#bb2b77'}
        this.platformColors2 = {
            "Netflix": '#d87777',
            "Hulu": '#81ebb6',
            "Prime Video": '#fbcb8a',
            "Disney+": '#81e2eb',
            "HBO": '#caabeb'}

        // call initVis method
        this.initVis()
    }

    initVis() {
        let vis = this;

        // margin conventions
        vis.margin = {top: 10, right: 30, bottom: 10, left: 30};
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        // init drawing area

        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

        // Pie chart settings
        let minScale = Math.min(vis.height, vis.width)
        vis.rScale.range([minScale * 0.2, minScale * 0.39])

        vis.outerRadius = vis.rScale(vis.data.total);
        vis.innerRadius = 0; //TODO: double check

        vis.svg.append('circle')
            .attr('r', (vis.outerRadius * 1.08))
            .attr('fill', vis.platformColors2[vis.data.platform])
            .attr("transform", "translate(" + vis.width / 2 + "," + vis.height / 2 + ")");

        // add title
        if (vis.title !== "") {
            vis.svg.append('g')
                .attr('class', 'title pie-title')
                .append('text')
                .text(vis.data.platform)
                .attr('transform', `translate(${vis.width / 2}, 20)`)
                .attr('text-anchor', 'middle')
                .attr('class', 'pie-title')
        }

        // pie chart setup
        vis.pieChartGroup = vis.svg
            .append('g')
            .attr('class', 'pie-chart')
            .attr("transform", "translate(" + vis.width / 2 + "," + vis.height / 2 + ")");

        // Define a default pie layout
        vis.pie = d3.pie();

        // Path generator for the pie segments
        vis.arc = d3.arc()
            .innerRadius(vis.innerRadius)
            .outerRadius(vis.outerRadius);

        // Add in tooltip
        vis.tooltip = d3.select("body").append('div')
            .attr('class', "tooltip")
            .attr('id', 'pieTooltip')

        // call next method in pipeline
        this.wrangleData();
    }

    // wrangleData method
    wrangleData() {
        let vis = this

        vis.displayData = []

        vis.key.forEach(function (d) {
            vis.displayData.push(vis.data[d]);
        });

        if (vis.key.length === 1){
            vis.displayData.push((vis.data.total - vis.data[vis.key[0]]).toString());
        }

        // console.log(vis.displayData)
        // console.log(vis.rankedKeys)

        vis.updateVis()
    }

    // updateVis method
    updateVis() {
        let vis = this;

        // Bind data
        vis.arcs = vis.pieChartGroup.selectAll(".arc")
            .data(vis.pie(vis.displayData))

        vis.displayColor = {}

        vis.rest = 0;
        if (vis.key.length === 1) {
            vis.rest = vis.data.total;
            vis.displayColor[vis.key[0]] = vis.grayColors[2];
            vis.displayColor[vis.not_lab] = vis.grayColors[4];
        }
        else {
            vis.rest = vis.displayData.reduce((a,b) => parseInt(a)+parseInt(b));

            for (let i=0; i<vis.key.length; i++) {
                let d = vis.key[i];
                console.log(d);
                vis.displayColor[d] = vis.grayColors[i+1]
            }

        }

        vis.keytips = vis.key.concat([vis.not_lab])
        console.log(vis.keytips)

        // Append paths
        vis.arcs.enter()
            .append("path")
            .attr("d", vis.arc)
            .attr("fill",function(d) {
                return vis.displayColor[Object.keys(vis.data).find(key => (vis.data[key] === d.data) & vis.keytips.includes(key))]
            })
            .merge(vis.arcs)
            .on('mouseover', function(event, d){
                d3.select(this)
                    .attr('fill', vis.platformColors[vis.data.platform])
                console.log(d)

                vis.tooltip
                    .style("opacity", 1)
                    .style("left", event.pageX + 20 + "px")
                    .style("top", event.pageY + "px")
                    .html(`
                <div style="border: thin solid grey; border-radius: 5px; background: #fcf6ef; padding: .5em">
                     <p class="pie-tool-title"> ${Object.keys(vis.data).find(key => (vis.data[key] === d.data) & vis.keytips.includes(key))} <\p>
                     <p class="pie-tool-content"> Count: ${d.value}<br>      
                     Percentage: ${(d.value / vis.rest * 100).toFixed(1)}%</p>                         
                </div>`);
            })
            .on('mouseout', function(event, d){
                d3.select(this)
                    .attr('fill', function(d) {
                        return vis.displayColor[Object.keys(vis.data).find(key => (vis.data[key] === d.data) & vis.key.includes(key))]
                    })

                vis.tooltip
                    .style("opacity", 0)
                    .style("left", 0)
                    .style("top", 0)
                    .html(``);
            })

    }
}