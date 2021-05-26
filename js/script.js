"use strict";
window.onload = () => {
  const quizNode = document.querySelector(".quiz");

  const questionHolder = document.querySelector(".quiz__question");
  const answersHolder = document.querySelector(".quiz__answers");

  const startBtn = document.querySelector("#quiz-start");
  const nextBtn = document.querySelector("#quiz-next");
  const endBtn = document.querySelector("#quiz-end");

  const hiddenClas = "_hidden";
  let quiz = [
    {
      question: "What does CSS stand for?",
      answers: [
        { text: "Colorful Style Sheets", correct: false },
        { text: "Cascading Style Sheets", correct: true },
        { text: "Creative Style Sheets", correct: false },
        { text: "Computer Style Sheets", correct: false },
      ],
    },
    {
      question:
        "What is the correct HTML for referring to an external style sheet?",
      answers: [
        { text: "<style src='mystyle.css'>", correct: false },
        {
          text: " <link rel='stylesheet' type='text/css' href='mystyle.css'>",
          correct: true,
        },
        { text: " <stylesheet>mystyle.css</stylesheet>", correct: false },
      ],
    },
    {
      question:
        "Where in an HTML document is the correct place to refer to an external style sheet?",
      answers: [
        { text: "In the <body> section", correct: false },
        { text: "In the <head> section", correct: true },
        { text: "At the end of the document", correct: false },
      ],
    },
    {
      question: "Which HTML tag is used to define an INTERNAL style sheet?",
      answers: [
        { text: "<script>", correct: false },
        { text: "<link>", correct: false },
        { text: "<css>", correct: false },
        { text: "<style>", correct: true },
      ],
    },
    {
      question: "Which HTML attribute is used to define inline styles?",
      answers: [
        { text: "class", correct: false },
        { text: "styles", correct: false },
        { text: "css", correct: false },
        { text: "style", correct: true },
      ],
    },
    {
      question: "Which is the correct CSS syntax?",
      answers: [
        { text: "body:color=black;", correct: false },
        { text: "{body;color:black}", correct: false },
        { text: "color:black;", correct: true },
        { text: "body {color:black;}", correct: true },
      ],
    },
    {
      question: "How do you insert a comment in a CSS file?",
      answers: [
        { text: "//this is a comment", correct: false },
        { text: "/* a comment */", correct: true },
        { text: "#comment", correct: false },
        { text: "//a comment//", correct: false },
      ],
    },
    {
      question: "Which property is used to change the background color?",
      answers: [
        { text: "background-color", correct: true },
        { text: "color", correct: false },
        { text: "bgcolor", correct: false },
        { text: "background", correct: true },
      ],
    },
    {
      question: "How do you select this element in CSS:\n<input type='text'> ",
      answers: [
        { text: "input.text", correct: false },
        { text: ".input", correct: false },
        { text: "[type='text']", correct: true },
        { text: "#text", correct: false },
      ],
    },
    {
      question: "How to target the pressed button in CSS?",
      answers: [
        { text: "button:focus", correct: false },
        { text: "button:active", correct: true },
        { text: "button:onclick", correct: false },
        { text: "button:click", correct: false },
        { text: "button:hover", correct: false },
      ],
    },
  ];
  const countMax = quiz.length;
  let count = 0;
  let right = 0;
  let time = 15000; //15s
  let setTimeoutForTimer, setIntervalForTimer;
  const timerNode = document.querySelector(".quiz__timer-time");

  let answerBtnPrototype = document.createElement("button");
  answerBtnPrototype.classList.add("quiz__choice", "btn");

  startBtn.addEventListener("click", () => {
    startBtn.classList.add(hiddenClas);
    randomizeQuestions(quiz);
    createQuestion(count);
  });

  function randomizeQuestions(array) {
    array.sort(() => Math.random() - 0.5);
  }

  function createQuestion(count) {
    questionHolder.innerText = quiz[count].question;
    let trueOrFalse = quiz[count].answers.map((v) => {
      return v.correct;
    });
    quiz[count].answers.forEach((answer, index) => {
      let btn = answerBtnPrototype.cloneNode(true);
      btn.innerText = answer.text;
      btn.addEventListener("click", () => {
        clearInterval(setIntervalForTimer);
        clearTimeout(setTimeoutForTimer);

        revealAnswers(trueOrFalse);
        paintBackground(trueOrFalse[index]);
        isAnswerRight(trueOrFalse[index]);
        toggleControls();
      });
      answersHolder.append(btn);
    });
    startTimer(trueOrFalse);
  }

  function startTimer(trueOrFalse) {
    let interval = 50; //.05s
    let step = 100 / (time / interval);
    let width = 0;
    setIntervalForTimer = setInterval(updateTimer, interval);
    function updateTimer() {
      width += step;
      timerNode.style.width = `${width}%`;
    }
    setTimeoutForTimer = setTimeout(() => {
      clearInterval(setIntervalForTimer);
      revealAnswers(trueOrFalse);
      paintBackground(false);
      toggleControls();
    }, time);
  }

  function revealAnswers(trueOrFalse) {
    ++count;
    let answers = document.querySelectorAll(".quiz__choice");
    trueOrFalse.forEach((val, index) => {
      if (val) {
        answers[index].classList.add("_true");
      } else {
        answers[index].classList.add("_false");
      }
      answers[index].classList.add("_noclick");
    });
  }

  function paintBackground(boolean) {
    let color = boolean ? "_green" : "_red";
    quizNode.classList.add(color);
  }
  function isAnswerRight(boolean) {
    if (boolean) ++right;
  }

  function toggleControls() {
    if (count !== countMax) nextBtn.classList.toggle(hiddenClas);
    endBtn.classList.toggle(hiddenClas);
  }

  nextBtn.addEventListener("click", () => {
    toggleControls();
    clearAnswers();
    resetBackground();
    createQuestion(count);
  });

  function clearAnswers() {
    questionHolder.innerText = "";
    let answers = document.querySelectorAll(".quiz__choice");
    answers.forEach((answer) => {
      answer.remove();
    });
  }

  function resetBackground() {
    quizNode.classList.remove("_green", "_red");
  }

  endBtn.addEventListener("click", () => {
    resetAll();
  });

  function resetAll() {
    toggleControls();
    clearAnswers();
    resetBackground();
    questionHolder.innerText = `Questions: ${count}, right answers: ${right}.`;
    count = 0;
    right = 0;
    startBtn.classList.remove(hiddenClas);
  }
};
