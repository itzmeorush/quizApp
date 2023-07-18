const question = [
    {
        question: 'Which is largest animal in the world?',
        answers: [
            {text:'shark', correct: false},
            {text:'Blue Whale', correct: true},
            {text:'Pirana', correct: false},
            {text:'Dolphine', correct: false}
        ]
    },
    {
        question: 'Which is largest desert in the world?',
        answers: [
            {text:'Kalahari', correct: false},
            {text:'Gobi', correct: false},
            {text:'Sahara', correct: false},
            {text:'Antarctica', correct: true}
        ]
    },
    {
        question: 'Which is smallest continent in the world?',
        answers: [
            {text:'Asia', correct: false},
            {text:'Australia', correct: true},
            {text:'Arctic', correct: false},
            {text:'Africa', correct: false}
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButton = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex=0;

let Score = 0;

function startQuiz(){
     currentQuestionIndex=0;
     Score = 0;
     nextButton.innerHTML = "Next";
     showQuestion();

}

 function showQuestion(){
    resetState()
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', function(e){
            const selectedBtn = e.target;
            const isCorrect = selectedBtn.dataset.correct === 'true';
            if(isCorrect){
                selectedBtn.classList.add('correct');
                Score++;
            }else{
                selectedBtn.classList.add('incorrect')
            }
            Array.from(answerButton.children).forEach(button =>{
                if(button.dataset.correct ===true){
                    button.classList.add('correct');
                }
                button.disabled = true;
            });
            nextButton.style.display = "block";
        })
    });
 }

 function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
 }

 function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${Score} out of ${question.length}`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = 'block';
 }

 function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<question.length){
        showQuestion();
    }else{
        showScore();
    }
 }

 nextButton.addEventListener('click', ()=>{
    if(currentQuestionIndex< question.length){
        handleNextButton();
    }else{
        startQuiz();
    }
 })
startQuiz();
