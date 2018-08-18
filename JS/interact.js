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
