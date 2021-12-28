// return button on highscore page
const returnBtnEl = document.querySelector("#returnHome");

returnBtnEl.addEventListener("click", function(){
    location.assign("index.html");
});