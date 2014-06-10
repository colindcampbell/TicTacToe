
function DetermineWinnerController($scope){

	$scope.xTurn = true;

$scope.init = function(){
	
	
	if($scope.xWon){
		!$scope.xTurn;
	}
	if(!$scope.xWon){
		$scope.xTurn;
	}

	$scope.rows = [];
	$scope.board = [];
	$scope.xWins = [];
	$scope.oWins = [];
	$scope.winCond = [];
	$scope.xWon = false;
	$scope.oWon = false;
	$scope.turns = 0;
	$scope.winner="";
	

	// $scope.sizeStyle = $scope.main;

	//set class based on board size for styling
	if($scope.size==3){
		$scope.sizeStyle = "threeStyle";
	}
	else if($scope.size==4){
		$scope.sizeStyle = "fourStyle";
	}
	else{
		$scope.sizeStyle = "fiveStyle";
	}
	
	//fill game board divs with empty strings and create the boards coordinates in an array
	for(i=0;i<$scope.size;i++){
		$scope.rows.push([]);
		$scope.board.push([]);
		for(j=0;j<$scope.size;j++){
			$scope.rows[i].push('');
			$scope.board[i].push([i,j]);
		}
	};

	//create winning string for x and o
	for(i=0; i<$scope.size*2+2; i++){
		$scope.xWins.push(0);
		$scope.oWins.push(0);
	};

	//create Winning Condition string based on size
	for(i=0; i<$scope.size*2+2; i++){
		$scope.winCond.push([]);
	};
	//fill first (size) winning conditions with the rows wins
	for(j=0; j<$scope.size; j++){
		for(k=0; k<$scope.size; k++){
			$scope.winCond[j].push($scope.board[j][k]);
		}
	};
	//fill the next (size) to (2*size) winning conditions with the cols wins
	for(l=0; l<$scope.size; l++){
		var colsWin = $scope.size;
		for(m=0; m<$scope.size; m++){
			$scope.winCond[colsWin].push($scope.board[l][m]);
			colsWin++;
		}
	};
	//fill first X starting with top left then going down to the right
	for(k=0; k<$scope.size; k++){
		$scope.winCond[$scope.size*2].push($scope.board[k][k]);
	};
	//fill the next X starting with the top right and going to the bottom left
	for(k=0; k<$scope.size; k++){
		$scope.winCond[$scope.size*2+1].push($scope.board[k][$scope.size-k-1]);
	};
		
}


	$scope.click = function(row, col){
	//check win on click
	
		if(!$scope.xWon&&!$scope.oWon){
			if($scope.rows[row][col]=='X'||$scope.rows[row][col]=='O'){
				return;
			}
			else{
			$scope.turns++;
				
				for(i=0;i<$scope.size*2+2;i++){
					
					for(j=0;j<$scope.size;j++){
						
						if(row==$scope.winCond[i][j][0] && col==$scope.winCond[i][j][1]){

							if($scope.xTurn){
								$scope.rows[row][col]="X";
								$scope.xWins[i]++;
								$scope.checkWin(0,$scope.xWins[i],i);
							}
							else{
								$scope.rows[row][col]="O";
								$scope.oWins[i]++;
								$scope.checkWin(1,$scope.oWins[i],i);
							}
						}
					}
				}
			}
			$scope.xTurn=!$scope.xTurn;
			if($scope.turns==$scope.size*$scope.size&&!$scope.xWon&&!$scope.oWon){
				$scope.winner="Cat's Game";
				$scope.catsGame++;
				return;
			}
		}
	};


	$scope.checkWin = function(player, num, ind){
		if($scope.turns>4){
			if(num==$scope.size){
				if(player==0){
					console.log("Player X wins");
					$scope.winner="X wins, O starts next game";
					$scope.xScore++;
					//apply conditonal, current works for Xs
					//if(ind>=$scope.size*2)
					for(i=0;i<$scope.size;i++){
						for(j=0;j<$scope.size;j++)
							if(i==$scope.winCond[ind][i][0]&&j==$scope.winCond[ind][i][1]){
								$scope.rows[i][j]=' X ';
								console.log(i,j);
								console.log($scope.rows[i][j]);
							}
						
					}
					$scope.xWon=true;
					return;
				}
				else{
					for(i=0;i<$scope.size;i++){
						for(j=0;j<$scope.size;j++)
							if(i==$scope.winCond[ind][i][0]&&j==$scope.winCond[ind][i][1]){
								$scope.rows[i][j]=' O ';
								console.log(i,j);
								console.log($scope.rows[i][j]);
							}
						}
					console.log("Player O wins");
					$scope.winner="O wins, X starts next game";
					$scope.oScore++;
					$scope.oWon=true;
					return;
				}
			}
		}
	}

	$scope.reset = function(){
		$scope.xScore=0;
		$scope.oScore=0;
		$scope.catsGame=0;
		$scope.winner="";
	}

};

