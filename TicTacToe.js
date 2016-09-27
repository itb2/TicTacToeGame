$("#gameBoard").hide();

$( "#playButton" ).click(function() {
	$("#playButton").hide();
	$("#gameBoard").slideDown();
	play();
});
$("#restart").hide();
$("#nextGame").hide();

var p1 = 0;
var p2 = 0;
var draws = 0;
var p1Count = 1;
var p2Count = 1;

var row0, row1, row2, col0, col1, col2, dgnl0, dgnl1, game, whichD;

function initializeVars(){
	var winner;
	row0 = [];
	row1 = [];
	row2 = [];
	col0 = [];
	col1 = [];
	col2 = [];
	dgnl0= [];
	dgnl1= [];
	game =[];
	whichD = "";
}
function clickHandle(){
		
	var target = event.target;
	if(event.target == document.getElementById("gameBoard")){
		return;
	}
	console.log(event.target);
	var targetId = event.target.id;
	if(target.className != "taken"){
		takeTurns();
		target.style.backgroundColor = color;
		var row = target.getAttribute("row");
		var col = target.getAttribute("column");
		console.log(row);
		console.log(col);
		$(target).addClass("taken");
		if (row == "0"){
			row0.push(color);
			game.push(color);
			var currentRow = row0;
		}else if(row == "1"){
			row1.push(color);
			game.push(color);
			var currentRow = row1;
		}else{
			row2.push(color);
			game.push(color);
			var currentRow = row2;
		}
		if (col == "0"){
			col0.push(color);
			var currentCol = col0;
		}else if(col == "1"){
			col1.push(color);
			var currentCol = col1;
		}else{
			col2.push(color);
			var currentCol = col2;
		}
		if (col == row){
			if (col == 1){
				dgnl0.push(color);
				dgnl1.push(color);
				whichD = "both";
				var diagonal = dgnl0;
				var diagonal1 = dgnl1
				
			}else{
				whichD = "d0";
				var diagonal = dgnl0;
				dgnl0.push(color)
			}
		}else if(col == "0" && row == "2"){
			whichD = "d1";
			dgnl1.push(color);
			var diagonal = dgnl1;
		}else if(col == "2" && row == "0" ){
			whichD = "d1";
			dgnl1.push(color);
			var diagonal = dgnl1;
		}else{
			var diagonal = [];
		}

		
	}else{
		alert("That box has already been taken! Pick another.");
	}
	console.log(currentRow);
	console.log(currentCol)
	if(isCompleteRow("blue",currentRow)){
		playerOneWins();
		$("td").css("backgroundColor","gray");
		$("tr#row-"+row+ " td").css("backgroundColor","blue");
	}else if(isCompleteRow("green",currentRow)){
		playerTwoWins();
		$("td").css("backgroundColor","gray");
		$("tr#row-"+row+ " td").css("backgroundColor","green");
	}else if(isCompleteCol("blue",currentCol)){
		playerOneWins();
		$("td").css("backgroundColor","gray");
		$("td[column="+col+"]").css("backgroundColor","blue");
	}else if(isCompleteCol("green",currentCol)){
		playerTwoWins();
		$("td").css("backgroundColor","gray");
		console.log("col is",col);
		$("td[column="+col+"]").css("backgroundColor","green");
	}else if(isDiagonal("blue", diagonal)){
		playerOneWins();
		$("td").css("backgroundColor","gray");
		whichDiag(whichD, diagonal, diagonal1,color);
	}else if(isDiagonal("green",diagonal)){
		playerTwoWins();
		$("td").css("backgroundColor","gray");
		whichDiag(whichD, diagonal, diagonal1,color);
	}else if(game.length == 9){
		$("#nextGame").show();
		$("#gameStatus").text("No one wins: Draw!");
		winner = 0;
		console.log(game);
		$("td").css("backgroundColor","gray");
		$("#gameBoard").off("click");
	}

}
function playerOneWins(){
		winner = 1;
		playerWins("1");
	}
function playerTwoWins(){
	winner = 2;
	playerWins("2");
}
function playerWins(number){
	$("#gameStatus").text("Player " + number + " wins");
	$("#gameBoard").off("click");
	$("#nextGame").show();
}

function isCompleteRow(color,currentRow){
	if (currentRow[0]==color && currentRow[1]==color && currentRow[2]== color){
		return true;
	}
}
function isCompleteCol(color,currentCol){
	if(currentCol[0]==color && currentCol[1]==color && currentCol[2]== color){
		return true;
	}
}
function isDiagonal(color,diagonal){
	if(diagonal.length == 0){
		return false;
	}
	if(diagonal[0]==color && diagonal[1]==color && diagonal[2]== color){
		return true;
	}
}
function takeTurns(){
	if(p1Count == p2Count){
		$("#gameStatus").text("Player 1: Turn #" + p1Count);
		p1Count ++;
		color = "blue";
	}else{
		$("#gameStatus").text("Player 2: Turn #" + p2Count);
		p2Count ++;
		color = "green";
	}	
	
}
function whichDiag(whichD,diagonal, diagonal1,color){
	if (whichD == "d0"){
		$("#d0r0").css("backgroundColor",color);
		$("#dbr1").css("backgroundColor",color);
		$("#d0r2").css("backgroundColor",color);
	}else if(whichD=="d1"){
		$("#d1r2").css("backgroundColor",color);
		$("#dbr1").css("backgroundColor",color);
		$("#d1r0").css("backgroundColor",color);
	}else if(whichD== "both"){
		if(isDiagonal(color, diagonal1)){
			whichD = "d1";
			whichDiag(whichD,diagonal, diagonal1, color);
		}else{
			whichD = "d0";
			whichDiag(whichD,diagonal, diagonal1, color);
		}
	}
}
function play(){
	
	initializeVars();
	console.log(row0);
	$("#restart").show();
	var win = false;
	var color = "";

	$("#gameBoard").click(clickHandle);
	
	
}
function restart(){
	window.location.reload();
}
function newGame(){
	if(winner == 0){
		draws++;
		document.getElementById("catscore").innerText = "Draws: "+ String(draws);
	}else if(winner == 1){
		p1++;
		document.getElementById("p1score").innerText = "Player One: "+ String(p1);
	}else if(winner == 2){
		p2++;
		document.getElementById("p2score").innerText = "Player Two: "+ String(p2);
	}
	initializeVars();
	$("td").removeClass();
	$("#gameBoard").click(clickHandle);
	$("td").css("backgroundColor","black");
	$("#nextGame").hide();
	p1Count = 1;
	p2Count = 1;

}

