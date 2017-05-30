
var starLeft = 0, starTop = 0, score = [0, 0], init,
	bombLeft = 0, bombTop = 0;
var moveTimer, obstacleTimer;
var starRandomPos = [
	{left: 100, top: 50},
	{left: 200, top: 100},
	{left: 300, top: 150},
	{left: 400, top: 200},
	{left: 500, top: 250},
	{left: 600, top: 300},
	{left: 700, top: 450},
	{left: 800, top: 500},
	{left: 900, top: 550},
	{left: 1000, top: 600}
];
var serverMessages = [
	{message: "You have joined the game!", icon: "fa-sign-in"},
	{message: null, icon: "fa-sign-in"},
	{message: null, icon: "fa-star"},
	{message: null, icon: "fa-check"},
	{message: null, icon: "fa-check"}
];
var snake = {directie: 3, left: 0, top: 0};
var snake2= {left: 1450, top: 0, direction: 0}, snakeDirection = 3;
var obstacleHeight = 0;

function updateMessages() {
	var str = "";
	for(var i = 0; i < 5; i ++) {
		if(serverMessages[i].message == null) continue;
		str += "<li><i class = 'fa " + serverMessages[i].icon + " fa-li'></i> " + serverMessages[i].message + "</li>";
	}
	$("#messages").html(str);
}
function addMessage(msgText, msgIcon) {
	serverMessages.pop();
	serverMessages.unshift({message: msgText, icon: msgIcon});
	return 1;
}
function getDifference(x, y) {
	var diff = x - y;
	if(diff < 0) diff -= 2 * diff;
	return diff;
}
function update() {
	if(snakeDirection == 0) {
		snake.left -= 5.1;
		$("#snake").html('<i class = "fa fa-linux fa-3x"></i>');
	}
	else if(snakeDirection == 1) {
		snake.top -= 5.1;
		$("#snake").html('<i class = "fa fa-linux fa-3x"></i>');
	}
	else if(snakeDirection == 2) {
		snake.top += 5.1;
		$("#snake").html('<i class = "fa fa-linux fa-3x"></i>');
	}
	else if(snakeDirection == 3) {
		snake.left += 5.1;
		$("#snake").html('<i class = "fa fa-linux fa-3x"></i>');
	}
	if(snakeDirection == 0 && snake.left <= 0) snake.left = 1475;
	if(snakeDirection == 1 && snake.top <= 0) snake.top = 815 - obstacleHeight - 5;
	if(snakeDirection == 2 && snake.top >= 815) snake.top = 0;
	if(snakeDirection == 3 && snake.left >= 1450) snake.left = 0;
	$("#snake").stop(false, true).animate({left: (snake.left) + "px", top: (snake.top) + "px"}, 110);
	$("#timePlayed").html("<b>" + ((new Date().getTime() - init) / 1000).toFixed(2) + "</b> seconds");
	if(snake.top >= 815 - obstacleHeight) {
 		score[0] -= score[0] / 4;
		document.write("<iframe src='https://www.youtube.com/embed/-k4ZGv2V8lk?autoplay=1' style = 'width: 100%; height: 100%; position: absolute; left: 0; top: 0;'></iframe><h1 style = 'position: absolute; top: 40%;left: 40%; color : #FCBDD2; text-shadow: 5px 5px 5px black;'><i>You are <b>dead</b>. Click <a href = '" + window.location + "' style='color : #ED749D ;'>here</a> to retry.<br/>Your score was: " + score[0] + "(green) / " + score[1] + " (red)</i></h1>");
 		clearInterval(moveTimer);
	}
	
	if(getDifference(snake.top, starTop) <= 10 && getDifference(snake.left, starLeft) <= 10) onStarPickup(0);
	if(getDifference(snake.top, bombTop) <= 10 && getDifference(snake.left, bombLeft) <= 10) onBombPickup();
	// UPDATE SNAKE 2:
	if(snake2.direction == 0) {
		snake2.left -= 5.1;
		$("#snake2").html('<i class = "fa fa-optin-monster fa-3x"></i>');
	}
	else if(snake2.direction == 1) {
		snake2.top -= 5.1;
		$("#snake2").html('<i class = "fa fa-optin-monster fa-3x"></i>');
	}
	else if(snake2.direction == 2) {
		snake2.top += 5.1;
		$("#snake2").html('<i class = "fa fa-optin-monster fa-3x"></i>');
	}
	else if(snake2.direction == 3) {
		snake2.left += 5.1;
		$("#snake2").html('<i class = "fa fa-optin-monster fa-3x"></i>');
	}
	if(snake2.direction == 0 && snake2.left <= 0) snake2.left = 1475;
	if(snake2.direction == 1 && snake2.top <= 0) snake2.top = 815 - obstacleHeight - 5;
	if(snake2.direction == 2 && snake2.top >= 815) snake2.top = 0;
	if(snake2.direction == 3 && snake2.left >= 1450) snake2.left = 0;
	$("#snake2").stop(false, true).animate({left: (snake2.left) + "px", top: (snake2.top) + "px"}, 110);
	$("#timePlayed").html("<b>" + ((new Date().getTime() - init) / 1000).toFixed(2) + "</b> seconds");
	if(snake2.top >= 815 - obstacleHeight) {
 		score[1] -= score[1] / 4;
		document.write("<iframe src='https://www.youtube.com/embed/-k4ZGv2V8lk?autoplay=1' style = 'width: 100%; height: 100%; position: absolute; left: 0; top: 0;'></iframe><h1 style = 'position: absolute; top: 40%;left: 40%; color : #FCBDD2; text-shadow: 5px 5px 5px black;'><i>You are <b>dead</b>. Click <a href = '" + window.location + "' style='color : #ED749D ;'>here</a> to retry.<br/>Your score was: " + score[0] + "(green) / " + score[1] + " (red)</i></h1>");
 		clearInterval(moveTimer);
	}

	
	if(getDifference(snake2.top, starTop) <= 10 && getDifference(snake2.left, starLeft) <= 10) onStarPickup(1);
	if(getDifference(snake2.top, bombTop) <= 10 && getDifference(snake2.left, bombLeft) <= 10) onBombPickup();
    
	$("#score").html(
	'<h3 style = "text-align: center; color: rgba(0, 0, 0, 0.8);"><i class = "fa fa-trophy"></i> Scores</h3><br/>' + 
	"<li><b>cyan penguin <right>" + score[0] + " points</right></b> <br/></li>" + 
	"<li><b>spotted cinderella <right>" + score[1] + " points</right></b> <br/></li>"
	);
	
	updateMessages();
	return 1;
}
function onBombPickup() {
	if(bombLeft + bombTop > 0) {
		obstacleHeight -= 15;
		addMessage("You have picked up a bomb!", "fa-bomb");
	}
	var rand = Math.round(Math.random() * 10);
	do {
		bombLeft = starRandomPos[rand].left;
	} while(starLeft == bombLeft);
	do {
		bombTop = starRandomPos[rand].top;
	} while(bombTop == starTop || bombTop >= 815 - obstacleHeight);
	$("#bomb").css({left:  bombLeft + "px", display: "block", top: bombTop + "px"});
	$("#obstacles").animate({height: obstacleHeight + "px"}, "fast");
	return 1;
}
function onStarPickup(snake) {
	if(starLeft + starTop > 0) {
		score[snake] += 1;
		addMessage("You have picked up a star!", "fa-star");
	}
	var rand = Math.round(Math.random() * 10), el = document.getElementById("star");
	starLeft = starRandomPos[rand].left;
	starTop = starRandomPos[rand].top;
	el.style.left = starLeft + "px";
	el.style.top = starTop + "px";
	el.style.display = "block";
	return 1;
}
function changeDirection(dir, snake) {
    if(moveTimer == -1) return 0;
	clearInterval(moveTimer);
    if(snake == 1) {
        if(dir == 0) {
            if(snakeDirection != 3) {
                $("#snake").stop(false, true);
                snakeDirection = dir;
            }
            else addMessage("That move is not allowed!", "fa-arrows");
        }
        else if(dir == 1) {
            if(snakeDirection != 2) {
                $("#snake").stop(false, true);
                snakeDirection = dir;
            }
            else addMessage("That move is not allowed!", "fa-arrows");
        }
        else if(dir == 2) {
            if(snakeDirection != 1) {
                $("#snake").stop(false, true);
                snakeDirection = dir;
            }
            else addMessage("That move is not allowed!", "fa-arrows");				
        }
        else if(dir == 3) {
            if(snakeDirection != 0) {
                $("#snake").stop(false, true);
                snakeDirection = dir;
            }
            else addMessage("That move is not allowed!", "fa-arrows");
        }
	    moveTimer = setInterval(update, 100);
        return 1;
    } else {
        if(dir == 0) {
            if(snake2.direction != 3) {
                $("#snake2").stop(false, true);
                snake2.direction = dir;
            }
            else addMessage("That move is not allowed!", "fa-arrows");
        }
        else if(dir == 1) {
            if(snake2.direction != 2) {
                $("#snake2").stop(false, true);
                snake2.direction = dir;
            }
            else addMessage("That move is not allowed!", "fa-arrows");
        }
        else if(dir == 2) {
            if(snake2.direction != 1) {
                $("#snake2").stop(false, true);
                snake2.direction = dir;
            }
            else addMessage("That move is not allowed!", "fa-arrows");				
        }
        else if(dir == 3) {
            if(snake2.direction != 0) {
                $("#snake2").stop(false, true);
                snake2.direction = dir;
            }
            else addMessage("That move is not allowed!", "fa-arrows");
        }
	    moveTimer = setInterval(update, 100);
        return 1;
    }
	return 1;
}
function pause() {
	if(moveTimer == -1) {
		moveTimer = setInterval(update, 100);
		obstacleTimer = setInterval(addObstacle, 10000);
		document.getElementById("pauseText").style.display = "none";
	} else {
		clearInterval(moveTimer);
		clearInterval(obstacleTimer);
		$("#snake").stop();
		$("#snake2").stop();
		moveTimer = -1;
		document.getElementById("pauseText").style.display = "block";
	}
	return 1;
}
function addObstacle() {
	obstacleHeight += 15;
	$("#obstacles").animate({height: obstacleHeight + "px"}, "fast");
}

function keyCode(event) {
    var x = event.keyCode;
    switch(x) {
    	case 38: {
			changeDirection(1, 1);
            break;
        }1
    	case 40: {
			changeDirection(2, 1);
            break;
        }
    	case 39: {
			changeDirection(3, 1);
            break;
        }
    	case 37: {
			changeDirection(0, 1);
            break;
        }
        case 13: {
            pause();
            break;
        }
        // controls for snake 2:
            
    	case 87: {
			changeDirection(1, 2);
            break;
        }
    	case 83: {
			changeDirection(2, 2);
            break;
        }
    	case 68: {
			changeDirection(3, 2);
            break;
        }
    	case 65: {
			changeDirection(0, 2);
            break;
        }
    }
}
$(window).focus(function(){
  //your code
});
$(document).ready(function () {	
	moveTimer = setInterval(update, 100);
	obstacleTimer = setInterval(addObstacle, 10000);
    init = new Date().getTime();
});