const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');

let currentQuestionIndex, score;

const questions = [
    {
        question: 'What is the capital of France?',
        answers: [
            { text: 'Berlin', correct: false },
            { text: 'Madrid', correct: false },
            { text: 'Paris', correct: true },
            { text: 'Lisbon', correct: false }
        ]
    },
    {
        question: 'Which planet is known as the Red Planet?',
        answers: [
            { text: 'Earth', correct: false },
            { text: 'Mars', correct: true },
            { text: 'Jupiter', correct: false },
            { text: 'Saturn', correct: false }
        ]
    },
    {
        question: 'What is the capital of india?',
        answers: [
            { text: 'Bangole', correct: false },
            { text: 'Mumbai', correct: false },
            { text: 'Delhi', correct: true },
            { text: 'Goa', correct: false }
        ]
    },
    {
        question: 'What is the color of Banana?',
        answers: [
            { text: 'Blue', correct: false },
            { text: 'Green', correct: false },
            { text: 'Yellow', correct: true },
            { text: 'Pink', correct: false }
        ]
    },
    {
        question: 'What is the color of Moon?',
        answers: [
            { text: 'Black', correct: false },
            { text: 'Grren', correct: false },
            { text: 'White', correct: true },
            { text: 'Brown', correct: false }
        ]
    },
    {
        question: 'What is the name of PM of India ?',
        answers: [
            { text: 'Rahul', correct: true },
            { text: 'Modiji', correct: false },
            { text: 'Karina', correct: false },
            { text: 'Susmita', correct: false }
        ]
    },
    // Add more questions as needed
];

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.innerText = score;
    nextButton.classList.add('hide');
    showQuestion();
}

function showQuestion() {
    resetState();
    const question = questions[currentQuestionIndex];
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
        score++;
        scoreElement.innerText = score;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        nextButton.innerText = 'Restart';
        nextButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

nextButton.addEventListener('click', () => {
    if (questions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        startGame();
    }
});

startGame();
