// starting code 
var buttonColours = ['red','blue','green','yellow'];
var gamePattern = [];
var userClickedPattern = [];

var flag=false;
var level=0;

$(document).keypress(function(){
    if(!flag)
    {
        $("#level-title").text("Level "+level);
        nextSequence();
        flag=true;
    }
});

// creating a handler for click of button
$(".btn").click(function(event){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {
        console.log("success");
        if(userClickedPattern.length===gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else
    {
        console.log("wrong");
        var audio = new Audio('./sounds/wrong.mp3');
        audio.play();

        $('h1').text('Game Over, Press Any Key to Restart');

        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over');
        }, 200);

        
        startOver();
    }
}

function nextSequence()
{
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);

    randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Using jquery to select a button
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    
}

function animatePress(currentColour)
{
    $("."+currentColour).addClass("pressed");
    setTimeout(function() {
        $("."+currentColour).removeClass("pressed");
    }, 100);
}

function playSound(name)
{
    // playing audio
    var audio = new Audio('./sounds/'+name+'.mp3');
    audio.play();
}



function startOver()
{
    level=0;
    gamePattern=[];
    flag=false;
}





