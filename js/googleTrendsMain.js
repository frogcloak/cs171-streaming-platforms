// init global variables & switches
let myLineVisTrends

parseTime = d3.timeParse("%y-%m-%d")

Promise.all([
    d3.csv("data/google_trends.csv"),
    d3.csv("data/aux_data.csv"),
]).then(function(files) {
    initGraph(files[0])
    initAux(files[1])
}).catch(function(err) {
    // handle error here
})

// initMainPage
function initGraph(trendsData) {

    // log data
    console.log('check out the data', trendsData);
    trendsData.forEach(function(row){
        row.date = parseTime(row.date)
        row.popularity = +row.popularity
        row.day = +row.day
    })

    // TODO - init line
    myLineVisTrends = new LineVisTrends('lineDivTrends', trendsData)

}

function initAux(auxData) {
    document.getElementById('squidgame').onmouseover = () => {
        let innerText = generateHTML(auxData, 0)
    }
    document.getElementById('ryan').onmouseover = () => {
        let innerText = generateHTML(auxData, 1)
    }
    document.getElementById('mando').onmouseover = () => {
        let innerText = generateHTML(auxData, 2)
    }
    document.getElementById('handmaid').onmouseover = () => {
        let innerText = generateHTML(auxData, 3)
    }
    document.getElementById('flight').onmouseover = () => {
        let innerText = generateHTML(auxData, 4)
    }
}

function generateHTML(auxData, index){
    let currShow = auxData[index]
    // `translate(${vis.width / 3},-25)`
    document.getElementById("showPlatformImage").innerHTML = `<img src=\"img/${currShow.image}\">`
    document.getElementById("showTitle").innerHTML = `<h2>${currShow.title}</h2>`
    document.getElementById("showRottenTomatoes").innerHTML = `<h3><img src=\"img/certified-fresh.png\">Rotten Tomatoes Score: ${currShow.rotten_tomatoes}/100</h3>`
    document.getElementById("showSummary").innerHTML = `<h4>${currShow.summary}</h4>`
}