/* * * * * * * * * * * * * *
*           MAIN           *
* * * * * * * * * * * * * */

// init global variables & switches
let myLineVis

loadData()
parseTime = d3.timeParse("%y")

function loadData(){
    d3.csv("data/quarterly_subscribers.csv", row => {
        row.year = +row.year
        row.subscribers = +row.subscribers
        return row
    }).then(csv => {
        initMainPage(csv)
    })
}

// initMainPage
function initMainPage(subscriberData) {

    // log data
    console.log('check out the data', subscriberData);


    // TODO - init line
    myLineVis = new LineVis_subscriber('lineDiv', subscriberData)

}





