var colorArray = ["green", "yellow", "red", "blue"];
var colorList, score, clickedButton, playerSelections, lost, counter;
var timeRemaining = 20;
var numClicks;

$(document).ready(function(){
	$("#start").click(function(){
		$("#start").hide();
		$("#name").show();
		$("#score").show();
		$("#game-container").show();
		$("#timer").show();
		$("button").click(function(){
			clickedButton = $(this).text().toLowerCase();
			playerSelections.push(clickedButton);
			numClicks++;
			if (numClicks == colorList.length){
				checkPlayerInput(true);
			}
		});
		startGame()
	});
})

function startGame(){
	colorList = [];
	score = 0;
	lost = false;
	timeRemaining = 20;
	updateTimer("")
	update();
}

function draw(index){
	color = colorList[index]
	$("#colorSwatch").css("background-color", color);
	$("#colorSwatch").show();
}

function showColors(){
	setTimeout(function(){
		draw(counter); 
		counter++; 
		setTimeout(function(){
			$("#colorSwatch").hide(); 
		}, 2000);
		if (counter < colorList.length){
			showColors();
		}
		else {
			setTimeout(function(){
				$("#btns").show();
				timer = setInterval(function(){
					timeRemaining--;
					updateTimer(timeRemaining);
				}, 1000);
			}, 2000);
		}
	}, 3000);
}

function update(){
	numClicks = 0;
	timeRemaining = 20;
	$("#btns").hide();
	index = Math.floor(Math.random()*4);
	currColor = colorArray[index];
	colorList.push(currColor);
	counter = 0;
	showColors();
	playerSelections = [];
	setTimeout(function(){
		checkPlayerInput(false);
	}, 20000 + 3000 * (colorList.length + 1));

}

function updateTimer(time){
	$("#timer").html("<p class='centered'>Time Remaining: " + time + "</p>")
}

function updateScore(){
	$("#score").html("<p class='centered'> Score: " + score + "</p>")
}

function checkPlayerInput(early){
	if (timeRemaining == 0 || early) {
		for (i = 0; i < colorList.length; i++){
			if (colorList[i] != playerSelections[i]){
				lost = true;
			}
		}
		if (!lost){
			score++;
			clearInterval(timer);
			updateScore();
			update();
		}
		else{
			alert("Game Over")
			clearInterval(timer);
			$("#name").hide();
			$("#game-container").hide();
			$("#btns").hide();
			$("#timer").hide();
			$("#start").html("Play Again")
			$("#start").show();
			$("#score").html("<p class='centered'> Final Score: " + score + "</p>")
		}
	}
}


