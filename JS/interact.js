function processTurn(ID){
    var content = document.getElementById(ID).innerHTML;

    //cannot change the existing element
    if (content === "O" || content === "X") {
        return;
    }

    var playChar = document.getElementById("playingChar").value;   //get current play character
    if(playChar === "X" || playChar === "O")
        document.getElementById(ID).innerHTML = playChar;               //change node to current play character

    //reset hidden filed to next player's character
    if (playChar === "X") {
        document.getElementById("playingChar").value = "O";        //change current play char to O
        document.getElementById("playerTurn").innerHTML = "Player 2's Turn";
    }
    else if (playChar === "O"){
        document.getElementById("playingChar").value = "X";       //change current play char to X
        document.getElementById("playerTurn").innerHTML = "Player 1's Turn";
    }


    var arr = checkWinningCondition();
    displayWinMsg(arr);

    if (checkDrawCondition() && !arr[0])
        displayDrawMsg();
}

function displayWinMsg(arr){
    //arr[0] contains the boolean value if a player has won
    if(arr[0]){
        var winningPlayer = 2;
        //arr[1] contains the winning character
        if(arr[1] === 'X')
            winningPlayer = 1;

        document.getElementById("playerTurn").innerHTML = "";
        document.getElementById("winner").innerHTML = ("Game Over. Player " + winningPlayer + " won.");

        document.getElementById("playingChar").value = "Game Over"; // Sentinel value is "Game Over"
    }
}

function getBoard() {
    var tableObj = document.getElementById("tictactoe");

    var size = document.getElementById("tictactoe").rows.length;
    // making a 3x3 array in JS
    var grid = new Array(size);
    for (var i = 0; i < size; i++)
        grid[i] = new Array(size);


    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            grid[i][j] = tableObj.rows[i].cells.item(j).innerHTML;
        }
    }

    return grid;

}


function displayDrawMsg(){
    document.getElementById("playerTurn").innerHTML = "";
    document.getElementById("winner").innerHTML = ("Draw Game.");
    document.getElementById("playingChar").value = "Draw";
}

function checkDrawCondition(board = getBoard()){
    var grid = board;
    var size = 3;

    var slotsFilled = 0;

    for(var i = 0; i < size; i++)
        for(var j = 0; j < size; j++)
            if(grid[i][j] === "X" || grid[i][j] === "O")
                slotsFilled++;

    if(slotsFilled === 9){
        return true;
    } else {
        return false;
    }
}


function checkWinningCondition(board = getBoard()){
    var grid = board;
    var size =3;
    var win = false; // assume there is not a win
    var char;
    // now checking winning conditions, every row and column and 2 diagonals are possible winning conditions
    var diagNumSameChar = 0;

    // Check Rows
    for (var i = 0; i < size && !win; i++) {
        char = grid[i][0]; // check if all characters along the row are the same
        var rowNumSameChar = 0; // number of x's or o's in a row along a row, column, or diagonal
        var colNumSameChar = 0;
       // var colNumSameChar = 0;
        for (var j = 0; j < size && !win; j++){
            // char could be undefined, if char is not undefined but the rest of the grid elements are
            // they won't be equal so this will still work
            if ((char === grid[i][j]) && (char === 'X' || char === 'O')) {
                rowNumSameChar++;
            }

            if (rowNumSameChar === 3) {
                win = true;
            }

            // top left to bottom right diagonal
            var diagChar = grid[0][0];
            if((diagChar === grid[j][j]) && i === j && (diagChar === "X" || diagChar === "O"))
                diagNumSameChar++;
            if(diagNumSameChar === 3){
                char = diagChar;
                win = true;
            }

        }

        if(!win){
            // columns
            char = grid[0][i];
            for (var k = 0; k < size && !win; k++){
                if ((char === grid[k][i]) && (char === 'X' || char === 'O')) {
                    colNumSameChar++;
                }

                if (colNumSameChar === 3) {
                    win = true;
                }
            }
        }
    }

    // check diagonal top right to bottom left
    var i = 0;
    var j = 2;
    var diagChar = grid[i][j];
    var diagNumSameChar = 0;
    while(!win && i < 3 && j >= 0){
        if(diagChar === grid[i][j] && (diagChar === "X" || diagChar === "O"))
            diagNumSameChar++;

        if(diagNumSameChar === 3){
            char = diagChar;
            win = true;
        }

        i++;
        j--;
    }

    var arr = [win, char];
    return arr; // want to return so user can see message after X or O has been placed on the grid
}

