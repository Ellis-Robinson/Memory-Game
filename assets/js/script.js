// To do list
// - replace all alerts with modals or animation of some sort 
// - add animation for correct/incorrect/life removal.
// - add reset highscore

let gameSequence = [];

let playerSequence = [];

const gameSquare = document.querySelectorAll(".game-square");

const currentRound = document.querySelector("#currentRound");

const highScore = document.querySelector("#hightScore");

const lives = document.querySelector("#lives");


//-----------------functions----------------------------

// starts game
function startGame() {

    playerSequence = [];
    gameSequence = [];
    currentRound.innerHTML = 0;
    lives.innerHTML = 3;

    createSequence();
    flashSequence();
}

//targets game squares and flashes them in order of game sequence
function flashSequence() {
    
    for (let i = 0; i < gameSequence.length; i++) {
        setTimeout(function(){
            //-1 corrects sequence of flashes
            flashSquare(gameSequence[i]-1)
            //+1 delays start time by 1 second
        }, 1000*(i+1));
      }
    
}

//clears player and game sequence. generates an array of random numbers between 1 and max square length 
function createSequence() {

    for (let i = 0; i < 3; i++) {
        //gameSquare.length + 1 accounts for Math.floor rouding the number down
        let randomNums = Math.floor(Math.random() * gameSquare.length + 1)

        gameSequence.push(randomNums);
    }

    console.log(gameSequence);

}
// generates 1 random number between 1 and max number of game squares, adds to current sequence.
function incrementSequence() {
    let randomNum = Math.floor(Math.random() * gameSquare.length + 1)
    gameSequence.push(randomNum);
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

//if player sequence length is the same as game sequence length compare both, then clear player sequence
function checkSequences() {

    if (playerSequence.length === gameSequence.length) {
        console.log("sequences same length");
        if (playerSequence.toString() === gameSequence.toString()) {
            //increments round and shows the next incrememnted sequence
            console.log("correct!");
            flashWellDone();
            incrementRound();
            flashSequence();
            playerSequence = [];
        } else {
            //removes one life, clears players sequence and replays game sequence
            if (lives.innerHTML > 0) {
                flashTryAgain();
                playerSequence = [];
                decrementLives();
                flashSequence();
            }else {
                //resets players sequence and round score. starts new game
                console.log("incorrect!");
                clickPlayAgainButton();
            }
        }
    }
    
    if (playerSequence.length < gameSequence.length) {
        console.log("click more squares");
    }
}

//increment current round by 1 and calls incrememntSequence
function incrementRound() {
   currentRound.innerHTML++
   if (currentRound.innerHTML > highScore.innerHTML) {
       incrememntHighScore();
   }
   incrementSequence();
}
//incements high score
function incrememntHighScore() {
    hightScore.innerHTML++
}
//decrements lives
function decrementLives () {
    lives.innerHTML--
}
//flashes well done message
function flashWellDone () {
    let wellDone = document.querySelector("#well-done-announcemet");
    wellDone.className = "announcement-content";
        setTimeout(function(){
          wellDone.className = "hidden";
        }, 1000);
}
//flashed try again message
function flashTryAgain () {
    let tryAgain = document.querySelector("#try-again-announcemet");
    tryAgain.className = "announcement-content";
        setTimeout(function(){
            tryAgain.className = "hidden";
        }, 1000);
}
//flashes play again message
function flashPlayAgain () {
    let playAgain = document.querySelector("#play-again-announcemet");
    playAgain.className = "announcement-content";
        setTimeout(function(){
            playAgain.className = "hidden";
        }, 1000);
}

function clickPlayAgainButton () {
    document.querySelector("#play-again-hidden-btn").click()
}

function clearStats () {
    currentRound.innerHTML = 0;
    lives.innerHTML = 3;
}


//-------------runable code--------------------------


//listening for if start button is clicked
document.querySelector("#start-btn").addEventListener("click", startGame);

//if play again button is clicked game will start again
document.querySelector("#play-again-modal-btn").addEventListener("click", startGame);

document.querySelector("#no-thanks-modal-btn").addEventListener("click", clearStats);


//listening for if game square is clicked
for(let i = 0; i < gameSquare.length; i++){
    gameSquare[i].addEventListener("click", function() {
        flashSquare(i);
        createPlayerSequence(i);
        checkSequences();
        });
}
