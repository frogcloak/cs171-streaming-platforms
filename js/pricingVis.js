class PricingVis {
    constructor(parentElement, pricing) {
        this.parentElement = parentElement;
        this.pricing = pricing;

        // Array of colors
        this.colors = ['#cf3038', '#0279ad', '#faa223', '#62bc51', '#bb2b77'];
        this.names = ['Netflix', 'Disney', 'Amazon', 'Hulu', 'HBO']

        // Initialize static visualization
        this.initVis();
    }

    initVis() {
        let vis = this;

        vis.margin = {top: 50, right: 50, bottom: 50, left: 50};

        vis.height = 400;
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;

        // Initialize empty array
        vis.displayData = [];

        vis.table = d3.select("#" + vis.parentElement).append("table")
            .attr("class", "table table-hover")

        // append table head
        vis.thead = vis.table.append("thead")
        vis.thead.html(
            `<tr>
                <th scope="col">Platform</th>
                <th scope="col">Plan</th>
                <th scope="col">Monthly price</th>
                <th scope="col">Yearly price</th>
                <th scope="col">Ads</th>
                <th scope="col">Student discount</th>
                <th scope="col">Bundles</th>
                <th scope="col">Simultaneous streams</th>
                <th scope="col">Profiles</th>
            </tr>`
        )


        // append table body
        vis.tbody = vis.table.append("tbody")

        // append tooltip
        vis.tooltip = d3.select("body").append('div')
            .attr('class', "tooltip")
            .attr('id', 'chart-tooltip')

        vis.wrangleData();
    }

    wrangleData() {
        let vis = this;

        console.log(vis.pricing)

        vis.prices = d3.group(vis.pricing, d => d.platform)
        console.log(vis.prices)

        // Push grouped platforms to empty array
        vis.prices.forEach((row, index) => {

            console.log(d3.min(row, row => row.monthly_price))

            // create JS object for each platform
            let planAll = {
                platform: index,
                plan: row.plan_type,
                monthly_price: row.monthly_price,
                yearly_price: row.yearly_price,
                ads: row.ads,
                student: row.student_discount,
                bundles: row.bundles,
                streams: row.sim_streams,
                profiles: row.profiles


            }

            vis.displayData.push(
                planAll
            )
        })

        console.log(vis.displayData)

        vis.updateVis();
    }

    updateVis() {
        let vis = this;

        // reset tbody
        vis.tbody.html('')

        vis.pricing.forEach((row, index) => {

            vis.row = vis.tbody.append("tr")
                .attr('class', 'tr')
            vis.row.html(
                `<td>${row.platform}</td>
                <td>${row.plan_type}</td>
                <td>${row.monthly_price}</td>
                <td>${row.yearly_price}</td>
                <td>${row.ads}</td>
                <td>${row.student_discount}</td>
                <td>${row.bundles}</td>
                <td>${row.sim_streams}</td>
                <td>${row.profiles}</td>`
            )
            vis.row.style("background-color", function(){
                if (row.platform === 'HBO') { return '#bb2b7782' }
                if (row.platform === 'Amazon') { return '#faa2239c' }
                if (row.platform === 'Hulu') { return '#62bc519c' }
                if (row.platform === 'Disney') { return '#0279ad5e' }
                if (row.platform === 'Netflix') { return '#cf303882' }
            })


            vis.row.on('click', function () {
                console.log(' you clicked on a row - the selected row is', row.platform)
            })

            vis.thead.on('click', function () {

            })


        })





    }
}