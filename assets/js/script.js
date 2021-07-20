// To do list
// 
// - add animation for correct/incorrect/life removal.
// - add reset highscore (clear stats)
// 
//
// - adjust order of functions to order of occurence

let mainGameSection = document.querySelector("#main-game-section");

let easyConfig = `<!--main game section, easy config-->
<div id="game-area-easy" class="animate__animated animate__zoomIn">
    <!--game squares (easy)-->
        <div id="game-square-1" data-square="1" class="game-square blue"></div>
        <div id="game-square-2" data-square="2" class="game-square blue"></div> <br>
        <div id="game-square-3" data-square="3" class="game-square blue"></div>
        <div id="game-square-4" data-square="4" class="game-square blue"></div>
    </div>`

let mediumConfig = `<!--main game section, medium config-->
<div id="game-area-medium" class="animate__animated animate__zoomIn">
    <!--game squares (medium)-->
        <div id="game-square-1" data-square="1" class="game-square blue"></div>
        <div id="game-square-2" data-square="2" class="game-square blue"></div>
        <div id="game-square-3" data-square="3" class="game-square blue"></div> <br>
        <div id="game-square-4" data-square="4" class="game-square blue"></div>
        <div id="game-square-5" data-square="5" class="game-square blue"></div>
        <div id="game-square-6" data-square="6" class="game-square blue"></div> <br>
        <div id="game-square-7" data-square="7" class="game-square blue"></div>
        <div id="game-square-8" data-square="8" class="game-square blue"></div>
        <div id="game-square-9" data-square="9" class="game-square blue"></div>
    </div>`;

let hardConfig = `<!--main game section, hard config-->
<div id="game-area-hard" class="animate__animated animate__zoomIn">
    <!--game squares (hard)-->
        <div id="game-square-1" data-square="1" class="game-square blue"></div>
        <div id="game-square-2" data-square="2" class="game-square blue"></div>
        <div id="game-square-3" data-square="3" class="game-square blue"></div> 
        <div id="game-square-4" data-square="4" class="game-square blue"></div> <br>
        <div id="game-square-5" data-square="5" class="game-square blue"></div>
        <div id="game-square-6" data-square="6" class="game-square blue"></div> 
        <div id="game-square-7" data-square="7" class="game-square blue"></div>
        <div id="game-square-8" data-square="8" class="game-square blue"></div> <br>
        <div id="game-square-9" data-square="9" class="game-square blue"></div>
        <div id="game-square-10" data-square="10" class="game-square blue"></div> 
        <div id="game-square-11" data-square="11" class="game-square blue"></div>
        <div id="game-square-12" data-square="12" class="game-square blue"></div> <br>
        <div id="game-square-13" data-square="13" class="game-square blue"></div> 
        <div id="game-square-14" data-square="14" class="game-square blue"></div>
        <div id="game-square-15" data-square="15" class="game-square blue"></div>
        <div id="game-square-16" data-square="16" class="game-square blue"></div>
    </div>`

let gameSequence = [];

let playerSequence = [];

let gameSquare = [];

let sequenceFlashing = false

let screenSizeMdSm = window.matchMedia("(max-width: 750px)");

let startButton = document.querySelector("#start-btn");

const currentRound = document.querySelector("#currentRound");

const highScore = document.querySelector("#hightScore");

const lives = document.querySelector("#lives");

const gameArea = document.querySelector("#game-area-easy");

const dificultyLevel = document.querySelector("#difficulty-ul");


//-----------------functions----------------------------

// starts game
function startGame() {

    // startButton.className += " hidden";
    reset();
    playerSequence = [];
    gameSequence = [];
    currentRound.innerHTML = 0;
    lives.innerHTML = 3;

    createSequence();
    flashSequence();
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
//returns game squares to blue
function gameSquareBlue () {
    setTimeout(function(){
        for (i = 0; i < gameSquare.length; i++)
        gameSquare[i].className = "game-square blue";
     }, 200);
}

//targets game squares and flashes them in order of game sequence
function flashSequence() {
    
    isFlashing();

    checkIfFlashing();
    for (let i = 0; i < gameSequence.length; i++) {
        
        let flashSequenceTimeOut = setTimeout(function(){

            //-1 corrects sequence of flashes
            flashSquareForSequence(gameSequence[i]-1)

            //+1 delays start time by 1 second
        }, 1000*(i+1.5));

        flashSequenceTimeOut;

        //allows for reset button to stop sequence on click
        document.querySelector("#reset-button").addEventListener("click", function() {
            clearTimeout(flashSequenceTimeOut);
        });
        //allows for start button to stop sequence on click before starting new sequence
        document.querySelector("#start-btn").addEventListener("click", function() {
            clearTimeout(flashSequenceTimeOut);
        });
        //runs isNotFlashing after sequence has stopped
        setTimeout( isNotFlashing, 1000 * (gameSequence.length + 1) )
        
    }

    setTimeout( checkIfFlashing, 1000 * (gameSequence.length + 1) )
    
}

//disableds game squares if sequence is flashing
function checkIfFlashing() {
    if (sequenceFlashing == true) {
            console.log("sequence flashing");
            removeGameSquareEventListener()

        } else if (sequenceFlashing == false) {
            console.log("sequence not flashing");
            addGameSquareEventListener();
        }
} 

function isFlashing () {
    sequenceFlashing = true;
}
    
function isNotFlashing () {
    sequenceFlashing = false;
}

//flashes squares in game sequence 
function flashSquareForSequence(i) {

    gameSquare[i].className += " flash";
    gameSquareBlue();
}

//flashes selected square
function flashSquare() {

    event.currentTarget.className += " flash";
    gameSquareBlue();
}

//adds the integer of selected game square to player sequence array
function createPlayerSequence() {
    // '+' turns dataset.square from a string into an intager
    let squareNumber = +event.currentTarget.dataset.square
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
            success();
            incrementRound();
            flashSequence();
            playerSequence = [];
        } else {
            //removes one life, clears players sequence and replays game sequence
            if (lives.innerHTML > 0) {
                fail();
                playerSequence = [];
                decrementLives();
                flashSequence();
            }else {
                //resets players sequence and round score. starts new game
                console.log("incorrect!");
                clickPlayAgainButton();
            }
        }
    } else if (playerSequence.length < gameSequence.length) {
        console.log("click more squares");
    }
}
//flashes well done message
function success () {
    setTimeout (function () {
    flashSquaresSuccess();
    }, 500);

}
//flashed try again message
function fail () {
    setTimeout (function () {
    flashSquaresFail();
    }, 500);
}
//flashes game squares green
function flashSquaresSuccess () {
    for (i = 0; i < gameSquare.length; i++) {
        
        gameSquare[i].className += " flash-success";

        gameSquareBlue();
    }
}
//flashes game squares red
function flashSquaresFail () {
    for (i = 0; i < gameSquare.length; i++) {
        
        gameSquare[i].className += " flash-fail";

        gameSquareBlue();
    }
}

