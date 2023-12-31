const questions = [
    {
        question: "Who is famous singer?",
        answers: [
            { text: "Sidhu", correct: true},
            { text: "Aujla", correct: false},
            { text: "Gill", correct: false},
            { text: "Armaan", correct: false}
        ]
    },
    {
        question: "Who is famous actor?",
        answers: [
            { text: "Salmaan Khaan", correct: false},
            { text: "Amir Khaan", correct: false},
            { text: "Shahrukh Khan", correct: true},
            { text: "Debdas", correct: false}
        ]
    },
    {
        question: "Which is pink city?",
        answers: [
            { text: "Darjliin", correct: false},
            { text: "Jaipur", correct: true},
            { text: "Haidrabad", correct: false},
            { text: "Gobindgarh", correct: false}
        ]
    },
    {
        question: "What is capital of India?",
        answers: [
            { text: "Manikaran", correct: false},
            { text: "Amroh", correct: false},
            { text: "New Delhi", correct: true},
            { text: "Chandigarh", correct: false}
        ]
    },

];

const quesElement = document.getElementById("question");
const ansBtns = document.querySelector(".ans-btns");
const nextBtn = document.getElementById("next-btn");

    let currentQuesIndex = 0;
    let score =0;

function startQuiz() {
    currentQuesIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
     resetState();
    let currentQues = questions[currentQuesIndex];
    let quesNo = currentQuesIndex +1;
    quesElement.innerHTML = `${quesNo}. ${currentQues.question}`;

    currentQues.answers.forEach(answer =>{
        const btn = document.createElement("button");
        btn.innerHTML = answer.text;
        btn.classList.add("btn");
        ansBtns.appendChild(btn);

        if(answer.correct){
            btn.dataset.correct = answer.correct;
        }

        btn.addEventListener("click", selectAns);
    });
      
}
function resetState() {
    nextBtn.style.display = "none";
    while(ansBtns.firstChild) {
        ansBtns.removeChild(ansBtns.firstChild);
    }
}

function selectAns(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(ansBtns.children).forEach(
        btn=>{
            if(btn.dataset.correct === "true"){
                btn.classList.add("correct");
            }
            btn.disabled = true;
        }
    );
    nextBtn.style.display = "block";
}

function showScore(){
    resetState();
    quesElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again!";
    nextBtn.style.display = "block";
}

function handleNextButton(){
    currentQuesIndex++;
    if(currentQuesIndex< questions.length){
        showQuestion();
    }
    else {
        showScore();
    }
}


nextBtn.addEventListener("click", ()=>{
    if(currentQuesIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();



