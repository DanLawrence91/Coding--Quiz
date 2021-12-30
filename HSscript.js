const timerEl = document.querySelector("#intervalTimer")
const returnBtnEl = document.querySelector("#returnHome");
const clearEl = document.querySelector("#clearHS");
const leaderboardEl = document.querySelector("#high-score")

const hS = JSON.parse(localStorage.getItem("hS")) || [];

//adds scores stored in local storage to the highscores leaderboard
leaderboardEl.innerHTML = hS.map(highscore => {
    return `<li class="score-list">${highscore.initials}: ${highscore.score}</li>`
}).join("")

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