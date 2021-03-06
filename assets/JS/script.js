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
let currentQuestion = "";
let lastHighScore = "";

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
        question: "How many boolean values are there in Javascript?",
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

    {
        question: "How is an external JS file linked",
        answer1: "<script>",
        answer2: "<a>",
        answer3: "<body>",
        answer4: "<footer>",
        correct: 1
    },

    {
        question: "What is bootstrap used for?",
        answer1: "HTML",
        answer2: "CSS",
        answer3: "JavaScript",
        answer4: "JQuery",
        correct: 2
    },

    {
        question: "What is 2 x 4?",
        answer1: "2",
        answer2: "4",
        answer3: "8",
        answer4: "24",
        correct: 3
    },

    {
        question: "What is 16/4?",
        answer1: "2",
        answer2: "0",
        answer3: "8",
        answer4: "4",
        correct: 4
    },

    {
        question: "Who is the Ashes played between?",
        answer1: "England and New Zealand",
        answer2: "New Zealand and Australia",
        answer3: "England and Australia",
        answer4: "Australia and South Africa",
        correct: 3
    },
]

var timeLeft = 80;
var timeInterval = ""

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
    timeInterval = setInterval(function (){
        if (timeLeft >= 1){
            timerEl.textContent = "Time: " + timeLeft
            timeLeft--;
        } else {
            timerEl.textContent = "Time: " + timeLeft;
            clearInterval(timeInterval);
            highScoresContainerEl.setAttribute("style", "display:block");
            qAndAnsEl.setAttribute("style", "display:none");
            score = 0
            localStorage.setItem("lastScore", score);
            lastHighScore = localStorage.getItem("lastScore");
            finalScore.innerText = lastHighScore;
        }

    }, 1000);
    currentQuestionIndex = 0;
    showQuizQues();
    
}

function showQuizQues() {

    //if current index matches length of array of questions, show final page where score is shown, and timer will stop
    if (currentQuestionIndex == quizQuestions.length){
        highScoresContainerEl.setAttribute("style", "display:block");
        qAndAnsEl.setAttribute("style", "display:none");
        timerEl.textContent = "Time: " + timeLeft
        clearInterval(timeInterval)
        return
    };    
    
    // set variable to pick question from array of questions and then show this question
    currentQuestion = quizQuestions[currentQuestionIndex]
    questionsEl.innerText = currentQuestion.question;

    // allocate answer from array to match with data number so right answers show with right question
    chosenAnswer.forEach((chosen) => {
        var answer = chosen;
        var number = answer.dataset["number"];
        answer.innerText = currentQuestion["answer" + number];
    })

    // increase current question index by one each time so that when this question is answered the next question will appear   
    currentQuestionIndex = currentQuestionIndex + 1;
}

//when answer is clicked it will move to next question as function to show questions will run again with the most recent question removed
function questionClick(){

    chosenAnswer.forEach((click) => {
        var answer = click;
        //when answer is clicked the number allocated to the button matches with the number allocated to the answer to work out if correct or not
        answer.addEventListener("click", function(k){
            var selectedOption = k.target;
            var selectedAnswer = selectedOption.dataset["number"];

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
                setTimeout(function(){
                    rightEl.setAttribute("style", "display:none")
                }, 1000)
                
            } else {
                wrongEl.setAttribute("style", "display:block");
                setTimeout(function(){
                    wrongEl.setAttribute("style", "display:none");
                }, 1000)
            }
            showQuizQues()

            //score is logged as the time left when question index matches last question from array of questions, code placed above in beginQuiz function where if quiz not finished the score will log as 0
            if (currentQuestionIndex == quizQuestions.length){
                score = timeLeft;
            }

            //saves score to local storage and displays final score to user
            localStorage.setItem("lastScore", score);
            lastHighScore = localStorage.getItem("lastScore");
            finalScore.innerText = lastHighScore + "!";

        })
    })
}

//call function so that when answer is clicked the timer will adjust accordingly, the next question will be shown from the arry and if at the end of quiz the score will be allocated
questionClick()
