const timerEl = document.querySelector("#intervalTimer")
const returnBtnEl = document.querySelector("#returnHome");
const clearEl = document.querySelector("clearHS");
const leaderboard = document.querySelector("#high-score")

const hS = JSON.parse(localStorage.getItem("hS")) || [];

console.log(hS);


// return button on highscore page
returnBtnEl.addEventListener("click", function(){
    location.assign("index.html");
});

