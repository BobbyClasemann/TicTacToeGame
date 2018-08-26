function processTurn(ID){
    var content = document.getElementById(ID).innerHTML;
    console.log(content);

    //cannot change the existing element
    if (content === "O" || content === "X") {
        return;
    }

    var playChar = document.getElementById("playingChar").value;   //get current play character
    console.log(playChar);
    if(playChar === "X" || playChar === "O")
        document.getElementById(ID).innerHTML = playChar;               //change node to current play character

    //reset hidden filed to next player's character
    if (playChar === "X") {
        document.getElementById("playingChar").value = "O";        //change current play char to O
        document.getElementById("playerTurn").innerHTML = "Player 2's Turn";
        //console.log("O");
    }
    else if (playChar === "O"){
        document.getElementById("playingChar").value = "X";       //change current play char to X
        document.getElementById("playerTurn").innerHTML = "Player 1's Turn";
        //console.log("X");
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

function getGrid() {
    var tableObj = document.getElementById("tictactoe");

    var size = document.getElementById("tictactoe").rows.length;
    // making a 3x3 array in JS
    var grid = new Array(size);
    for (var i = 0; i < size; i++)
        grid[i] = new Array(size);


    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            //console.log('i: ' + i + " j: " + j);
            //console.log("contents: " + tableObj.rows[i].cells.item(j).innerHTML);
            grid[i][j] = tableObj.rows[i].cells.item(j).innerHTML;
        }
    }

    return [grid, size];

}


function displayDrawMsg(){
    document.getElementById("playerTurn").innerHTML = "";
    document.getElementById("winner").innerHTML = ("Draw Game.");
    document.getElementById("playingChar").value = "Draw";
}

function checkDrawCondition(){
    var arr = getGrid();
    var grid = arr[0];
    var size = arr[1];

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


function checkWinningCondition(){
    var arr = getGrid();
    var grid = arr[0];
    var size = arr[1];

    console.log(grid);

    console.log("length" + grid.length);
    var win = false; // assume there is not a win
    var char;
    // now checking winning conditions, every row and column and 2 diagonals are possible winning conditions
    var diagNumSameChar = 0;

    // Check Rows
    for (var i = 0; i < grid.length && !win; i++) {
        char = grid[i][0]; // check if all characters along the row are the same
        var rowNumSameChar = 0; // number of x's or o's in a row along a row, column, or diagonal
        var colNumSameChar = 0;
       // var colNumSameChar = 0;
        for (var j = 0; j < grid[i].length && !win; j++){
            console.log("char " + char);
            console.log("grid val " + grid[i][j]);
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
            console.log("i: " + i + "j: " + j);
            if((diagChar === grid[j][j]) && i === j && (diagChar === "X" || diagChar === "O"))
                diagNumSameChar++;
            if(diagNumSameChar === 3){
                char = diagChar;
                console.log("WINNER: " + char);
                win = true;
            }

        }

        if(!win){
            // columns
            char = grid[0][i];
            for (var k = 0; k < grid[i].length && !win; k++){
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

    // for (var j = 0; j < grid.length && !win; j++) {
    //     char = grid[0][j]; //check if all characters along column are the same
    //     var colNumSameChar = 0; // number of x's or o's in the column
    //     //check if the character in the column is the same and is a valid token
    //     for (var i = 0; i < grid[j].length && !win; i++) {
    //         if ((char === grid[i][j] && char === 'X' || char === 'Y')) {
    //             colNumSameChar++;
    //         }
    //         if (colNumSameChar === 3){
    //             win = true;
    //         }
    //     }
    // }
    var arr = [win, char];
console.log("FINAL " + char);
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