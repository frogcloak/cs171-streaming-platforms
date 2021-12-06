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
        "<form id='rec-feature'><input type='radio' name='q2' value='movie'>A large selection of movies<br><input type='radio' name='q2' value='TV'>A large selection of TV shows<br><input type='radio' name='q2' value='original'>A large selection of Original content<br><button type='button' class='btn btn-primary' id='button-3'>Next</button></form>"

    // TODO for more Qs


    document.getElementById("rec-q").innerHTML = recQ1

    d3.select("#button1").on("click", function () {
        q0 = parseInt(d3.select('#rec-budget').property("value"));
        console.log(q0);
        document.getElementById("rec-q").innerHTML = recQ2;

        d3.select("#button2").on("click", function () {
            q1 = d3.select('input[name="q1"]:checked').property("alt");
            console.log(q1);
            document.getElementById("rec-q").innerHTML = recQ3;

        //    TODO FOR next Q
        })
    })


}
