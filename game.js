var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var start=false;
var level=0;

$(document).keypress(function(){
  if(!start)
  {
    $("#level-title").text("Level "+level);
    nextSequence();
    start=true;
    $("label").fadeOut();
    $("input").fadeOut();
  }

});
$(".btn").click(function() {
  var userChoosenColor = $(this).attr('id');
  userClickedPattern.push(userChoosenColor);
  playSound(userChoosenColor);
  animatePress(userChoosenColor);

  answerCheck(userClickedPattern.length-1);
  //console.log(userClickedPattern);

});

function nextSequence() {
userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+level);
  var randomnumber = Math.floor(Math.random() * 4);
  var randomChoosenColor = buttonColors[randomnumber];
  gamePattern.push(randomChoosenColor);
  console.log(gamePattern);
  $("#" + randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChoosenColor);
}

function playSound(name) {
  var audio = new Audio('sounds/' + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#"+currentColor).addClass("pressed");

  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed")},100);
}
function answerCheck(currentlevel)
{
if(gamePattern[currentlevel]===userClickedPattern[currentlevel])
{
  console.log("success");
  if(userClickedPattern.length===gamePattern.length)
  {
    setTimeout(function(){
      nextSequence();
    },1000);
  }}
  else{
    playSound("wrong");
    $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },500);
  $("h1").text("Game Over, Press Any Key to Restart");
  startOver();
  }
}
function startOver()
{
  level=0;
  gamePattern=[];
  start=false;
  $("input").html("");
  $("label").fadeIn();
  $("input").fadeIn();

}
