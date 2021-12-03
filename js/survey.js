// Form format referenced: https://github.com/lyip12/loneliness/blob/master/js/questionaire.js
survey();

function survey(){
    let q0 = [1, "Which one of the following streaming platforms has the most subscribers?"];
    let q1 = [2, "Which one of the following streaming platforms is growing the fastest?"];
    let q2 = [3, "Which one of the following streaming platforms has the most original content?"];
    let q3 = [4, "Which one of the following streaming platforms has the most child-friendly content?"]
    let qs = [q0, q1, q2, q3];
    let options = ["Amazon Prime Video", "Disney+","HBO Max", "Hulu", "Netflix"]
    let answers = ["Netflix", "Disney+", "Disney+", "Disney+"] //TODO: check answers

    let scores = 0;

    let html = [];

    // populate the html to be displayed for the questions
    for (let i=0; i<qs.length; i++) {
        html[i] = "<p class='surveyQ'><b>" + qs[i][1] + "</b></p>" + "<form id='question"+qs[i][0]+"'>"
        for (let j=0; j<options.length; j++) {
            if (options[j] === answers[i]){
                html[i] = html[i] + "<input type='radio' name = 'q"+String(i)+"' value=1 alt='"+options[j]+"'> " + options[j] + "<br>"
            }
            else {
                html[i] = html[i] + "<input type='radio' name = 'q"+String(i)+"' value=0 alt='"+options[j]+"'> " + options[j] + "<br>"
            }
        }
    }

    document.getElementById("q1").innerHTML = html[0];

    d3.select("#q1").on("change", function () {
        let a1 = parseInt(d3.select('input[name="q0"]:checked').property("value"));
        let t1 = d3.select('input[name="q0"]:checked').property("alt");
        scores += a1;
        let out = "";
        if (a1 === 1) {
            out += "<p class='selectedQ'>"+q0[1]+"<br><br>&#9989   "+t1+"</p>"
        }
        else {
            out += "<p class='selectedQ'>"+q0[1]+"<br><br>&#10060   "+t1+"</p>"
        }
        document.getElementById("q1").innerHTML = out;
        document.getElementById("q2").innerHTML = html[1];
    });

    d3.select("#q2").on("change", function () {
        let a2 = parseInt(d3.select('input[name="q1"]:checked').property("value"));
        let t2 = d3.select('input[name="q1"]:checked').property("alt");
        scores += a2;
        let out = "";
        if (a2 === 1) {
            out += "<p class='selectedQ'>"+q1[1]+"<br><br>&#9989   "+t2+"</p>"
        }
        else {
            out += "<p class='selectedQ'>"+q1[1]+"<br><br>&#10060   "+t2+"</p>"
        }
        document.getElementById("q2").innerHTML = out;
        document.getElementById("q3").innerHTML = html[2];
    });

    d3.select("#q3").on("change", function () {
        let a3 = parseInt(d3.select('input[name="q2"]:checked').property("value"));
        let t3 = d3.select('input[name="q2"]:checked').property("alt");
        scores += a3;
        let out = "";
        if (a3 === 1) {
            out += "<p class='selectedQ'>"+q2[1]+"<br><br>&#9989   "+t3+"</p>"
        }
        else {
            out += "<p class='selectedQ'>"+q2[1]+"<br><br>&#10060   "+t3+"</p>"
        }
        document.getElementById("q3").innerHTML = out;
        document.getElementById("q4").innerHTML = html[3];
    });

    d3.select("#q4").on("change", function () {
        let a4 = parseInt(d3.select('input[name="q3"]:checked').property("value"));
        let t4 = d3.select('input[name="q3"]:checked').property("alt");
        scores += a4;
        let out = "";
        if (a4 === 1) {
            out += "<p class='selectedQ'>"+q3[1]+"<br><br>&#9989   "+t4+"</p>"
        }
        else {
            out += "<p class='selectedQ'>"+q3[1]+"<br><br>&#10060   "+t4+"</p>"
        }
        document.getElementById("q4").innerHTML = out;

        let resultText = "<div class='align-middle' id='survey-msg'><p style='color: #b58659; font-size: 2.35rem;'>";
        if (scores === 4) {
            resultText += "Forget about the competition, YOU are winning the Streaming War!<br></p>" +
                "<p>Follow our detailed analysis of the most popular streaming platforms and find your personalized recommendation at the end.</p></div>"
        }
        else if (scores === 0) {
            resultText += "You really DO need to know more about these streaming platforms!<br></p>" +
                "<p>Follow our detailed analysis of the most popular streaming platforms and find your personalized recommendation at the end.</p></div>"
        }
        else {
            resultText += "You've got some great intuition about these streaming platforms!<br></p>" +
                "<p>Follow our detailed analysis of the most popular streaming platforms and find your personalized recommendation at the end.</p></div>"
        }
        document.getElementById("survey-result").innerHTML = resultText;
    });

}