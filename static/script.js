const quizQuestions = [
    {
        imageUrl: "../images/B_Dome.jpeg",
        questionText: "Which label matches this image?",
        options: ["B Dome", "NAB", "Obs", "Another building"],
        correctIndex: 0
    },
    {
        imageUrl: "../images/NAB.jpeg",
        questionText: "Which label matches this image?",
        options: ["B Dome", "NAB", "Obs", "Another building"],
        correctIndex: 1
    },
    {
        imageUrl: "../images/Obs.jpeg",
        questionText: "Which label matches this image?",
        options: ["B Dome", "NAB", "Obs", "Another building"],
        correctIndex: 2
    }
];

const imageElement = document.getElementById("quiz-image");
const questionElement = document.getElementById("quiz-question");
const optionsGrid = document.getElementById("options-grid");
const resultMessage = document.getElementById("result-message");
const nextButton = document.getElementById("next-button");
let answered = false;

function getRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * quizQuestions.length);
    return quizQuestions[randomIndex];
}

function buildOptions(quiz) {
    optionsGrid.innerHTML = "";

    quiz.options.forEach((optionText, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "option-button";
        button.textContent = optionText;
        button.dataset.index = index;
        button.addEventListener("click", () => handleOptionClick(button, index, quiz));
        optionsGrid.appendChild(button);
    });
}

function handleOptionClick(button, index, quiz) {
    if (answered) {
        return;
    }

    answered = true;
    const correctIndex = quiz.correctIndex;
    const optionButtons = optionsGrid.querySelectorAll(".option-button");

    optionButtons.forEach((optionButton) => {
        optionButton.classList.add("selected");
        optionButton.disabled = true;
    });

    if (index === correctIndex) {
        button.classList.remove("selected");
        button.classList.add("correct");
        resultMessage.textContent = "Correct! Great choice.";
        resultMessage.className = "result-message correct";
    } else {
        button.classList.remove("selected");
        button.classList.add("incorrect");
        resultMessage.textContent = "Incorrect — the correct answer is " + quiz.options[correctIndex] + ".";
        resultMessage.className = "result-message incorrect";
        optionButtons[correctIndex].classList.add("correct");
    }

    showNextButton();
}

function showNextButton() {
    nextButton.style.display = "inline-flex";
    nextButton.disabled = false;
    nextButton.hidden = false;
}

function hideNextButton() {
    nextButton.style.display = "none";
    nextButton.disabled = true;
    nextButton.hidden = true;
}

function handleNextButtonClick() {
    loadQuiz();
    hideNextButton();
}

nextButton.addEventListener("click", handleNextButtonClick);

function loadQuiz() {
    answered = false;
    resultMessage.textContent = "";
    resultMessage.className = "result-message";

    const quiz = getRandomQuestion();
    imageElement.src = quiz.imageUrl;
    questionElement.textContent = quiz.questionText;
    buildOptions(quiz);
}

loadQuiz();
