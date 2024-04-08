// Declare all variables at the top of the scope
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;

// Use strict equality checks
$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

//
function nextSequence() {
    $("h1").html("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level++;
}

// Use event delegation for dynamic elements
$("div[type='button']").on("click", function(evt) {
    var userChosenColor = evt.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress("#" + userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

//
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.oncanplaythrough = function() {
        audio.play().catch(function(error) {
            console.log('Play error: ', error);
        });
    }
    audio.load();
}

function animatePress(currentColor) {
    $(currentColor).addClass('pressed');
    setTimeout(function(){
        $(currentColor).removeClass('pressed');
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
        }
    } else {
        gameOver();
        startOver();
    }
}

function gameOver() {
    $("h1").html("Game Over, Press Any Key to Restart");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}