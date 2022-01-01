const timerEl = document.querySelector("#intervalTimer")
const returnBtnEl = document.querySelector("#returnHome");
const clearEl = document.querySelector("#clearHS");
const leaderboardEl = document.querySelector("#high-score")

//get highscores from local storage and store as an object
const hS = JSON.parse(localStorage.getItem("hS")) || [];

//function to show leaderboard with nothing to start with and then as local storage populated will show data from there
function renderHS(){
    leaderboardEl.innerHTML = "";

    //loops through hS object and shows this as a list on leaderboard
    for (var i = 0; i < hS.length; i++){
        var highS = hS[i];

        var li = document.createElement("li");
        li.textContent = highS.initials + " - " + highS.score

        leaderboardEl.appendChild(li)
    }
}

renderHS ()

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
