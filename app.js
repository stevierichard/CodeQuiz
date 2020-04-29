$(document).ready(function () {
  var questions = [
    {
      question:
        "The size of the computer’s memory is measured by the number of?",
      answer: "(b).Bytes",
      options: ["(a).Memory Space", "(b).Bytes", "(c).RAM", "(d).ROM"],
    },
    {
      question: "The Operating System is a?",
      answer: "(a).System Software",
      options: [
        "(a).System Software",
        "(b).Application Software",
        "(c).Utility Software",
        "(d).Malware",
      ],
    },
    {
      question: "A Database is used to?",
      answer: "(a).Store and Organize data in records",
      options: [
        "(a).Store and Organize data in records",
        "(b).Store and Organize papers",
        "(c).Store and Organize records in files",
        "(d).Store and Organize records in fields",
      ],
    },
    {
      question: "What does the “R” in RAM stands for?",
      answer: "(d).Random",
      options: ["(a).Rewrite", "(b).Read", "(c).Readable", "(d).Random"],
    },
    {
      question:
        "The special formatting language used to create Web Pages is called:",
      answer: "(c).HTML",
      options: ["(a).COBOL", "(b).Perl", "(c).HTML", "(d).JAVA"],
    },
  ];
  var count = 0;
  var correctAnswers = 0;
  var wrongAnswers = 0;
  var totalScore = correctAnswers - wrongAnswers;
  var timeLeft = questions.length * 15;
  var restartGame = false;
  startTime();

  function startTime() {
    var timerInterval = setInterval(function () {
      timeLeft--;
      $("#timer").text(timeLeft);

      if (timeLeft === 0) {
        clearInterval(timerInterval);
        endGame();
      }
    }, 1000);
  }

  $("#results").hide();
  $("#scoreboard").hide();
  renderQuestion();

  function renderQuestion() {
    if (count === questions.length) {
      endGame();
    } else {
      $("#question").text(questions[count].question);
      $("#answerOptions").empty();

      for (var i = 0; i < questions[count].options.length; i++) {
        $("#answerOptions").append(
          `<button class="answerBtn">${questions[count].options[i]}</button>`
        );
      }
    }
    function endGame() {
      $("#game").hide();
      $("#results").show();
      $("#scoreboard").show();

      totalScore = correctAnswers - wrongAnswers;

      $("#correct").text(`You got ${correctAnswers} correct`);
      $("#wrong").text(`You got ${wrongAnswers} incorrect`);
      $("#total").text(`Your Total Score is ${totalScore}`);
    }

    $("#btnsubmit").on("click", function () {
      totalScore = correctAnswers - wrongAnswers;
      var userInitial = $("#userinitial").val().trim();
      localStorage.setItem(userInitial, totalScore);
    });
  }
  $(document).on("click", ".answerBtn", function () {
    if ($(this).text() === questions[count].answer) {
      correctAnswers++;
    } else {
      wrongAnswers++;
      timeLeft -= 5;
    }
    count++;
    renderQuestion();
  });
  $("#reset").on("click", function () {
    count = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    restartGame = true;
    timeLeft = questions.length * 15;

    $("#game").show();
    $("#results").hide();
    renderQuestion();
  });
});
