// Variables
const currentQuestionIndex = 0;
const time = questions.length * 15;
var timerId;

const questionsEl = document.getElementById('questions');
const timerEl = document.getElementById('count');
const choicesEl = document.getElementById('choices');
const startBtn = document.getElementById('start');
//const submitBtn = document.getElementById('submit');
//const initialsEl = document.getElementById('initials');
//const feedbackEl = document.getElementById('feedback');

// Add event listener to call startGame() when the start button is pressed
//startBtn.addEventListener('click', startGame);
// QUESTIONS

// Function to initiate beginning of quiz
const startGame = () => {
    let startScreenEl = document.getElementById('start-screen');
    questionsEl.classList.remove('hide');
    timerEl.textContent = time;
    startTimer();
};
    startBtn.addEventListener('click', startGame);

// The timer function that starts on startGame
function startTimer() {
    this.intervalId = setInterval(countdown, 1000);
};

function countdown() {
    const htmlToChange = document.getElementById("countdown")
    let parsedCount= parseInt(htmlToChange.textContent)
    parsedCount--
    if(parsedCount<0){
        clearInterval(this.intervalId)
    }else{
        htmlToChange.textContent = parsedCount
    }
};
startTimer();
