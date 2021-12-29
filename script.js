// - Landing page has title followed by some text describing the game - DONE
// - Start button on page will then hide this text and show first question when pressed - DONE
// - questions and answers are hidden until start is pressed - DONE
// - questions will only appear one at a time and next question won't appear until previous one answered
// - timer in top corner that begins when start is pressed (set interval) - DONE
// - need to then show question with four answer buttons for user to select one
// - once first question is answered this then shows whether correct or incorrect for brief period (use interval)
// - will then move to next question and display this with first question hidden
// - This will repeat for however many questions written
// - if question is answered incorrectly the timer will reduce by 10 seconds
// - once timer is over (clear interval) or all questions are answered the game will end
// - once time is up will display score and user will input initials using form and submit button
// - highscores page linked to main page - this is the time html changes - DONE
// - once initials are entered will be taken to highscore.html (look at score apps from class in week 4)
// - this will display all scores save through local storage
// - on highscore page you can either go back to main page to start again or clear highscores
// - if highscores cleared the leaderboard disappears and you can then click button to go back
// - main page once quiz starts will have highscores link in top corner, timer in other corner and then question - DONE
// - html will not change as questions are answered
// - highscores button disabled whilst quiz in progress

const startBtnEl = document.querySelector("#startButton");
const landingEl = document.querySelector("#landingPage");
const containerEl = document.querySelector(".container");
const qAndAnsEl = document.querySelector("#qAndAns");
const questionsEl = document.querySelector("#questions")
const answerEl = document.querySelector("#answers");
const timerEl = document.querySelector("#intervalTimer")
const returnBtnEl = document.querySelector("#returnHome");
const clearEl = document.querySelector("clearHS");
const leaderboard = document.querySelector(".high-score")
const chosenAnswer = Array.from(document.getElementsByClassName("chosenAns"))

let score = 0
let currentQuestionIndex = ""

// - start button click event to set timer going and display first question
startBtnEl.addEventListener("click", beginQuiz);

function beginQuiz(){
    var timeLeft = 60;
    
    if (qAndAnsEl.display == "none"){
        qAndAnsEl.setAttribute("style", "display:none");
        landingEl.setAttribute("style", "display:block");
    } else {
        qAndAnsEl.setAttribute("style", "display:block");
        landingEl.setAttribute("style", "display:none");
    }

    var timeInterval = setInterval(function (){
        if (timeLeft > 1){
            timerEl.textContent = timeLeft + " seconds remaining";
            timeLeft--;
        } else if (timeLeft === 1){
            timerEl.textContent = timeLeft + " second remaining";
            timeLeft--;
        } else {
            timerEl.textContent = "Time is up!";
            clearInterval(timeInterval);
            //may need to call a function here for end of game + also need to reduce time by 10 when question wrong
        }
    }, 1000);
    currentQuestionIndex = 0;
    showQuizQues();
    
}

function showQuizQues() {
    var currentQuestion = quizQuestions[currentQuestionIndex]
    questionsEl.innerText = currentQuestion.question;

    for (var i = 0; i < chosenAnswer.length; i++){
        var answer = chosenAnswer[i];
        var number = answer.dataset["number"];
        answer.innerText = currentQuestion["answer" + number];
    }

    quizQuestions.splice(currentQuestionIndex, 1)
}

for (var j = 0; j < chosenAnswer.length; j++){
    var answer = chosenAnswer[j];
    answer.addEventListener("click", function(k){
        var selectedOption = k.target;
        var selectedAnswer = selectedOption.dataset["number"];
        console.log(selectedAnswer);
        showQuizQues()
    })
}

let quizQuestions = [
    {
        question: "What does HTML stand for?",
        answer1: "HyperText Markup Langauge",
        answer2: "HelloText My Learning",
        answer3: "HyperText Means Language",
        answer4: "HeavyTraffic Means Late",
        correct: 1
    },

    {
        question: "What tag is used to add CSS to HTML?",
        answer1: "<img>",
        answer2: "<script>",
        answer3: "<link>",
        answer4: "<a>",
        correct: 3
    },

    {
        question: "How many values does boolean have in Javascript?",
        answer1: "3",
        answer2: "10",
        answer3: "0",
        answer4: "2",
        correct: 4
    },

    {
        question: "Who invented Javascript?",
        answer1: "Elon Musk",
        answer2: "Steve Jobs",
        answer3: "Brendan Eich",
        answer4: "Bill Gates",
        correct: 3
    },

    {
        question: "When was Javascript invented?",
        answer1: "1997",
        answer2: "1995",
        answer3: "2001",
        answer4: "1989",
        correct: 2
    },
]