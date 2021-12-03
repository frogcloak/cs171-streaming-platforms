recommendation();

function recommendation() {

    // defining the HTML for the questions
    let recQ1 = "<div class='row'><p class='recQ'><b>What is your total monthly budget for streaming (enter a positive whole number)?</b></p>" +
        "<form><input type='number' class='form-control' id='rec-budget' placeholder='Budget' min='0' step='1'><button type='button' class='btn btn-primary'>Next</button></form>"
    let recQ2 = ""
    document.getElementById("rec-q").innerHTML = recQ1
}
