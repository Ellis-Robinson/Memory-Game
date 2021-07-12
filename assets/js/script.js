let gameSequence = [];

let playerSequence = [];

const gameSquare = document.getElementsByClassName("game-square");

// starts game
function startGame() {
    createSequence();
    flashSequence();
}

//targets game squares and flashes them in order of game sequence
function flashSequence() {
    
    for (let i = 0; i < gameSequence.length; i++) {
        setTimeout(function(){
            flashSquare(gameSequence[i]-1)
        }, 1000*(i+1));
      }
    
}

//clears player and game sequence. generates an array of random numbers between 1 and max square length 
function createSequence() {

    playerSequence = [];
    gameSequence = [];

    for (let i = 0; i < 5; i++) {

        let randomNums = Math.floor(Math.random() * gameSquare.length + 1)

        gameSequence.push(randomNums);
    }

    console.log(gameSequence);

}

//flashes selected square
function flashSquare(i) {
        gameSquare[i].className = "game-square red";
        setTimeout(function(){
           gameSquare[i].className = "game-square blue";
        }, 150);
}

//adds the integer of selected game square to player sequence array
function createPlayerSequence(i) {
    let squareNumber = +gameSquare[i].dataset.square
    playerSequence.push(squareNumber);
    console.log(playerSequence);
}

//listening for if start button is clicked
document.querySelector("#start-btn").addEventListener("click", startGame);

//listening for if game square is clicked
for(let i = 0; i < gameSquare.length; i++){
    gameSquare[i].addEventListener("click", function() {
        flashSquare(i);
        createPlayerSequence(i);
        checkSequences();
        });
}

//if player sequence length is the same as game sequence length compare both, then clear player sequence
function checkSequences() {
    if (gameSequence.length === 0) {
        console.log("press start");
    }else if (playerSequence.length === gameSequence.length) {
        console.log("sequences same length");
        if (playerSequence.toString() === gameSequence.toString()) {
            console.log("correct!");
            playerSequence = [];
        } else {
            console.log("incorrect!");
            playerSequence = [];
        }
    } else if (playerSequence.length < gameSequence.length) {
        console.log("click more squares");
    }
}
