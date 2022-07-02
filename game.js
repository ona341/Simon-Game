
function nextSequence (){
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour)
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level " + level);
}

function playSound (name){

    var audio = new Audio('./sounds/'+name+'.mp3');
    audio.play();

}
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
}
function startOver(){
  started = false
  gamePattern = []
  level = 0
}
function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel])
  {
    console.log("Success!")
    if (gamePattern.length === userClickedPattern.length ){
      setTimeout(nextSequence, 1000);

      userClickedPattern = []
    }
  }
else{
  console.log("Wrong!",gamePattern,userClickedPattern)
  playSound("wrong")
  $("body").addClass("game-over");
  setTimeout(function (){
    $("body").removeClass("game-over")},200)
    $("#level-title").text("Game Overr! :( Press any key to restart!");
    startOver();
  }

}

var userClickedPattern=[];
var buttonColours = ["red", "blue", "green", "yellow"];
var started=false;
var level = 0;
var gamePattern = [];

$(document).keypress(function(){
    if (!started)
    {
      nextSequence();
     $("#level-title").text("Level " + level);
            started = true
        };
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length -1)


});
