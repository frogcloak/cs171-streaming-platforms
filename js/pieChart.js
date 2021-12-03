class PieChart {

    // constructor method to initialize Timeline object
    constructor(parentElement, distData) {
        this.parentElement = parentElement;
        this.data = distData;
        this.grayColors = ['#6A6A6A', '#3C3C3C'];
        this.highlight = '#B58659'
        this.highlight2 = '#2b4d72'
        this.platformColors = ['#B10000', '#3EEB94', '#FBAB3F', '#00D8EB', '#7A1FE0']
        this.platformColors2 = ['#d86161', '#81ebb6', '#fbcb8a', '#81e2eb', '#81e2eb']

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

        // add title
        vis.svg.append('g')
            .attr('class', 'title pie-title')
            .append('text')
            .text('Title for Pie Chart')
            .attr('transform', `translate(${vis.width / 2}, 20)`)
            .attr('text-anchor', 'middle')
            .attr('class', 'pie-title')

        // pie chart setup
        vis.pieChartGroup = vis.svg
            .append('g')
            .attr('class', 'pie-chart')
            .attr("transform", "translate(" + vis.width / 2 + "," + vis.height / 2 + ")");

        // Define a default pie layout
        vis.pie = d3.pie();

        // Pie chart settings
        vis.outerRadius = vis.height / 2.5;
        vis.innerRadius = vis.outerRadius * 0.6; //TODO: double check

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

        // generate random data
        for (let i = 0; i < 4; i++) {
            let random = Math.floor(Math.random() * 100)
            vis.displayData.push({
                value: random,
                color: vis.color[i]
            })
        }

        vis.updateVis()
    }

    // updateVis method
    updateVis() {
        let vis = this;

        console.log(vis.displayData)

        vis.data = []
        vis.displayData.forEach(d => vis.data.push(d.value))

        // Bind data
        vis.arcs = vis.pieChartGroup.selectAll(".arc")
            .data(vis.pie(vis.data))

        // Append paths
        vis.arcs.enter()
            .append("path")
            .attr("d", vis.arc)
            .style("fill", function(d, index) { return vis.color(index); })
            .merge(vis.arcs)
            .on('mouseover', function(event, d){
                d3.select(this)
                    .attr('stroke-width', '2px')
                    .attr('stroke', 'black')
                    .attr('fill', 'rgba(173,222,255,0.62)')

                vis.tooltip
                    .style("opacity", 1)
                    .style("left", event.pageX + 20 + "px")
                    .style("top", event.pageY + "px")
                    .html(`
                <div style="border: thin solid grey; border-radius: 5px; background: lightgrey; padding: 20px">
                     <h3>Arc with index #${d.index}<h3>
                     <h4> value: ${d.value}</h4>      
                     <h4> startAngle: ${d.startAngle}</h4> 
                     <h4> endAngle: ${d.endAngle}</h4>   
                     <h4> data: ${JSON.stringify(d.data)}</h4>                         
                </div>`);
            })
            .on('mouseout', function(event, d){
                d3.select(this)
                    .attr('stroke-width', '0px')
                    .attr("fill", d => d.data.color)

                vis.tooltip
                    .style("opacity", 0)
                    .style("left", 0)
                    .style("top", 0)
                    .html(``);
            })
    }
}