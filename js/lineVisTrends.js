class LineVisTrends {

    constructor(parentElement, trendsData) {
        this.parentElement = parentElement;
        this.data = trendsData;
        this.displayData = []

        this.colors = {
            'netflix':'#cf3038',
            'prime': '#faa223',
            'disney': '#0279ad',
            'hulu': '#62bc51',
            'hbo': '#bb2b77',
            'gray': '#bebebe'
        }

        this.initVis()
        this.attachHandlers()
    }

    attachHandlers(){
        document.getElementById('squidgame').addEventListener("mouseover", e => {
            this.grayOut(".squid-circles", ".squid-line", "netflix")
        })
        document.getElementById('ryan').addEventListener("mouseover", e => {
            this.grayOut(".ryan-circles", ".ryan-line", "prime")
        })
        document.getElementById('mando').addEventListener("mouseover", e => {
            this.grayOut(".mando-circles", ".mando-line", "disney")
        })
        document.getElementById('handmaid').addEventListener("mouseover", e => {
            this.grayOut(".handmaid-circles", ".handmaid-line", "hulu")
        })
        document.getElementById('flight').addEventListener("mouseover", e => {
            this.grayOut(".flight-circles", ".flight-line", "hbo")
        })
        document.getElementById('squidgame').addEventListener("mouseout", e => {
            this.mouseOut()
        })
        document.getElementById('ryan').addEventListener("mouseout", e => {
            this.mouseOut()
        })
        document.getElementById('mando').addEventListener("mouseout", e => {
            this.mouseOut()
        })
        document.getElementById('handmaid').addEventListener("mouseout", e => {
            this.mouseOut()
        })
        document.getElementById('flight').addEventListener("mouseout", e => {
            this.mouseOut()
        })
    }

    grayOut(circles, lines, platformColor){
        this.svg.selectAll(".squid-circles").attr("fill",this.colors.gray)
        this.svg.selectAll(".mando-circles").attr("fill",this.colors.gray)
        this.svg.selectAll(".ryan-circles").attr("fill",this.colors.gray)
        this.svg.selectAll(".handmaid-circles").attr("fill",this.colors.gray)
        this.svg.selectAll(".flight-circles").attr("fill",this.colors.gray)
        this.svg.selectAll(".handmaid-line").attr("stroke", this.colors.gray)
        this.svg.selectAll(".flight-line").attr("stroke",this.colors.gray)
        this.svg.selectAll(".squid-line").attr("stroke", this.colors.gray)
        this.svg.selectAll(".ryan-line").attr("stroke",this.colors.gray)
        this.svg.selectAll(".mando-line").attr("stroke",this.colors.gray)
        this.svg.selectAll(lines).attr("stroke",this.colors[platformColor])
        this.svg.selectAll(circles).attr("fill",this.colors[platformColor])
    }

    mouseOut(){
        this.svg.selectAll(".squid-circles").attr("fill",this.colors.netflix)
        this.svg.selectAll(".ryan-circles").attr("fill",this.colors.prime)
        this.svg.selectAll(".mando-circles").attr("fill",this.colors.disney)
        this.svg.selectAll(".handmaid-circles").attr("fill",this.colors.hulu)
        this.svg.selectAll(".flight-circles").attr("fill",this.colors.hbo)
        this.svg.selectAll(".squid-line").attr("stroke",this.colors.netflix)
        this.svg.selectAll(".ryan-line").attr("stroke",this.colors.prime)
        this.svg.selectAll(".mando-line").attr("stroke", this.colors.disney)
        this.svg.selectAll(".handmaid-line").attr("stroke", this.colors.hulu)
        this.svg.selectAll(".flight-line").attr("stroke",this.colors.hbo)
    }


    initVis(){
        let vis = this;

        vis.margin = {
            'top':30,
            'bottom': 50,
            'left': 60,
            'right': 30
        };
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        // vis.width = 700 - vis.margin.left - vis.margin.right;
        // vis.height = 400 - vis.margin.top - vis.margin.bottom;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

        // set the ranges
        vis.x = d3.scaleLinear().range([0, vis.width]);
        vis.y = d3.scaleLinear().range([vis.height, 0]);


        vis.xAxis = d3.axisBottom()
            .scale(vis.x)
            .tickFormat(d3.format("d"))

        vis.yAxis = d3.axisLeft()
            .scale(vis.y)

        vis.xAxisGroup = vis.svg.append("g")
            .attr("class", "x-axis axis")
            .attr("transform", "translate(0," + vis.height + ")")

        vis.yAxisGroup = vis.svg.append("g")
            .attr("class", "y-axis axis")

        vis.squidGame = vis.svg.append("path")
            .attr("class", "squid-line line-graph")
            .attr("fill", "none")
            .attr("stroke", vis.colors.netflix)
            .attr("stroke-width", 3)

        vis.mando = vis.svg.append("path")
            .attr("class", "mando-line line-graph")
            .attr("fill", "none")
            .attr("stroke", vis.colors.disney)
            .attr("stroke-width", 3)

        vis.handmaid = vis.svg.append("path")
            .attr("class", "handmaid-line line-graph")
            .attr("fill", "none")
            .attr("stroke", vis.colors.hulu)
            .attr("stroke-width", 3)

        vis.ryan = vis.svg.append("path")
            .attr("class", "ryan-line line-graph")
            .attr("fill", "none")
            .attr("stroke", vis.colors.prime)
            .attr("stroke-width", 3)

        vis.flight = vis.svg.append("path")
            .attr("class", "flight-line line-graph")
            .attr("fill", "none")
            .attr("stroke", vis.colors.hbo)
            .attr("stroke-width", 3)

        vis.line = d3.line()
            .x(function(d) { return vis.x(d.day); })
            .y(function(d) { return vis.y(d.popularity); });
        //initialize tooltip
        // vis.toolTip = d3.tip()
        //     .attr('class', 'd3-tip')
        //     .offset([-10, 0]);

        vis.wrangleData()
    }

    wrangleData() {
        let vis = this

        vis.squidGame = vis.data.filter(function(d) {
            return d.show == "squid game";;
        });

        vis.mando = vis.data.filter(function(d) {
            return d.show == "the mandalorian";;
        });

        vis.handmaid = vis.data.filter(function(d) {
            return d.show == "the handmaid's tale";;
        });

        vis.ryan = vis.data.filter(function(d) {
            return d.show == "Tom Clancy's Jack Ryan";;
        });

        vis.flight = vis.data.filter(function(d) {
            return d.show == "The Flight Attendant";;
        });

        vis.displayData = [vis.squidGame, vis.mando, vis.handmaid, vis.ryan, vis.flight]
        console.log(vis.displayData)
        vis.updateVis()
    }

    updateVis() {
        let vis = this;

        vis.x.domain([0, 32]);
        vis.y.domain([-2, 100]);

        //appending the line graph
        vis.squidGame = vis.svg.select(".squid-line")
            .data([vis.squidGame])
            // .on("mouseover", vis.mouseover)
            .transition()
            .delay(500)
            .duration(300)
            .ease(d3.easeLinear)
            .attr("d", function(d) {
                return vis.line(d)
            })
        //.on("mouseout", mouseout)

        vis.mando = vis.svg.select(".mando-line")
            .data([vis.mando])
            .transition()
            .delay(500)
            .duration(300)
            .ease(d3.easeLinear)
            .attr("d", function(d) {
                return vis.line(d)
            })

        vis.handmaid = vis.svg.select(".handmaid-line")
            .data([vis.handmaid])
            .transition()
            .delay(500)
            .duration(300)
            .ease(d3.easeLinear)
            .attr("d", function(d) {
                return vis.line(d)
            })

        vis.ryan = vis.svg.select(".ryan-line")
            .data([vis.ryan])
            .transition()
            .delay(500)
            .duration(300)
            .ease(d3.easeLinear)
            .attr("d", function(d) {
                return vis.line(d)
            })

        vis.flight = vis.svg.select(".flight-line")
            .data([vis.flight])
            .transition()
            .delay(500)
            .duration(300)
            .ease(d3.easeLinear)
            .attr("d", function(d) {
                return vis.line(d)
            })

        vis.circle_radius = 3.5

        //append circles
        vis.squidgame_circle = vis.svg.selectAll("squid-circles").data(vis.displayData[0]);

        vis.squidgame_circle.enter().append("circle")
            .attr("class", "circle squid-circles")
            .attr("fill", vis.colors.netflix)
            // .on("mouseover", showEdition)
            .attr("cx", function(d) {
                return vis.x(d.day) })
            .attr("cy", function(d) { return vis.y(d.popularity) })
            .attr("r", vis.circle_radius);

        vis.mando_circle = vis.svg.selectAll("mando-circles").data(vis.displayData[1]);

        vis.mando_circle.enter().append("circle")
            .attr("class", "circle mando-circles")
            .attr("fill", vis.colors.disney)
            // .on("mouseover", showEdition)
            .attr("cx", function(d) {
                return vis.x(d.day) })
            .attr("cy", function(d) { return vis.y(d.popularity) })
            .attr("r", vis.circle_radius);

        vis.handmaid_circle = vis.svg.selectAll("handmaid-circles").data(vis.displayData[2]);

        vis.handmaid_circle.enter().append("circle")
            .attr("class", "circle handmaid-circles")
            .attr("fill",vis.colors.hulu)
            // .on("mouseover", showEdition)
            .attr("cx", function(d) {
                return vis.x(d.day) })
            .attr("cy", function(d) { return vis.y(d.popularity) })
            .attr("r", vis.circle_radius);

        vis.ryan_circle = vis.svg.selectAll("ryan-circles").data(vis.displayData[3]);

        vis.ryan_circle.enter().append("circle")
            .attr("class", "circle ryan-circles")
            .attr("fill", vis.colors.prime)
            // .on("mouseover", showEdition)
            .attr("cx", function(d) {
                return vis.x(d.day) })
            .attr("cy", function(d) { return vis.y(d.popularity) })
            .attr("r", vis.circle_radius);

        vis.flight_circle = vis.svg.selectAll("flight-circles").data(vis.displayData[4]);

        vis.flight_circle.enter().append("circle")
            .attr("class", "circle flight-circles")
            .attr("fill", vis.colors.hbo)
            // .on("mouseover", showEdition)
            .attr("cx", function(d) {
                return vis.x(d.day) })
            .attr("cy", function(d) { return vis.y(d.popularity) })
            .attr("r", vis.circle_radius);

        // drawing line chart effect help from: http://bl.ocks.org/markmarkoh/8700606
        /* Add 'curtain' rectangle to hide entire graph */
        vis.curtain = vis.svg.append('rect')
            .attr('x', -1 * (vis.width + 20))
            .attr('y', -1 * (vis.height))
            .attr('height', vis.height+10)
            .attr('width', vis.width+10)
            .attr('class', 'curtain')
            .attr('transform', 'rotate(180)')
            .style('fill', '#ffffff')

        /* Create a shared transition for anything we're animating */
        vis.t = vis.svg.transition()
            .delay(750)
            .duration(3000)
            .ease(d3.easeLinear)

        vis.t.select('rect.curtain')
            .attr('width', 0);


        vis.svg.select(".x-axis")
            .transition()
            .duration(800)
            .call(vis.xAxis);

        vis.svg.select(".y-axis")
            .transition()
            .duration(800)
            .call(vis.yAxis);

        //x axis text
        vis.svg.append("text")
            .attr("class", "xLabel label")
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .attr("x", vis.width - 10)
            .attr("y", vis.height + 30)
            .text("Number of Days After Release")

        //y axis text
        vis.svg.append("text")
            .attr("class", "yLabel label")
            .attr("text-anchor", "start")
            .attr("fill", "black")
            .attr("x", -180)
            .attr("y", -30)
            .attr("transform", "rotate(-90)")
            .text("Google Search Popularity")

        vis.legend = vis.svg.append("g").attr("class", "legend-line")
            .attr("transform", `translate(20,0)`);
        vis.legend.append("circle").attr("cx", 0).attr("cy", 20).attr("r", 6).style("fill", vis.colors.netflix)
        vis.legend.append("text").attr("x", 10).attr("y", 20).text(" Netflix").style("font-size", "10px").attr("alignment-baseline", "middle")
        vis.legend.append("circle").attr("cx", 0).attr("cy", 45).attr("r", 6).style("fill", vis.colors.prime)
        vis.legend.append("text").attr("x", 10).attr("y", 45).text(" Prime").style("font-size", "10px").attr("alignment-baseline", "middle")
        vis.legend.append("circle").attr("cx", 0).attr("cy", 70).attr("r", 6).style("fill", vis.colors.hulu)
        vis.legend.append("text").attr("x", 10).attr("y", 70).text(" Hulu").style("font-size", "10px").attr("alignment-baseline", "middle")
        vis.legend.append("circle").attr("cx", 0).attr("cy", 95).attr("r", 6).style("fill", vis.colors.disney)
        vis.legend.append("text").attr("x", 10).attr("y", 95).text(" Disney+").style("font-size", "10px").attr("alignment-baseline", "middle")
        vis.legend.append("circle").attr("cx", 0).attr("cy", 120).attr("r", 6).style("fill", vis.colors.hbo)
        vis.legend.append("text").attr("x", 10).attr("y", 120).text(" HBO Max").style("font-size", "10px").attr("alignment-baseline", "middle")

    }

}