function processTurn(ID){
    var content = document.getElementById(ID).innerHTML;
    console.log(content);

    //cannot change the existing element
    if (content == "O" || content == "X") {
        return;
    }

    var playChar = document.getElementById("playingChar").value;   //get current play character
    console.log(playChar);
    document.getElementById(ID).innerHTML = playChar;               //change node to current play character

    //reset hidden filed to next player's character
    if (playChar == "X") {
        document.getElementById("playingChar").value = "O";        //change current play char to O
        console.log("O");
    }
    else if (playChar == "O"){
        document.getElementById("playingChar").value = "X";        //change current play char to X
        console.log("X");
    }

}

function checkWinningCondition(){
    var tableObj = document.getElementById("tictactoe");

    var size = document.getElementById("tictactoe").rows.length;
    // making a 3x3 array in JS
    var grid = new Array(size);
    for (var i = 0; i < size; i++)
        grid[i] = new Array(size);


    for (var i = 0; i < size; i++)
        for (var j = 0; j < size; j++){
            console.log('i: ' + i + " j: " + j);
            console.log("contents: " + tableObj.rows[i].cells.item(j).innerHTML)
            grid[i][j] = tableObj.rows[i].cells.item(j).innerHTML
        }

    console.log(grid);

    var win = true; // assume there is a win
    var char; // to test if all along row, col, or diagonal are same
    // now checking winning conditions, every row and column and 2 diagonals are possible winning conditions
    for (var i = 0; i < grid.length && !win; i++) {
        char = grid[i][0]; // check if all characters along the row are the same
        for (var j = 0;j < grid[i].length && !win; j++){
            if (!(char === grid[i][j]))
        }
    }



}