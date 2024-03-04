const currentQuestionIndex = 0;
const time = questions.length * 15;
var timerId;

//const questionsEl = document.getElementById('questions');
const timerCount = document.getElementById('count');
const choicesEl = document.getElementById('choices');
const startBtn = document.getElementById('start');
const submitBtn = document.getElementById('submit');
const initialsEl = document.getElementById('initials');
const feedbackEl = document.getElementById('feedback');

//QUESTIONS
// All of the choices, and answer key
//Quiz questions referenced from my independent study on W3 Schools 
const questions = [
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

// Function to initiate beginning of quiz
const startGame = () => {
    var startScreenEl = document.getElementById('start-screen');
   // startScreenEl.classList.add('start');
    questionsEl.classList.remove('hide');
    timerCount.textContent = time;
    startTimer();
    displayQuestion();
};
    startBtn.addEventListener('click', startGame);

// The timer function that starts on startGame
function startTimer() {
    this.intervalId = setInterval(countdown, 1000);
};

function countdown() {
    const htmlToChange = document.getElementById("count")
    let parsedCount= parseInt(htmlToChange.textContent)
    parsedCount--;
    if(parsedCount<0){
        clearInterval(this.intervalId)
    }else{
        htmlToChange.textContent = parsedCount
    }
};
startTimer();

// Logic for right/wrong answers
function selAnswer (e) {
    const selChoice = e.target.textContent;
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (selChoice == correctAnswer) {
        feedbackEl.textContent = 'Correct!';
    }   else {
        feedbackEl.textContent = 'Wrong!'
    }
    if (currentQuestionIndex < questions.length){
        displayQuestion();
    } else {
        clearInterval(this.intervalId);
    }
};
// Display question function below
function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionsEl.innerHTML = currentQuestion.title;
    choicesEl.innerHTML = '';
    currentQuestion.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.addEventListener('click', selAnswer);
        choicesEl.appendChild(button);
    });
;}
