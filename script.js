document.addEventListener('DOMContentLoaded', function () {
    const questionContainer = document.getElementById('question-container');
    const answerForm = document.getElementById('answer-form');
    const userAnswerInput = document.getElementById('user-answer');
    const submitButton = document.getElementById('submit-button');
    const nextButton = document.getElementById('next-button');
    const scoreDisplay = document.getElementById('score');
    const failedQuestionsContainer = document.getElementById('failed-questions-container');

    const questions = [
        {
            question: 'What is 2 + 2?',
            correctAnswer: '4'
        },
        {
            question: 'What is the capital of France?',
            correctAnswer: 'Paris'
        },
        {
            question: 'How many months are in 1 year',
            correctAnswer: '12'
        }
        // Add more questions here
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let failedQuestions = [];

    function startGame() {
        currentQuestionIndex = 0;
        score = 0;
        failedQuestions = [];
        showQuestion();
    }

    function showQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionContainer.innerText = currentQuestion.question;
    }

    function checkAnswer(userAnswer) {
        const currentQuestion = questions[currentQuestionIndex];
        const correctAnswer = currentQuestion.correctAnswer;
        if (userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
            score++;
            scoreDisplay.textContent = score;
        } else {
            failedQuestions.push({
                question: currentQuestion.question,
                userAnswer: userAnswer,
                correctAnswer: correctAnswer
            });
        }
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showQuestion();
        } else {
            endGame();
        }
    }

    function endGame() {
        alert(`Quiz ended! Your score is: ${score}`);
        displayFailedQuestions();
        // You can add more actions here if needed
    }

    function displayFailedQuestions() {
        failedQuestionsContainer.innerHTML = '';
        failedQuestions.forEach((failedQuestion, index) => {
            const div = document.createElement('div');
            div.classList.add('failed-question');
            div.innerHTML = `
                <h4> Your Failed Questions <h4>
                <p>QuestionF ${index + 1}: ${failedQuestion.question}</p>
                <p>Your Answer: ${failedQuestion.userAnswer}</p>
                <p>Correct Answer: ${failedQuestion.correctAnswer}</p>
            `;
            failedQuestionsContainer.appendChild(div);
        });
    }

    function toggleSubmitButton() {
        submitButton.disabled = userAnswerInput.value.trim() === '';
    }

    answerForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const userAnswer = userAnswerInput.value;
        checkAnswer(userAnswer);
        userAnswerInput.value = ''; // Clear input field after submission
    });

    userAnswerInput.addEventListener('input', toggleSubmitButton);

    submitButton.addEventListener('click', function () {
        const userAnswer = userAnswerInput.value;
        checkAnswer(userAnswer);
        userAnswerInput.value = ''; // Clear input field after submission
    });

    nextButton.addEventListener('click', startGame);

    // Start the game when the page loads
    startGame();
});