// generates 1 random number between 1 and max number of game squares, adds to current sequence.
function incrementSequence() {
    let randomNum = Math.floor(Math.random() * gameSquare.length + 1)
    gameSequence.push(randomNum);
    console.log(gameSequence);
}

//increment current round by 1 and calls incrememntSequence
function incrementRound() {
   currentRound.innerHTML++

   if (currentRound.innerHTML > highScore.innerHTML) {
       incrememntHighScore();
   }

   incrementLives();

   incrementSequence();
}
//incements high score
function incrememntHighScore() {
    hightScore.innerHTML++
}
//increments lives if player reaches round 5 and 10
function incrementLives () {
    if (currentRound.innerHTML === "5" || currentRound.innerHTML === "10" ) {
        lives.innerHTML++;
    }
}
//decrements lives
function decrementLives () {
    lives.innerHTML--;
}

//bring up play again modal 
function clickPlayAgainButton () {
    document.querySelector("#play-again-hidden-btn").click()
}
//resets game sequence/player sequence/round/lives
function reset () {
    gameSequence = [];
    playerSequence = [];
    currentRound.innerHTML = 0;
    lives.innerHTML = 3;
}
//reconfigurs game area for current difficulty
function changeDificulty () {
    reset();
    document.querySelector("#difficulty-setting").innerHTML = this.innerHTML;
    if (this.innerHTML === "Easy"){
        //creates new game section layout with 4 squares
        mainGameSection.innerHTML = easyConfig;
        addGameSquareEventListener();

    } else if ( this.innerHTML === "Medium") {
        //creates new game section layout with 9 squares
        mainGameSection.innerHTML = mediumConfig;
        addGameSquareEventListener(); 
        
    } else if ( this.innerHTML === "Hard") {
        //creates new game section layout with 16 squares
        mainGameSection.innerHTML = hardConfig;
        addGameSquareEventListener();
    }
}
//changes from hard to medium config if screen size below 750px
function removeHardConfig () {
    if (screenSizeMdSm.matches && mainGameSection.innerHTML == hardConfig) {
        mainGameSection.innerHTML = mediumConfig;
        addGameSquareEventListener();
        document.querySelector("#difficulty-setting").innerHTML = "Medium";
    }
}

//creates event hadler for current game squares
function addGameSquareEventListener () {
    gameSquare = document.querySelectorAll(".game-square");

    for(let i = 0; i < gameSquare.length; i++){
        gameSquare[i].addEventListener("click", flashSquare);
        gameSquare[i].addEventListener("click", createPlayerSequence);
        gameSquare[i].addEventListener("click", checkSequences);
        
    }
}
//removes event handler for current game squares
function removeGameSquareEventListener () {
    gameSquare = document.querySelectorAll(".game-square");

    for(let i = 0; i < gameSquare.length; i++){
        gameSquare[i].removeEventListener("click", flashSquare);
        gameSquare[i].removeEventListener("click", createPlayerSequence);
        gameSquare[i].removeEventListener("click", checkSequences);
        
    }
}


//------------------------event listeners----------------

//listen for which difficulty setting is clicked
for(i = 0; i < dificultyLevel.children.length; i++)
dificultyLevel.children[i].addEventListener("click", changeDificulty);

//listening for if start button is clicked
startButton.addEventListener("click", startGame);

//if play again button is clicked game will start again
document.querySelector("#play-again-modal-btn").addEventListener("click", startGame);

//clears stats if "no thanks" is selected at end of game
document.querySelector("#no-thanks-modal-btn").addEventListener("click", reset);

//clears stats if reset is clicked
document.querySelector("#reset-button").addEventListener("click", reset);


// listening for if game square is clicked
    gameSquare = document.querySelectorAll(".game-square");

    for(let i = 0; i < gameSquare.length; i++){
        gameSquare[i].addEventListener("click", flashSquare);
        gameSquare[i].addEventListener("click", createPlayerSequence);
        gameSquare[i].addEventListener("click", checkSequences);
    }

//runs function if screensize is below 750px
screenSizeMdSm.addListener(removeHardConfig);