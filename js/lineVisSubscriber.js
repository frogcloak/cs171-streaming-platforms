class LineVis_subscriber {

    constructor(parentElement, subscriberData) {
        this.parentElement = parentElement;
        this.data = subscriberData;
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
        document.getElementById('insight1').onmouseover = () => {
            this.svg.selectAll(".disney-circles").attr("fill",this.colors.gray)
            this.svg.selectAll(".hulu-circles").attr("fill",this.colors.gray)
            this.svg.selectAll(".hbo-circles").attr("fill",this.colors.gray)
            this.svg.selectAll(".disney-line").attr("stroke", this.colors.gray)
            this.svg.selectAll(".hulu-line").attr("stroke", this.colors.gray)
            this.svg.selectAll(".hbo-line").attr("stroke",this.colors.gray)
        }

        document.getElementById('insight1').onmouseout = () => {
            this.mouseOut()
        }

        document.getElementById('insight2').onmouseover = () => {
            this.svg.selectAll(".netflix-circles").attr("fill",this.colors.gray)
            this.svg.selectAll(".prime-circles").attr("fill",this.colors.gray)
            this.svg.selectAll(".hulu-circles").attr("fill",this.colors.gray)
            this.svg.selectAll(".hbo-circles").attr("fill",this.colors.gray)
            this.svg.selectAll(".hulu-line").attr("stroke", this.colors.gray)
            this.svg.selectAll(".hbo-line").attr("stroke",this.colors.gray)
            this.svg.selectAll(".netflix-line").attr("stroke", this.colors.gray)
            this.svg.selectAll(".prime-line").attr("stroke",this.colors.gray)
        }

        document.getElementById('insight2').onmouseout = () => {
            this.mouseOut()
        }

        document.getElementById('insight3').onmouseover = () => {
            this.svg.append("svg:image")
                .attr('class', 'upward-img')
                .attr('x', -90)
                .attr('y', 90)
                .attr('width', 600)
                .attr('height', 100)
                .attr("xlink:href", "/img/up-trend.png")

            // drawing line chart effect help from: http://bl.ocks.org/markmarkoh/8700606
            /* Add 'curtain' rectangle to hide entire graph */
            this.curtain_img = this.svg.append('rect')
                .attr('x', -255)
                .attr('y', -165)
                .attr('height', 50)
                .attr('width', 100)
                .attr('class', 'curtain-img')
                .attr('transform', 'rotate(180)')
                .style('fill', '#ffffff')

            /* Create a shared transition for anything we're animating */
            this.t = this.svg.transition()
                .delay(10)
                .duration(1000)
                .ease(d3.easeLinear)

            this.t.select('rect.curtain-img')
                .attr('width', 0);
        }

        document.getElementById('insight3').onmouseout = () => {
            this.mouseOut()
        }
    }

    mouseOut(){
        this.svg.selectAll(".netflix-circles").attr("fill",this.colors.netflix)
        this.svg.selectAll(".prime-circles").attr("fill",this.colors.prime)
        this.svg.selectAll(".disney-circles").attr("fill",this.colors.disney)
        this.svg.selectAll(".hulu-circles").attr("fill",this.colors.hulu)
        this.svg.selectAll(".hbo-circles").attr("fill",this.colors.hbo)
        this.svg.selectAll(".netflix-line").attr("stroke",this.colors.netflix)
        this.svg.selectAll(".prime-line").attr("stroke",this.colors.prime)
        this.svg.selectAll(".disney-line").attr("stroke", this.colors.disney)
        this.svg.selectAll(".hulu-line").attr("stroke", this.colors.hulu)
        this.svg.selectAll(".hbo-line").attr("stroke",this.colors.hbo)
        this.svg.selectAll(".upward-img").remove()
        this.svg.selectAll(".curtain-img").remove()
    }

    initVis(){
        let vis = this;

        vis.margin = {
            'top':40,
            'bottom': 60,
            'left': 60,
            'right': 30
        };
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

        // set the ranges
        vis.x = d3.scalePoint().range([0, vis.width]);
        vis.y = d3.scaleLinear().range([vis.height, 0]);


        vis.xAxis = d3.axisBottom()
            .scale(vis.x)
            .tickFormat(function(d){ return d.replace("20", "\'")})
        //.tickPadding(15)//.tickFormat(d3.format("d"))

        vis.yAxis = d3.axisLeft()
            .scale(vis.y)
            .tickFormat(function(d) { return d + "M"; })

        vis.xAxisGroup = vis.svg.append("g")
            .attr("class", "x-axis axis")
            .attr("transform", "translate(0," + vis.height + ")")
        //.style("font", "14px times")

        vis.yAxisGroup = vis.svg.append("g")
            .attr("class", "y-axis axis")

        vis.stroke = 4

        vis.netflix = vis.svg.append("path")
            .attr("class", "line-graph netflix-line")
            .attr("fill", "none")
            .attr("stroke", vis.colors.netflix)
            .attr("stroke-width", vis.stroke)

        vis.hulu = vis.svg.append("path")
            .attr("class", "line-graph hulu-line")
            .attr("fill", "none")
            .attr("stroke", vis.colors.hulu)
            .attr("stroke-width", vis.stroke)

        vis.prime = vis.svg.append("path")
            .attr("class", "line-graph prime-line")
            .attr("fill", "none")
            .attr("stroke", vis.colors.prime)
            .attr("stroke-width", vis.stroke)

        vis.hbo = vis.svg.append("path")
            .attr("class", "line-graph hbo-line")
            .attr("fill", "none")
            .attr("stroke", vis.colors.hbo)
            .attr("stroke-width", vis.stroke)

        vis.disney = vis.svg.append("path")
            .attr("class", "line-graph disney-line")
            .attr("fill", "none")
            .attr("stroke", vis.colors.disney)
            .attr("stroke-width", vis.stroke)

        vis.line = d3.line()
            .x(function(d) { return vis.x(d.yearQuarter); })
            .y(function(d) { return vis.y(d.subscribers); });


        //initialize tooltip
        //initialize tooltip
        // vis.toolTip = d3.tip()
        //     .attr('class', 'd3-tip')
        //     .offset([-10, 0]);


        vis.wrangleData()
    }

    wrangleData() {
        let vis = this

        vis.netflixData = vis.data.filter(function(d) {
            return d.service == "Netflix";
        });

        vis.disneyData = vis.data.filter(function(d) {
            return d.service == "Disney+";
        });

        vis.huluData = vis.data.filter(function(d) {
            return d.service == "Hulu";
        });

        vis.primeData = vis.data.filter(function(d) {
            return d.service == "Prime";
        });

        vis.hboData = vis.data.filter(function(d) {
            return d.service == "HBO";
        });

        vis.displayData = [vis.netflixData, vis.disneyData, vis.huluData, vis.primeData, vis.hboData]
        console.log(vis.displayData)
        vis.updateVis()
    }

    updateVis() {
        let vis = this;


        //vis.x.domain([2018,2021])
        vis.myData = ['2018-Q4', '2019-Q1', '2019-Q2', '2019-Q3', '2019-Q4', '2020-Q1', '2020-Q2', '2020-Q3', '2020-Q4', '2021-Q1', '2021-Q2', '2021-Q3', '2021-Q4']
        vis.x.domain(vis.myData)
        vis.y.domain([0, d3.max(vis.data, function (d) {
            return d.subscribers
        })]);

        //appending the line graph
        vis.netflix = vis.svg.select(".netflix-line")
            .data([vis.netflixData])
            .on("mouseover", vis.mouseover)
            .transition()
            .delay(500)
            .duration(300)
            .ease(d3.easeLinear)
            .attr("d", function (d) {
                return vis.line(d)
            })
        //.on("mouseout", mouseout)

        vis.disney = vis.svg.select(".disney-line")
            .data([vis.disneyData])
            .transition()
            .delay(500)
            .duration(300)
            .ease(d3.easeLinear)
            .attr("d", function (d) {
                return vis.line(d)
            })

        vis.hulu = vis.svg.select(".hulu-line")
            .data([vis.huluData])
            .transition()
            .delay(500)
            .duration(300)
            .ease(d3.easeLinear)
            .attr("d", function (d) {
                return vis.line(d)
            })

        vis.prime = vis.svg.select(".prime-line")
            .data([vis.primeData])
            .transition()
            .delay(500)
            .duration(300)
            .ease(d3.easeLinear)
            .attr("d", function (d) {
                return vis.line(d)
            })
            .style("stroke-dasharray", ("5,5"))

        vis.hbo = vis.svg.select(".hbo-line")
            .data([vis.hboData])
            .transition()
            .delay(500)
            .duration(300)
            .ease(d3.easeLinear)
            .attr("d", function (d) {
                return vis.line(d)
            })

        vis.circle_radius = 5

        //append circles
        vis.netflix_circle = vis.svg.selectAll("netflix-circles").data(vis.displayData[0]);

        vis.netflix_circle.enter().append("circle")
            .attr("class", "circle netflix-circles")
            .attr("fill", vis.colors.netflix)
            // .on("mouseover", showEdition)
            .attr("cx", function (d) {
                return vis.x(d.yearQuarter)
            })
            .attr("cy", function (d) {
                return vis.y(d.subscribers)
            })
            .attr("r", vis.circle_radius);

        vis.hulu_circle = vis.svg.selectAll("hulu-circles").data(vis.displayData[2]);

        vis.hulu_circle.enter().append("circle")
            .attr("class", "circle hulu-circles")
            .attr("fill", vis.colors.hulu)
            // .on("mouseover", showEdition)
            .attr("cx", function (d) {
                return vis.x(d.yearQuarter)
            })
            .attr("cy", function (d) {
                return vis.y(d.subscribers)
            })
            .attr("r", vis.circle_radius);

        vis.prime_circle = vis.svg.selectAll("prime-circles").data(vis.displayData[3]);

        vis.prime_circle.enter().append("circle")
            .attr("class", "circle prime-circles")
            .attr("fill", vis.colors.prime)
            // .on("mouseover", showEdition)
            .attr("cx", function (d) {
                return vis.x(d.yearQuarter)
            })
            .attr("cy", function (d) {
                return vis.y(d.subscribers)
            })
            .attr("r", vis.circle_radius);

        vis.hbo = vis.svg.selectAll("hbo-circles").data(vis.displayData[4]);

        vis.hbo.enter().append("circle")
            .attr("class", "circle hbo-circles")
            .attr("fill", vis.colors.hbo)
            // .on("mouseover", showEdition)
            .attr("cx", function (d) {
                return vis.x(d.yearQuarter)
            })
            .attr("cy", function (d) {
                return vis.y(d.subscribers)
            })
            .attr("r", vis.circle_radius);

        vis.disney_circle = vis.svg.selectAll("disney-circles").data(vis.displayData[1]);

        vis.disney_circle.enter().append("circle")
            .attr("class", "circle disney-circles")
            .attr("fill", vis.colors.disney)
            // .on("mouseover", showEdition)
            .attr("cx", function (d) {
                return vis.x(d.yearQuarter)
            })
            .attr("cy", function (d) {
                return vis.y(d.subscribers)
            })
            .attr("r", vis.circle_radius);

        // drawing line chart effect help from: http://bl.ocks.org/markmarkoh/8700606
        /* Add 'curtain' rectangle to hide entire graph */
        vis.curtain = vis.svg.append('rect')
            .attr('x', -1 * (vis.width + 20))
            .attr('y', -1 * (vis.height))
            .attr('height', vis.height + 10)
            .attr('width', vis.width + 10)
            .attr('class', 'curtain')
            .attr('transform', 'rotate(180)')
            .style('fill', '#ffffff')

        /* Create a shared transition for anything we're animating */
        vis.t = vis.svg.transition()
            .delay(550)
            .duration(2000)
            .ease(d3.easeLinear)

        vis.t.select('rect.curtain')
            .attr('width', 0);


        vis.svg.select(".x-axis")
            // .transition()
            // .duration(800)
            .call(vis.xAxis);

        vis.svg.select(".y-axis")
            // .transition()
            // .duration(800)
            .call(vis.yAxis);

        //x axis text
        vis.svg.append("text")
            .attr("class", "xLabel label")
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .attr("x", vis.width - 10)
            .attr("y", vis.height + 40)
            .text("Year-Quarter")

        //y axis text
        vis.svg.append("text")
            .attr("class", "yLabel label")
            .attr("text-anchor", "start")
            .attr("fill", "black")
            .attr("x", -180)
            .attr("y", -45)
            .attr("transform", "rotate(-90)")
            .text("Millions of Subscribers")

        // add title
        vis.svg.append("g")
            .attr("class", "lineTitle")
            .attr("transform", `translate(${vis.width / 3},-25)`)
            .append("text")
            .text("Platform Subscribers by Year and Quarter")
            .style("fill", "black")
            .style("text-anchor", "middle");

        vis.legend = vis.svg.append("g").attr("class", "legend-line")
            .attr("transform", `translate(0,${vis.height + 15})`);
        vis.legend.append("circle").attr("cx", 0).attr("cy", 20).attr("r", 6).style("fill", vis.colors.netflix)
        vis.legend.append("text").attr("x", 10).attr("y", 20).text(" Netflix").style("font-size", "10px").attr("alignment-baseline", "middle")
        vis.legend.append("circle").attr("cx", 60).attr("cy", 20).attr("r", 6).style("fill", vis.colors.prime)
        vis.legend.append("text").attr("x", 70).attr("y", 20).text(" Prime").style("font-size", "10px").attr("alignment-baseline", "middle")
        vis.legend.append("circle").attr("cx", 120).attr("cy", 20).attr("r", 6).style("fill", vis.colors.hulu)
        vis.legend.append("text").attr("x", 130).attr("y", 20).text(" Hulu").style("font-size", "10px").attr("alignment-baseline", "middle")
        vis.legend.append("circle").attr("cx", 175).attr("cy", 20).attr("r", 6).style("fill", vis.colors.disney)
        vis.legend.append("text").attr("x", 185).attr("y", 20).text(" Disney+").style("font-size", "10px").attr("alignment-baseline", "middle")
        vis.legend.append("circle").attr("cx", 240).attr("cy", 20).attr("r", 6).style("fill", vis.colors.hbo)
        vis.legend.append("text").attr("x", 250).attr("y", 20).text(" HBO Max").style("font-size", "10px").attr("alignment-baseline", "middle")

    }

}