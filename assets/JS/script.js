// - Landing page has title followed by some text describing the game - DONE
// - Start button on page will then hide this text and show first question when pressed - DONE
// - questions and answers are hidden until start is pressed - DONE
// - questions will only appear one at a time and next question won't appear until previous one answered - DONE
// - timer in top corner that begins when start is pressed (set interval) - DONE
// - need to then show question with four answer buttons for user to select one - DONE
// - once first question is answered this then shows whether correct or incorrect for brief period (use interval) - DONE
// - will then move to next question and display this with first question hidden - DONE
// - This will repeat for however many questions written - DONE
// - if question is answered incorrectly the timer will reduce by 10 seconds - DONE
// - once timer is over (clear interval) or all questions are answered the game will end - DONE
// - once time is up will display score and user will input initials using form and submit button - DONE
// - highscores page linked to main page - this is the time html changes - DONE
// - once initials are entered and submit pressed will be taken to highscore.html - DONE
// - this will display all scores save through local storage - DONE
// - on highscore page you can either go back to main page to start again or clear highscores - DONE
// - if highscores cleared the leaderboard disappears and you can then click button to go back - DONE
// - main page once quiz starts will have highscores link in top corner, timer in other corner and then question - DONE
// - html will not change as questions are answered - DONE

const startBtnEl = document.querySelector("#startButton");
const landingEl = document.querySelector("#landingPage");
const containerEl = document.querySelector(".container");
const qAndAnsEl = document.querySelector("#qAndAns");
const questionsEl = document.querySelector("#questions")
const answerEl = document.querySelector("#answers");
const timerEl = document.querySelector("#intervalTimer")
const returnBtnEl = document.querySelector("#returnHome");
const clearEl = document.querySelector("clearHS");
const leaderboard = document.querySelector(".high-score");
const chosenAnswer = Array.from(document.getElementsByClassName("chosenAns"));
const rightEl = document.querySelector("#right");
const wrongEl = document.querySelector("#wrong");
const highScoresContainerEl = document.querySelector("#highScoresContainer");
const usernameEl = document.querySelector("#username");
const submitScoreEl = document.querySelector("#submitScore");
const finalScore = document.querySelector("#finalScore");


let score = 0;
let currentQuestionIndex = "";
let currentQuestion = {};
let selectedAnswer = {};
let lastHighScore = "";

// - start button click event to set timer going and display first question
startBtnEl.addEventListener("click", beginQuiz);

//won't let user submit until initials entered
usernameEl.addEventListener("keyup", function(){
    submitScoreEl.disabled = !usernameEl.value;
})

//turn highscores into an objedct so can be accessed for leaderboard on other page
const hS = JSON.parse(localStorage.getItem("hS")) || [];

//prevent form default when entering initials
submitScoreEl.addEventListener("click", function(event){
    event.preventDefault();
    //saved scores to create high score list
    const savedScores = {
        score: lastHighScore,
        initials: usernameEl.value,
    }
    //add saved highscores to an array
    hS.push(savedScores);
    
    //sort highscores into list based on highest score first
    hS.sort(function(a,b){
        return b.score-a.score
    })

    //sets highscores into a string in local storage to then be presented on highscores page
    localStorage.setItem("hS", JSON.stringify(hS));
    //when submit is pressed takes you to highscore page
    location.assign("highscores.html");
})

var timeLeft = 60;

//function to for quiz to start that runs when click event above is ran
function beginQuiz(){
    
    //changes display from intro landing page to first question when function runs
    if (qAndAnsEl.display == "none"){
        qAndAnsEl.setAttribute("style", "display:none");
        landingEl.setAttribute("style", "display:block");
    } else {
        qAndAnsEl.setAttribute("style", "display:block");
        landingEl.setAttribute("style", "display:none");
    }

    //interval set with text content to show how long is left, also changes display to show submit area for highscores once done
    var timeInterval = setInterval(function (){
        if (timeLeft >= 1){
            timerEl.textContent = "Time: " + timeLeft
            timeLeft--;
        } else {
            timerEl.textContent = timeLeft;
            clearInterval(timeInterval);
            highScoresContainerEl.setAttribute("style", "display:block");
            qAndAnsEl.setAttribute("style", "display:none");
        }

        //stops timer when gets to last question rather than after last question
        // if (quizQuestions.length === 0){
        //     clearInterval(timeInterval);
        // }

    }, 1000);
    currentQuestionIndex = 0;
    showQuizQues();
    
}

function showQuizQues() {

    //if no questions left will show final page where score is shown
    if (quizQuestions.length === 0){
        highScoresContainerEl.setAttribute("style", "display:block");
        qAndAnsEl.setAttribute("style", "display:none");
        timerEl.setAttribute("style", "display:none") //check stopping timer when no questions left as timer just stopped above when got to last questionm
        return
    };

    //set variable to pick question from array below and then show this question
    currentQuestion = quizQuestions[currentQuestionIndex]
    questionsEl.innerText = currentQuestion.question;

    //loop to run through the question and answers for each value in array and show corresponding answers with question and button on html page
    for (var i = 0; i < chosenAnswer.length; i++){
        var answer = chosenAnswer[i];
        var number = answer.dataset["number"];
        answer.innerText = currentQuestion["answer" + number];
    }

    //removes question from array each time one answered
    quizQuestions.splice(currentQuestionIndex, 1)
}

//when answer is clicked it will move to next question as function to show questions will run again with the most recent question removed
var questionClick = function(){
    for (var j = 0; j < chosenAnswer.length; j++){
        var answer = chosenAnswer[j];
        //when answer is clicked the number allocated to the button matches with the number allocated to the answer to work out if correct or not
        answer.addEventListener("click", function(k){
            var selectedOption = k.target;
            selectedAnswer = selectedOption.dataset["number"];

            //need quiz to end if time under 10 seconds and another wrong answer or keep going if over 10 seconds
            if (selectedAnswer != currentQuestion.correct && timeLeft > 10){
                timeLeft-=10
            } else if (selectedAnswer != currentQuestion.correct && timeLeft <= 10){
                timeLeft = 0
            } else {
                timeLeft--
            }
            
            //show whether the last question the user got was right or wrong
            if (selectedAnswer == currentQuestion.correct){
                rightEl.setAttribute("style", "display:block");
                wrongEl.setAttribute("style", "display:none")
            } else {
                wrongEl.setAttribute("style", "display:block");
                rightEl.setAttribute("style", "display:none");
            }
            showQuizQues()

            //makes the score whatever the time left was - trying to make score show 0 if time up?
            //have an issue where if all questions are answered except the last it will set score on time penultimate question answered due to zero index?
            // if more than one question not answered sets score at 0 as intended however if all answered except last question will set score at time second to last answered
            if (quizQuestions.length === 0){
                score = timeLeft;
            }

            //if no time left then score will be 0
            if (timeLeft == 0){
                score = 0;
            }

            localStorage.setItem("lastScore", score);
            lastHighScore = localStorage.getItem("lastScore");
            finalScore.innerText = lastHighScore;
        })
    }
}

//call function to make it work
questionClick()

//quiz questions in array
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
        question: "What tag is used to add an external CSS file to HTML?",
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