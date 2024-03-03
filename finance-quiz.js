const quizData = {
    "Budgets": {
        1: {
            question: "A budget deficit occurs when:",
            options: ["Income exceeds expenses", "Expenses exceed income", "Income equals expenses", "None of the above"],
            answer: "Expenses exceed income"
        },
        2: {
            question: "Which of the following is a fixed expense?",
            options: ["Groceries", "Rent", "Entertainment", "Dining out"],
            answer: "Rent"
        },
        3: {
            question: "Which of the following is an example of an operating expense?",
            options: ["Buying a new office building", "Purchasing inventory", "Paying employee salaries", "Investing in stocks"],
            answer: "Paying employee salaries"
        },
        // Add more questions for this category
    },
    "Rates and Percentages": {
        4: {
            question: "What is the formula to calculate the percentage increase or decrease between two values?",
            options: ["(New Value - Old Value) / Old Value", "(Old Value - new Value) / New Value", "(New Value / Old Value) * 100", "(Old Value / New Value) * 100"],
            answer: "(New Value - Old Value) / Old Value"
        },
        5: {
            question: "If an item depreciates by 10% each year, what percentage of its original value will it retain after 3 years?",
            options: ["30%", "27.1%", "70%", "72.9%"],
            answer: "72.9%"
        },
        6: {
            question: "If an investment grows by 5% in the first year and then shrinks by 10% in the second year, what is the overall percentage change?",
            options: ["-5.5%", "-3.5%", "-4.5%", "-7.5%"],
            answer: "-5.5%"
        },
        // Add more questions for this category
    },
    "Appreciation and Depreciation": {
        7: {
            question: "What does a negative appreciation rate indicate?",
            options: ["The value is increasing", "The value is decreasing", "The value is stable", "None of the above"],
            answer: "The value is decreasing"
        },
        8: {
            question: "Which of the following is an example of an appreciating asset?",
            options: ["It decreases", "It stays the same", "It increases", "It fluctuates"],
            answer: "It increases"
        },
        9: {
            question: "What happens to the value of an asset that appreciates?",
            options: ["Car", "House", "Smartphone", "Clothing"],
            answer: "House"
        },
        // Add more questions for this category
    },
    "Interest and Borrowing": {
        10: {
            question: "What is the formula to calculate simple interest?",
            options: ["Principal * Rate * Time", "Principal * Time / Rate", "Rate * Time / Principal", "Rate * Principal * Time"],
            answer: "Principal * Rate * Time"
        },
        11: {
            question: "What is the formula to calculate the compound interest?",
            options: ["Principal * Rate * Time", "Principal * (1 + Rate) ^ Time - Principal", "Principal * Rate * Time / 100", "(Principal + Rate) * Time"],
            answer: "Principal * (1 + Rate) ^ Time - Principal"
        },
        12: {
            question: "Which of the following is a type of borrowing where the borrower puts up an asset as collateral?",
            options: ["Unsecured loan", "Mortgage", "Payday loan", "Secured loan"],
            answer: "Secured loan"
        },
    }
    // Add more categories as needed
};

function loadQuestions() {
    const questionsElement = document.getElementById("questions");
    questionsElement.innerHTML = "";

    for (const category in quizData) {
        const categoryElement = document.createElement("h2");
        categoryElement.textContent = category;
        questionsElement.appendChild(categoryElement);

        for (const [number, data] of Object.entries(quizData[category])) {
            const questionElement = document.createElement("li");
            questionElement.classList.add("quiz-question");
            questionElement.setAttribute("data-question", data.question); // Add this line
            questionElement.innerHTML = `<strong>${data.question}</strong><br>`;

            for (const option of data.options) {
                questionElement.innerHTML += `<input type="radio" name="q${number}" value="${option}"> ${option}<br>`;
            }

            questionsElement.appendChild(questionElement);
        }
    }
}

function startQuiz() {
    loadQuestions();
}

function submitQuiz() {
    let totalScore = 0;

    for (const category in quizData) {
        for (const [number, data] of Object.entries(quizData[category])) {
            const userAnswer = document.querySelector(`input[name="q${number}"]:checked`);
            const correctAnswer = data.answer.trim().toLowerCase();
            const questionElement = document.querySelector(`li[data-question="${data.question}"]`);

            if (userAnswer) {
                const options = questionElement.querySelectorAll('input[type="radio"]');
                options.forEach(option => {
                    const optionLabel = option.parentElement;
                    const optionValue = option.value.trim().toLowerCase();

                    if (optionValue === correctAnswer) {
                        if (userAnswer.value.trim().toLowerCase() === correctAnswer) {
                            // Correct answer and selected: highlight in green and add 10 points
                            optionLabel.style.color = "green";
                            totalScore += 10;
                        }
                    } else {
                        if (userAnswer.value.trim().toLowerCase() === optionValue) {
                            // Incorrect answer and selected: highlight in red
                            optionLabel.style.color = "red";
                        }
                    }
                });
            }
        }
    }

    // Ensure the total score doesn't exceed 120
    totalScore = Math.min(totalScore, 120);

    const scoreElement = document.getElementById("score");
    if (!scoreElement) {
        const newScoreElement = document.createElement("p");
        newScoreElement.id = "score";
        document.body.appendChild(newScoreElement);
    }

    scoreElement.textContent = `Your Score: ${totalScore}/120`;

    return false; // Prevents the default form submission behavior
}

startQuiz();