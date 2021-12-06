// Load data with promises
let promises = [
    // d3.csv("data/all_titles.csv"),
    d3.csv("data/new-pricing.csv"),
    // d3.csv("data/new-pricing.csv"),
    // d3.csv("data/all_originals.csv")
    // d3.csv("data/cleaned/hulu_original_films.csv"),
    // d3.csv("data/cleaned/hulu_original_programs.csv"),
    // d3.csv("data/cleaned/amazon_original_films.csv"),
    // d3.csv("data/cleaned/amazon_original_programs.csv"),
    // d3.csv("data/cleaned/netflix_original_films.csv"),
    // d3.csv("data/cleaned/netflix_original_programs.csv"),
    // d3.csv("data/cleaned/disney_original_films.csv"),
    // d3.csv("data/cleaned/disney_original_programs.csv")
];

Promise.all(promises)
    .then(function (data) {
        createVis(data)
    })
    .catch(function (err) {
        console.log(err)
    });

function createVis(data) {

    // let allTitles = data[0]
    // let allMoviesShows = data[1]
    let pricing = data[0]
    // let allOriginals = data[3]
    // let huluFilms = data[3]
    // let huluProgs = data[4]
    // let amazonFilms = data[5]
    // let amazonProgs = data[6]
    // let netflixFilms = data[7]
    // let netflixProgs = data[8]
    // let disneyFilms = data[9]
    // let disneyProgs = data[10]


    console.log(data)

    //let circleVis = new CircleVis("originals-bg", allTitles, allMoviesShows, allOriginals);
    let pricingVis = new PricingVis("pricing-bg", pricing);

}