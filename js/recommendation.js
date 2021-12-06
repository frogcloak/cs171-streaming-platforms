recommendation();

function recommendation() {


    let q0 = 0;
    let q1 = "";
    let q2 = "";
    let q3 = 0;

    // defining the HTML for the questions
    let recQ1 = "<div class='row'><p class='recQ'><b>What is your total monthly budget for streaming (enter a positive whole number)?</b></p>" +
        "<form><input type='number' name='q0' class='form-control' id='rec-budget' placeholder='Budget' min='0' step='1'><button type='button' class='btn btn-primary' id='button1'>Next</button></form>"
    let recQ2 = "<div class='row' id='rec-q1'><p class='recQ'><b>Do you need your streaming platform to be 100% child friendly?</b></p>" +
        "<form id='rec-child'><input type='radio' name='q1' value='1' alt='yes'>Yes<br><input type='radio' name='q1' value='0' alt='no'>No<br><button type='button' class='btn btn-primary' id='button2'>Next</button></form>"
    let recQ3 = "<div class='row' id='rec-q2'><p class='recQ'><b>Among the following features, which one is the most important to you?</b></p>" +
        "<form id='rec-feature'><input type='radio' name='q2' value='movie'>A large selection of movies<br><input type='radio' name='q2' value='TV'>A large selection of TV shows<br><input type='radio' name='q2' value='original'>A large selection of Original content<br><button type='button' class='btn btn-primary' id='button3'>Next</button></form>"

    // TODO for more Qs


    let recText;

    document.getElementById("rec-q").innerHTML = recQ1

    d3.select("#button1").on("click", function () {
        q0 = parseInt(d3.select('#rec-budget').property("value"));
        console.log(q0);
        document.getElementById("rec-q").innerHTML = recQ2;

        d3.select("#button2").on("click", function () {
            q1 = d3.select('input[name="q1"]:checked').property("alt");
            console.log(q1);
            document.getElementById("rec-q").innerHTML = recQ3;

            d3.select("#button3").on("click", function () {
                q2 = d3.select('input[name="q2"]:checked').property("value");
                console.log(q2);

                if(q0 < 7){
                    recText = "I'm sorry, it seems your budget is a little low for these streaming platforms"
                }
                else {
                    if(q1 == "yes"){
                        recText = "Disney+ has a great selection of kid-friendly entertainment for everyone to enjoy!"
                    }
                    else{
                        if(q2 == "movie"){
                            recText = "Netflix, Prime and HBO all have great selections of movies and are within your budget!"
                        }
                        if(q2 == "TV"){
                            recText = "Hulu has a great selection of TV shows and is within your budget!"
                        }
                        if(q2 == "original"){
                            recText = "Both Netflix and Disney+ have a great selection of original programming!"
                        }
                    }
                }
                let recHTML = `<div class="rec-result"><h2 class="rec-text">${recText}</h2></\div>`
                document.getElementById("rec-result").innerHTML = recHTML


            })

        })
    })


}
