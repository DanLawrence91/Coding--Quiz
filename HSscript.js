const startBtnEl = document.querySelector("#startButton");
const introEl = document.querySelector(".intro");
const qAndAEl = document.querySelector(".qAndA");
const questionEl = document.querySelector("#questions");
const landingEl = document.querySelector("#landingPage");
const answerEl = document.querySelector("#answers");
const timerEl = document.querySelector("#intervalTimer")
const returnBtnEl = document.querySelector("#returnHome");
const clearEl = document.querySelector("clearHS");
const leaderboard = document.querySelector(".high-score")

// return button on highscore page
returnBtnEl.addEventListener("click", function(){
    location.assign("index.html");
});

// store highscores based on time left in game
// var highScore = localStorage.getItem("time")

// clear local storage on click
clearEl.addEventListener("click", function(){
    localStorage.clear();
});