function resetGame(){
    var tableObj = document.getElementById("tictactoe");

    var size = document.getElementById("tictactoe").rows.length;
    // making a 3x3 array in JS
    var grid = new Array(size);
    for (var i = 0; i < size; i++)
        grid[i] = new Array(size);

    //reset each token in the grid
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            document.getElementById(i.toString() + j.toString()).innerHTML = "";
        }
    }

    document.getElementById("winner").innerHTML = "";       //reset end game message
    document.getElementById("playingChar").value = "X";    //reset to player 1
    document.getElementById("playerTurn").innerHTML = "Player 1's Turn";    //reset to player 1's turn
}

// returns a character representing the endgame from the perspective of ai Player
// board is a 3x3 grid of X's and O's
// aiPlayer is either an X or an O
function getEndGame (board, aiPlayer) {
    var arr = checkWinningCondition(board);

    console.log(arr);
    console.log(checkDrawCondition(board));
    if (checkDrawCondition(board) && !arr[0]) {
        return 'D';                  //return draw if draw condition is true and no winner\
    }
    else if(arr[0]){
        if (arr[1] === aiPlayer)    //check if player that won is the ai
            return 'W';             //return win if it is
        else
            return 'L';             //return loss if is not
    }
    else {
        return "";                 //error check case
    }
}

// receives a 3x3 boolean array and checks if there are any T values remaining in the array
function checkPossibleMovesLeft(movesGrid){

    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            if(movesGrid[i][j])
                return true;// possible move exists
        }
    }

    return false;
}

// get next available position on the board
function getNextAvailablePosition(movesGrid){

    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            if(movesGrid[i][j])
                return [i, j];// next possible move
        }
    }

    return false; // error
}


// determines which character/player should go next,
// Note: does not check for endgames
function whoseTurn(board){
    xCount = 0;
    oCount = 0;

    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            if(board[i][j] == 'X'){
                xCount++;
            } else if(board[i][j] == 'O'){
                oCount++;
            }
        }
    }

    // the count of X's and O's will always be the same or the count of X's will exceed the count of O's by 1
    if(xCount == oCount){
        return 'X'
    } else {
        return 'O';
    }
}

function getMinElement (arr){
    //if array has no values, return 0; error case
    if (arr.length == 0)
        return false;

    var min = arr[0];   //assume first value in array is the min

    //compare min to every value in array to find actual minimum value
    for (var i = 1; i < arr.length; i++){
        if (arr[i] < min)
            min = arr[i];
    }

    return min;
}

function makeMoveGrid (board){
    var grid = boardCopy(board);  //make a copy of the board

    //if the board slot contains an X or an O
    for (var i = 0; i < grid.length; i++){
        for (var j = 0; j < grid[i].length; j++){
            if (grid[i][j] === 'X' || grid[i][j] === 'O'){
                grid[i][j] = false; //not an available move slot
            }
            else
                grid[i][j] = true;  //available move slot
        }
    }

    return grid;
}

// returns a copy of the board
function boardCopy(arr){
    var bCopy = [];
    for (var i = 0; i < arr.length; i++){
        bCopy.push([]);
        for(var j = 0; j < arr[i].length; j++) {
            bCopy[i].push(arr[i][j]);
        }
    }
    return bCopy;
}

// selects the maximum score on the board consisting of X's, O's, and numbers
function getMaxScoreBoardPos(scoreBoard){
    var maxPos = false;// sentinel value - board only consists of X's and O's
    var maxVal = -9999;

    for (var i = 0; i < scoreBoard.length; i++){
        for (var j = 0; j < scoreBoard[i].length; j++){
            if (scoreBoard[i][j] != 'X' || scoreBoard[i][j] != 'O'){
                if (maxVal < scoreBoard[i][j]){
                    maxVal = scoreBoard[i][j];
                    maxPos = [i, j];
                }
            }
        }
    }

    return maxPos;
}

var items = [
    ['X', 'O', 'O'],
    ['X', 'O', 'X'],
    ['O', 'X', 'O']
];

alert(getMaxScoreBoardPos(items));

/*
var arr =  [];
alert(getMinElement(arr));
*/

//var aiPlayer = 'X';
// var items = [
//     ['', 'X', ''],
//     ['O', '', ''],
//     ['', '', '']
// ];
// var bobby = makeMoveGrid(items);
// console.log(items);
// console.log(bobby);
// alert(makeMoveGrid(items));
// alert(items);
//alert(getEndGame(items, aiPlayer));



/*
var items = [
    [false, false, false],
    [false, false, false],
    [false, false, false]
];

alert(checkPossibleMovesLeft(items));
*/

