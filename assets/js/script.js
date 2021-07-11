const gameSequence = [];

var playerSequence = [];

let gameSquare = document.getElementsByClassName("game-square");

let gameSquareNum;

//flashes game squares when clicked
for (let i = 0; i < gameSquare.length; i++) {
    gameSquare[i].addEventListener("click", flash)
}

function startGame() {

}
//generates an array of random numbers between 1 and max square length 
function createSequence() {

    playerSequence = [];

    for (let i = 0; i < 5; i++) {

        let randomNums = Math.floor(Math.random() * gameSquare.length + 1)

        gameSequence.push(randomNums);
    }

    console.log(gameSequence);

    //use function to run animation (flash square) within for loop with a delay

}

function runSequence() {

}

function checkSequence() {

}

function incrementRound() {

}



//flashes clicked square and creates players sequence
function flash() {
    $(this).fadeOut(150).fadeIn(150);
    gameSquareNum = parseInt(this.innerHTML)
    playerSequence.push(gameSquareNum);
    console.log(playerSequence);
    console.log(gameSquareNum);
}
