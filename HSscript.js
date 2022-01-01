const timerEl = document.querySelector("#intervalTimer")
const returnBtnEl = document.querySelector("#returnHome");
const clearEl = document.querySelector("#clearHS");
const leaderboardEl = document.querySelector("#high-score")

const hS = JSON.parse(localStorage.getItem("hS")) || [];

function renderHS(){
    leaderboardEl.innerHTML = "";

    for (var i = 0; i < hS.length; i++){
        var highS = hS[i];

        var li = document.createElement("li");
        li.textContent = highS.initials + " - " + highS.score

        leaderboardEl.appendChild(li)
    }
}

renderHS ()

//adds scores stored in local storage to the highscores leaderboard
// leaderboardEl.innerHTML = hS.map(highscore => {
//     return `<li class="score-list">${highscore.initials}: ${highscore.score}</li>`
// }).join("")

// return button on highscore page
returnBtnEl.addEventListener("click", function(){
    location.assign("index.html");
});

//clear highscore from local storage
clearEl.addEventListener("click", function(){
    localStorage.clear();
    highS = "";
    leaderboardEl.innerHTML = highS
})
