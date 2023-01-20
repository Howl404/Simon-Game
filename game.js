const buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let keyWasPressed = false;
let level = 0;

$(document).keydown(function () {
  if (!keyWasPressed) {
    $("h1")[0].innerHTML = `Level ${level}`;
    nextSequence();
    keyWasPressed = true;
  }
});

$(".btn").click(function () {
  userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animate(userChosenColour, "pressed", 100);

  checkAnswer(userClickedPattern.length - 1);
});

function startOver() {
  level = 0;
  gamePattern = [];
  keyWasPressed = false;
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("nice");

    if (userClickedPattern.length === gamePattern.length) {
      // game continue
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    let wrong = new Audio(`sounds/wrong.mp3`)
    wrong.volume = 0.2;
    wrong.play();
    $(`body`).addClass(`game-over`);
    setTimeout(function () {
      $(`body`).removeClass(`game-over`);
    }, 200);
    startOver();
    $("h1")[0].innerHTML = `Game Over, Press Any Key to Restart`;
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;

  $("h1")[0].innerHTML = `Level ${level}`;

  randomNumber = Math.floor(Math.random() * 4);

  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  playSound(randomChosenColour);

  animate(randomChosenColour, "pressed", 100);
}

// * Pulsation
// $(`#${randomChosenColour}`).fadeTo(100, 0.3, function () {
//   $(this).fadeTo(500, 1.0);
// });

function playSound(name) {
  let music = new Audio(`sounds/${name}.mp3`
  )
  music.volume = 0.2;
  music.play();
}

function animate(currentColour, className, time) {
  $(`#${currentColour}`).addClass(`${className}`);
  setTimeout(function () {
    $(`#${currentColour}`).removeClass(`${className}`);
  }, time);
}
