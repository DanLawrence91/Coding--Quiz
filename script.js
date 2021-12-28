// - Landing page has title followed by some text describing the game - DONE
// - Start button on page will then hide this text and show first question when pressed
// - questions and answers are hidden until start is pressed
// - questions will only appear one at a time and next question won't appear until previous one answered
// - timer in top corner that begins when start is pressed (set interval)
// - need to then show question with four answer buttons for user to select one
// - once first question is answered this then shows whether correct or incorrect for brief period (use interval)
// - will then move to next question and display this with first question hidden
// - This will repeat for however many questions written
// - if question is answered incorrectly the timer will reduce by 10 seconds
// - once timer is over (clear interval) or all questions are answered the game will end
// - once time is up will display score and user will input initials using form and submit button
// - highscores page linked to main page - this is the time html changes
// - once initials are entered will be taken to highscore.html - look at score apps from class in week 4
// - this will display all scores save through local storage
// - on highscore page you can either go back to main page to start again or clear highscores
// - if highscores cleared the leaderboard disappears and you can then click button to go back
// - main page once quiz starts will have highscores link in top corner, timer in other corner and then question
// - html will not change as questions are answered and instead will change from display hidden to display visible
// - highscores button disabled whilst quiz in progress

const startBtnEl = document.querySelector("#startButton");
const introEl = document.querySelector(".intro");
const qAndAEl = document.querySelector(".qAndA");
const questionEl = document.querySelector("#questions");
const answerEl = document.querySelector("#answers");
const returnBtnEl = document.querySelector("#returnHome");
const timerEl = document.querySelector("#intervalTimer")

let score = 0;

// - start button click event
startBtnEl.addEventListener("click", function timer(){
    var timeLeft = 100;

    var timeInterval = setInterval(function (){
        if (timeLeft > 1){
            timerEl.textContent = timeLeft + " seconds remaining";
            timeLeft--;
        } else if (timeLeft ===1){
            timerEl.textContent = timeLeft + " second remaining";
        } else {
            timerEl.textContent = "";
            clearInterval(timeInterval);
            //may need to call a function here for end of game + also need to reduce time by 10 when question wrong
        }
    }, 1000);
});

// return button on highscore page
returnBtnEl.addEventListener("click", function(){
    location.assign("index.html")
});

// timer function with start time of 100 seconds


const quizQuestions = [
    {question: "What does HTML stand for?",
        answer: [
            {text: "HyperText Markup Langauge", correct: true},
            {text: "HelloText My Learning", correct: false},
            {text: "HyperText Means Language", correct: false},
            {text: "HeavyTraffic Means Late", correct: false}
        ],
    },

    {question: "What tag is used to add CSS to HTML?",
        answer: [
            {text: "<img>", correct: false},
            {text: "<script>", correct: false},
            {text: "<link>", correct: true},
            {text: "<a>", correct: false}
        ],
    },

    {question: "How many values does boolean have in Javascript?",
        answer: [
            {text: "3", correct: false},
            {text: "10", correct: false},
            {text: "0", correct: false},
            {text: "2", correct: true}
        ],
    },

    {question: "Who invented Javascript?",
        answer: [
            {text: "Elon Musk", correct: false},
            {text: "Steve Jobs", correct: false},
            {text: "Brendan Eich", correct: true},
            {text: "Tim Cook", correct: false}
        ],
    },

    {question: "When was Javascript invented?",
        answer: [
            {text: "1997", correct: false},
            {text: "1995", correct: true},
            {text: "2001", correct: false},
            {text: "2010", correct: false}
        ],
    },
]