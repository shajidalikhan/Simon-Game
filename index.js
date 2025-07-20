let gamePattern = [];
let userClickedPattern = [];
let clickCount = 0;
let buttonColours = ["red", "blue", "green", "yellow"];
let level = 0;
let device = detectDevice();
if (device == "Mobile") {
  $("#level-title").text("Click here start");
  $("h1").on("click", init.bind(event));
} else {
  $(document).on("keydown", init.bind(event));
}

function init(event) {
  if (level == 0) {
    userClickedPattern = [];
    clickCount = 0;
    let randomChosenColor = nextSequence();
    gamePattern.push(randomChosenColor);
    $("." + buttonColours[randomChosenColor])
      .fadeOut()
      .fadeIn();
    let sound = playSound(buttonColours[randomChosenColor]);
    sound.play();
  }
}

$(".btn").on("click", function (event) {
  let userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  let clickSound = playSound(userChosenColour);
  clickSound.play();
  animatePress(userChosenColour);
  checkAnswer(clickCount);
  clickCount++;
});

function detectDevice() {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  )
    return "Mobile";
  else return "Not-Mobile";
}

function checkAnswer(click) {
  if (userClickedPattern[click] != buttonColours[gamePattern[click]]) {
    if(device=="Mobile")failedMobile();
    else failed();
  } else {
    if (click + 1 == level) setTimeout(sucess, 250);
  }
}

function sucess() {
  clickCount = 0;
  let randomChosenColor = nextSequence();
  gamePattern.push(randomChosenColor);
  for (let i = 0; i < gamePattern.length; i++) {
    setTimeout(function () {
      $("." + buttonColours[gamePattern[i]])
        .fadeOut(200)
        .fadeIn(200);
      let sound = playSound(buttonColours[gamePattern[i]]);
      sound.play();
    }, 400 * i);
  }
  userClickedPattern = [];
}

function failed() {
  $("#level-title").text("Game Over, Press any key to restart.");
  $("body").addClass("game-over");
  let wrongSound = playSound("wrong");
  wrongSound.play();
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 100);
  startOver();
}

function failedMobile() {
  $("#level-title").text("Game Over, Click here restart.");
  $("body").addClass("game-over");
  let wrongSound = playSound("wrong");
  wrongSound.play();
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 100);
  startOver();
}

function startOver() {
  userClickedPattern = [];
  gamePattern = [];
  level = 0;
  clickCount = 0;
}

function animatePress(currenColour) {
  let button = $("#" + currenColour);
  button.addClass("pressed");
  setTimeout(function () {
    button.removeClass("pressed");
  }, 100);
}

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  return Math.floor(Math.random() * 4);
}

function playSound(string) {
  switch (string) {
    case "blue":
      return new Audio("./sounds/blue.mp3");
      break;
    case "green":
      return new Audio("./sounds/green.mp3");
      break;
    case "red":
      return new Audio("./sounds/red.mp3");
      break;
    case "yellow":
      return new Audio("./sounds/yellow.mp3");
      break;
    case "wrong":
      return new Audio("./sounds/wrong.mp3");
      break;
    default:
      console.log(string);
  }
}
