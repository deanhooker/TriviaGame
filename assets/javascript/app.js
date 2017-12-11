//set variables
//=====================================================================================================
var wins = 0;
var losses = 0;
var theClock;
var questionCounter = 0;
var timer = 12;

var allQuestions = [
    {
        question: "Who wrote the Declaration of Independence?",
        answers: {
            a: "George Washington",
            b: "John Adams",
            c: "Thomas Jefferson",
            d: "James Madison"
        },
        correctAnswer: "Thomas Jefferson"
    },
    {
        question: "What year was the US Constitution ratified?",
        answers: {
            a: "1776",
            b: "1777",
            c: "1781",
            d: "1788"
        },
        correctAnswer: "1788"
    },
    {
        question: "Which of these founding fathers did not sign the U.S. Constitution?",
        answers: {
            a: "Thomas Jefferson",
            b: "Alexander Hamilton",
            c: "Benjamin Franklin",
            d: "George Washington"
        },
        correctAnswer: "Thomas Jefferson"
    },
    {
        question: "Which of these was one of the original 13 colonies?",
        answers: {
            a: "Maine",
            b: "Vermont",
            c: "West Virginia",
            d: "Georgia"
        },
        correctAnswer: "Georgia"
    },
    {
        question: "What year did Lewis and Clark set out on their famous expedition to reach the Pacific?",
        answers: {
            a: "1804",
            b: "1812",
            c: "1820",
            d: "1826"
        },
        correctAnswer: "1804"
    },
    {
        question: "Which of the following States does not have any territory acquired in the Lousiana Purchase?",
        answers: {
            a: "Colorado",
            b: "Oklahoma",
            c: "Tennessee",
            d: "Minnesota"
        },
        correctAnswer: "Tennessee"
    },
    {
        question: "Who was president during World War One?",
        answers: {
            a: "Woodrow Wilson",
            b: "Dwight Eisenhower",
            c: "Theodore Roosevelt",
            d: "Calvin Coolidge"
        },
        correctAnswer: "Woodrow Wilson"
    },
];
//=====================================================================================================


//create game functions
//=====================================================================================================

//create initial start screen
function initialScreen() {
    startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
    $("#quiz").html(startScreen);
}

function generateWin() {
    wins++;
    $("#quiz").html("Correct!");
    setTimeout(wait, 2500);
}

function generateLoss() {
    losses++;
    if (timer === 0) {
        $("#quiz").html("Time's up!");
    }
    else {
        $("#quiz").html("Wrong :(");
    }
    setTimeout(wait, 2500);
}

function generateHTML() {

    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>12</span> seconds.</p>"
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
    console.log(questionCounter);
    if (questionCounter < allQuestions.length -1) {
        questionCounter++;
        generateHTML();
        timer = 12;
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
            generateLoss();
        }
        if (timer > 0) {
            timer--;
        }
        $(".timer").html(timer);
    }
}

function finalScreen() {
    gameHTML = "<h2>Game Over!</h2>"
        +
        "<p>Correct Answers: " + wins + "</p>"
        +
        "<p>Incorrect Answers: " + losses + "</p>"
        +
        "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Click to Play Again</a></p>";
    $("#quiz").html(gameHTML);
}

function resetGame() {
    questionCounter = 0;
    wins = 0;
    losses = 0;
    timer = 12;
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
        clickedAnswer = $(this).text();
        console.log(clickedAnswer);
        if (clickedAnswer === allQuestions[questionCounter].correctAnswer) {
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