//set variables
//=====================================================================================================
var wins;
var losses;
var theClock;
var questionCounter = 0;
var timer = 30;

var allQuestions = [
    {
        question: "Who wrote the Declaration of Independence?",
        answers: {
            a: "George Washington",
            b: "John Adams",
            c: "Thomas Jefferson",
            d: "James Madison"
        },
        correctAnswer: "c"
    },
    {
        question: "Which of these founding fathers did not sign the U.S. Constitution?",
        answers: {
            a: "Thomas Jefferson",
            b: "Alexander Hamilton",
            c: "Benjamin Franklin",
            d: "George Washington"
        },
        correctAnswer: "d"
    }
];
//=====================================================================================================


//create game functions
//=====================================================================================================

//create initial start screen
function initialScreen() {
    startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
    $("#quiz").html(startScreen);
}

function generateTimeoutLoss() {

}

function generateWin() {

}

function generateLoss() {

}

function generateHTML() {

    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span> seconds.</p>"
        +
        "<p>" + allQuestions[questionCounter].question + "</p>"
        +
        "<p class='answer'>" + allQuestions[questionCounter].answers.a + "</p>"
        +
        "<p class='answer'>" + allQuestions[questionCounter].answers.b + "</p>"
        +
        "<p class='answer'>" + allQuestions[questionCounter].answers.c + "</p>"
        +
        "<p class='answer'>" + allQuestions[questionCounter].answers.d + "</p>";
    
    $("#quiz").html(gameHTML);
}

function wait() {
    if (questionCounter < allQuestions.length) {
        questionCounter++;
        generateHTML();
        timer = 30;
        timerWrapper();
    }
    else {
        finalScreen();
    }
}

function timerWrapper() {
    theClock = setInterval(timeLeft, 1000);
    function timeLeft() {
        if (timer === 0) {
            clearInterval(theClock);
            generateTimeoutLoss();
        }
        if (timer > 0) {
            timer--;
        }
        $(".timer").html(timer);
    }
}

function finalScreen() {

}

function resetGame() {
    questionCounter = 0;
    wins = 0;
    losses = 0;
    timer = 0;
    generateHTML();
    timerWrapper();
}
//=====================================================================================================


//game code

$(document).ready(function () {
    
    //generates an initial start screen
    initialScreen();

    //When start button is clicked generate HTML for quiz
    $("body").on("click", ".start-button", function () {

        generateHTML();

        timerWrapper();

    });

    //When answer is clicked check if true. Win/lose accordingly
    $("body").on("click", ".answer", function (event) {
        clickedAnswer = $(this).name;
        console.log(clickedAnswer);
        if (clickedAnswer === correctAnswer[questionCounter]) {
            clearInterval(theClock);
            generateWin();
        }
        else {
            clearInterval(theClock);
            generateLoss();
        }
    });

    //When game is over all restart
    $("body").on("click", ".reset-button", function () {
        resetGame();
    });

});