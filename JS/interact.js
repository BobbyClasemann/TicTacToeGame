function processTurn(ID){
    var content = document.getElementById(ID).value;
    console.log(content);

    //cannot change the existing element
    if (content == "O" || content == "X") {
        return;
    }

    var playChar = document.getElementById("playingChar").value;   //get current play character
    console.log(playChar);
    document.getElementById(ID).value = playChar;               //change node to current play character

    //reset hidden filed to next player's character
    if (playChar == "X") {
        document.getElementById("playingChar").value = "O";        //change current play char to O
        console.log("O");
    }
    else {
        document.getElementById("playingChar").value = "X";        //change current play char to X
        console.log("X");
    }

}
