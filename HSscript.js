const timerEl = document.querySelector("#intervalTimer")
const returnBtnEl = document.querySelector("#returnHome");
const clearEl = document.querySelector("clearHS");
const leaderboard = document.querySelector(".high-score")


// return button on highscore page
returnBtnEl.addEventListener("click", function(){
    location.assign("index.html");
});

localStorage.setItem("lastScore", score)
const lastHighScore = localStorage.getItem("lastScore");

const hS = JSON.parse(localStorage.getItem("highscores"));

console.log(hS)

// clear local storage on click