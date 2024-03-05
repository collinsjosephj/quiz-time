//QUESTIONS
// All of the questions, choices, and answers
//Quiz questions referenced from my independent study on W3 Schools 
var questions = [
    {
        title: 'Inside which HTML element do we store our JavaScript?',
        choices: ['<js>', '<javascript>', '<script>', '<link>'],
        answer: '<script>',
    },
    {
        title: 'Which operator is used too assign a value to a variable?',
        choices: ['x', '*', 'myVar', '='],
        answer: '=',
    },
    {
        title: 'What is the correct way to write a Javascript array?',
        choices: [
            'var coffee = (1:"beans", 2:"arabica", 3:"sumatra")',
            'var coffee = "beans", "arabica", "sumatra"',
            'var coffee = 1 = ("beans"), 2 = ("arabica"), 3 = ("sumatra")',
            'var coffee = ["beans", "arabica", "sumatra"]',  
        ],
        answer: '["beans", "arabica", "sumatra"]',
    },
    {
        title: 'How do you write "Hello World" in an alert box?',
        choices: [
            'alert("Hello World");',
            'msgBox("Hello World");',
            'msg("Hello World");',
            'alertBox("Hello World");',
        ],
        answer: 'alert("Hello World");',
    },
    {
        title: 'How does a FOR loop start?',
        choices: [
            'for (i <= 5; i++)',
            'for (i = 0; i <= 5)',
            'for (i = 0; i <= 5; i++)',
            'for i = 1 to 5',
        ],
        answer: 'for (i = 0; i <= 5; i++)'
    },
];

var currentQuestionIndex = 0;
var time = questions.length * 15;
var timeRem = time
var correctAnswers = 0;

var questionsEl = document.getElementById('questions');
const timerEl = document.getElementById('count');
const choicesEl = document.getElementById('choices');
const startBtn = document.getElementById('start');
const submitBtn = document.getElementById('submit');
const initialsEl = document.getElementById('initials');
const feedbackEl = document.getElementById('feedback');


// Function to initiate beginning of quiz
const startGame = () => {
    var startScreenEl = document.getElementById('start-screen');
    startScreenEl.setAttribute('class', 'hide');
    questionsEl.classList.remove('hide');
    timerEl.textContent = time;
    startTimer();
    displayQuestion();
};
    startBtn.addEventListener('click', startGame);

// The timer function that starts on startGame
var timerId;
function startTimer() {
    timeRem = questions.length * 15;
    timerId = setInterval(countDown, 1000);
};

function countDown() {
    timeRem--;
    timerEl.textContent = timeRem;
    if (timeRem <= 0) {
        clearInterval(timerId);
        stopQuiz();
    }
}
// Display question function below
function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    // Clears the questions title for previous question
    questionsEl.innerHTML = '';
    const questionTitle = document.createElement('h2');
    questionTitle.textContent = currentQuestion.title;
    questionsEl.appendChild(questionTitle);
    // Display choices
    choicesEl.innerHTML = '';
    currentQuestion.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.addEventListener('click', selAnswer);
        choicesEl.appendChild(button);
    });
}
// Logic for right/wrong answers
// Referenced from Main
function selAnswer(e) {
    var buttonEl = e.target;
    if (!buttonEl.matches('button')) {
        return;
    }
    // Wait for the currentQuestionIndex to be updated before doing the comparison
    setTimeout(() => {
        if (currentQuestionIndex < questions.length && buttonEl.textContent.toString() !== questions[currentQuestionIndex].answer.toString()) {
            countDown(15 * 1000);
            if (timeRem < 0) {
                timeRem = 0;
            }
            feedbackEl.textContent = 'Incorrect!';
        } else {
            feedbackEl.textContent = 'Correct';
            correctAnswers++;
        }
        feedbackEl.setAttribute('class', 'feedback');
        setTimeout(function () {
        feedbackEl.setAttribute('class', 'feedback hide');
        }, 1000);

        currentQuestionIndex++;
        // to see if we have any questions left
        if (timeRem <= 0 || currentQuestionIndex === questions.length) {
            stopQuiz();
        } else {
            displayQuestion();
        }
    }, 0);
}
// Function that will end the game 
function stopQuiz() {
    clearInterval(timerId);
    const endScreenEl = document.getElementById('end-screen');
    endScreenEl.classList.remove('hide');

    const finalScoreEl = document.getElementById('final-score');
    questionsEl.classList.add('hide');
    choicesEl.classList.add('hide');
    finalScoreEl.textContent = `You got ${correctAnswers} out of 5 correct answers`;
}
// Function to save score to local storage and to have user input initials
function saveScore() {
    const initials = initialsEl.value.trim();
    if (initials.length == 0 ) {
        alert('Please enter your initials')
        return;
    }
    const finalScore = `${correctAnswers} of 5`;
    const playerScore = {
        initials,
        finalScore
    };
    const scoreString = JSON.stringify(playerScore);
    //Saves the string to local storage
    localStorage.setItem('highscores', scoreString);
    window.location.href = "quiz-time/highscores.html"
};

// Referenced from Main to optimize my code 
function wrapUp(e) {
    if ( e.key === 'Enter' ) {
        saveScore();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    submitBtn.onclick = saveScore;
});

startBtn.onclick = startGame;
choicesEl.onclick = selAnswer;
initialsEl.onkeyup = wrapUp;
