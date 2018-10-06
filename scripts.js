var colorArray = ["green", "yellow", "red", "blue"];
var colorList, score, clickedButton, playerSelections, lost, counter;
var numClicks;

$(document).ready(function(){
	$(".choice").click(function(){
		clickedButton = $(this).text().toLowerCase();
		playerSelections.push(clickedButton);
		console.log("onclick: "+playerSelections)
		numClicks++;
		if (numClicks == colorList.length){
			checkPlayerInput();
		}
	});
	$("#start").click(function(){
		$("#start").hide();
		$("#name").show();
		$("#score").show();
		$("#game-container").show();
		// $("#timer").show();
		startGame()
	});

})

function startGame(){
	console.log("starting")
	colorList = [];
	score = 0;
	lost = false;
	timeRemaining = 20;
	playerSelections = []
	// updateTimer("")
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
		}, 1000);
		if (counter < colorList.length){
			showColors();
		}
		else {
			setTimeout(function(){
				$("#btns").show();
				// timer = setInterval(function(){
				// 	timeRemaining--;
				// 	updateTimer(timeRemaining);
				// }, 1000);
			}, 1000);
		}
	}, 1500);
}

function update(){
	numClicks = 0;
	timeRemaining = 20;
	playerSelections = [];
	$("#btns").hide();
	index = Math.floor(Math.random()*4);
	currColor = colorArray[index];
	colorList.push(currColor);
	counter = 0;
	showColors();
	// check = setTimeout(function(){
	// 	checkPlayerInput(false, playerSelections);
	// }, (20000 + 1500 * (colorList.length + 1)));

}

// function updateTimer(time){
// 	$("#timer").html("<p class='centered'>Time Remaining: " + time + "</p>")
// }

function updateScore(){
	$("#score").html("<p class='centered'> Score: " + score + "</p>")
}

function checkPlayerInput(){
	console.log("clicked: "+playerSelections)
	console.log("clicks: " + numClicks)
	for (i = 0; i < colorList.length; i++){
		if (colorList[i] != playerSelections[i]){
			lost = true;
		}
	}
	if (!lost){
		score++;
		// clearInterval(timer);
		updateScore();
		update();
		for (var i = 0; i < 10; i++){
			clearTimeout(check)
		}
	}
	else{
		alert("Game Over")
		// clearInterval(timer);
		playerSelections = [];
		colorList = [];
		$("#name").hide();
		$("#game-container").hide();
		$("#btns").hide();
		// $("#timer").hide();
		$("#start").html("Play Again")
		$("#start").show();
		$("#score").html("<p class='centered'> Final Score: " + score + "</p>")
		for (var i = 0; i < 10; i++){
			clearTimeout(check)
		}
	}
}


