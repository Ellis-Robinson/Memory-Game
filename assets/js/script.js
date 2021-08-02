// jshint esversion: 6
// To do list
//  - remove undeeded console logs
// - add reset highscore (clear stats)
// - add function to display countdown timer
// figure out how to change difficulty during a sequece and not cause console error
// - figure out why difficulty change wont show new config

let mainGameSection = document.querySelector("#main-game-section");

let gameSequence = [];

let playerSequence = [];

let gameSquare = [];

let sequenceFlashing = false;

let screenSizeMdSm = window.matchMedia("(max-width: 750px)");

let screenSizeSm = window.matchMedia("(max-width: 315px)");

let startButton = document.querySelector("#start-button");

const currentRound = document.querySelector("#currentRound");

const highScore = document.querySelector("#highScore");

const lives = document.querySelector("#lives");

const dificultyLevel = document.querySelector("#difficulty-ul");

let difficultyDropdownOptions = document.querySelectorAll(".dropdown-item");


//-----------------functions----------------------------

// starts game
function startGame() {

    document.querySelector("#start-button-div").className = "col-3 center hidden absolute";
    document.querySelector("#reset-button-div").className = "col-3 center";
    playerSequence = [];
    gameSequence = [];
    currentRound.innerHTML = 0;
    resetLives();
    createSequence();
    flashSequence();
}

//clears player and game sequence. generates an array of random numbers between 1 and max square length 
function createSequence() {

    for (let i = 0; i < 3; i++) {
        //gameSquare.length + 1 accounts for Math.floor rouding the number down
        let randomNums = Math.floor(Math.random() * gameSquare.length + 1);

        gameSequence.push(randomNums);
    }


}
//returns game squares to blue
function gameSquareBlue() {
    setTimeout(function () {
        for (let i = 0; i < gameSquare.length; i++){
            gameSquare[i].classList.remove("flash");
    }}, 200);
}

function removeCorrectAndFailFlash() {
    setTimeout(function () {
        for (let i = 0; i < gameSquare.length; i++){
            gameSquare[i].classList.remove("flash-correct");
            gameSquare[i].classList.remove("flash-fail");
        }
    }, 200);
}



//targets game squares and flashes them in order of game sequence
function flashSequence() {

    isFlashing();

    checkIfFlashing();

    for (let i = 0; i < gameSequence.length; i++) {

        let flashSequenceTimeOut = setTimeout(function () {

            //-1 corrects sequence of flashes
            flashSquareForSequence(gameSequence[i] - 1);

            //+1 delays start time by 2.5 second
        }, 1000 * (i + 2.5));

        //allows for reset button to stop sequence on click
        document.querySelector("#reset-button").addEventListener("click", function () {
            clearTimeout(flashSequenceTimeOut);
            clearTimeout(checkFlashingTimeout);
            isNotFlashing();
            checkIfFlashing();
        });

        document.querySelectorAll(".dropdown-item")[0].addEventListener("click", function () {
            clearTimeout(flashSequenceTimeOut);
            clearTimeout(checkFlashingTimeout);
        })
        document.querySelectorAll(".dropdown-item")[1].addEventListener("click", function () {
            clearTimeout(flashSequenceTimeOut);
            clearTimeout(checkFlashingTimeout);
        })
        document.querySelectorAll(".dropdown-item")[2].addEventListener("click", function () {
            clearTimeout(flashSequenceTimeOut);
            clearTimeout(checkFlashingTimeout);
        })

        //runs isNotFlashing after sequence has stopped
        setTimeout(isNotFlashing, 1000 * (gameSequence.length + 1));

    }


    //runs checkIfFlashing after sequence has stopped
    let checkFlashingTimeout =
        setTimeout(checkIfFlashing, 1000 * (gameSequence.length + 2.5));
}

//disableds game squares if sequence is flashing, adds event listeners if sequence isnt flashing
function checkIfFlashing() {
    if (sequenceFlashing == true) {
        if (document.querySelector("#game-area-easy").className === "animate__animated animate__zoomIn") {
            removeGameSquareEasyEventListener();
        } else if (document.querySelector("#game-area-medium").className === "animate__animated animate__zoomIn") {
            removeGameSquaremediumEventListener();
        } else if (document.querySelector("#game-area-hard").className === "animate__animated animate__zoomIn") {
            removeGameSquarehardEventListener();
        }
        setTimeout(function () {
            let playerPrompt = document.querySelector("#player-prompt");
            playerPrompt.innerHTML = "Pay attention..";
            playerPrompt.className = "center animate__shakeX prompt";
        }, 1000);


    } else if (sequenceFlashing == false) {
        let playerPrompt = document.querySelector("#player-prompt");
        addGameSquareEasyEventListener();
        playerPrompt.innerHTML = "Go!";
        playerPrompt.className = "center animate__flash prompt";
        if (document.querySelector("#game-area-easy").className === "animate__animated animate__zoomIn") {
            addGameSquareEasyEventListener();
        } else if (document.querySelector("#game-area-medium").className === "animate__animated animate__zoomIn") {
            addGameSquaremediumEventListener();
        } else if (document.querySelector("#game-area-hard").className === "animate__animated animate__zoomIn") {
            addGameSquarehardEventListener();
        }
    }
}

function isFlashing() {
    sequenceFlashing = true;
}

function isNotFlashing() {
    sequenceFlashing = false;
}

//flashes squares in game sequence 
function flashSquareForSequence(i) {

    gameSquare[i].className += " flash";
    gameSquareBlue();
    playPopSfx();
}

//flashes selected square
function flashSquare() {

    event.currentTarget.className += " flash";
    gameSquareBlue();
}

//plays popping sfx
function playPopSfx() {
    let pop = document.querySelector("#pop");
    pop.play();
}

//adds the integer of selected game square to player sequence array
function createPlayerSequence() {
    // '+' turns dataset.square from a string into an intager
    let squareNumber = +event.currentTarget.dataset.square;
    playerSequence.push(squareNumber);
}

//if player sequence length is the same as game sequence length compare both, then clear player sequence
function checkSequences() {

    if (playerSequence.length === gameSequence.length) {
        if (playerSequence.toString() === gameSequence.toString()) {
            //increments round and shows the next incrememnted sequence
            correct();
            incrementRound();
            flashSequence();
            playerSequence = [];
        } else {
            //removes one life, clears players sequence and replays game sequence
            if (+lives.children.length > 1) {
                fail();
                playerSequence = [];
                decrementLives();
                flashSequence();
            } else {
                //resets players sequence and round score. starts new game
                reset();
                clickPlayAgainButton();
                document.querySelector("#fail").play();
            }
        }
    }
}
//flashes well done message
function correct() {
    document.querySelector("#correct").play();
    setTimeout(function () {
        flashSquaresCorrect();
    }, 600);

}
//flashed try again message
function fail() {
    setTimeout(function () {
        flashSquaresIncorrect();
    }, 500);
}
//flashes game squares green
function flashSquaresCorrect() {
    document.querySelector("#correct").play();
    for (let i = 0; i < gameSquare.length; i++) {

        gameSquare[i].className += " flash-correct";

        removeCorrectAndFailFlash();
    }
}
//flashes game squares red
function flashSquaresIncorrect() {
    document.querySelector("#incorrect").play();
    for (let i = 0; i < gameSquare.length; i++) {

        gameSquare[i].className += " flash-fail";

        removeCorrectAndFailFlash();
    }
}

// generates 1 random number between 1 and max number of game squares, adds to current sequence.
function incrementSequence() {
    let randomNum = Math.floor(Math.random() * gameSquare.length + 1);
    gameSequence.push(randomNum);
}

//increment current round by 1 and calls incrememntSequence
function incrementRound() {
    //delays function to align with green 'correct' flash
    setTimeout(function () {
        currentRound.innerHTML++;
        //incrememnts highscore to highest round reached
        if (+currentRound.innerHTML > +highScore.innerHTML) {
            highScore.innerHTML = currentRound.innerHTML;
        }
        if (+currentRound.innerHTML === 5 || +currentRound.innerHTML === 10) {
            incrementLives();
        }
    }, 500);

    incrementSequence();
}

//increments lives if player reaches round 5 and 10
function incrementLives() {
    let oneLife = document.createElement("I");
    oneLife.className = "fas fa-heart red-heart";
    lives.appendChild(oneLife);
}
//decrements lives
function decrementLives() {
    //delays heart removal so it aligns with red 'fail' flash
    setTimeout(function () {
        lives.removeChild(lives.lastElementChild);
    }, 500);

}

//bring up play again modal 
function clickPlayAgainButton() {

    document.querySelector("#play-again-hidden-btn").click();

}
//resets game sequence/player sequence/round/lives
function reset() {
    gameSequence = [];
    playerSequence = [];
    currentRound.innerHTML = 0;
    isNotFlashing();
    resetLives();
    document.querySelector("#start-button-div").className = "col-3 center";
    document.querySelector("#reset-button-div").className = "col-3 center hidden absolute"
    document.querySelector("#player-prompt").className = "center hidden"
}

function resetLives() {
    lives.innerHTML = "";
    for (let i = 0; i < 3; i++) {
        incrementLives();
    }
}

//reconfigurs game area for current difficulty
function changeDificulty() {
    reset();
    let difficultySetting = document.querySelector("#difficulty-setting");
    
    if (difficultySetting.innerHTML === "Medium") {
        //creates new game section layout with 9 squares
        document.querySelector("#game-area-medium").className = "animate__animated animate__zoomIn";
        document.querySelector("#game-area-easy").className = "animate__animated animate__zoomIn hidden";
        document.querySelector("#game-area-hard").className = "animate__animated animate__zoomIn hidden";

        addGameSquareMediumEventListener();

    }

    if (difficultySetting.innerHTML === "Easy") {
        //creates new game section layout with 4 squares
        document.querySelector("#game-area-easy").className = "animate__animated animate__zoomIn";
        document.querySelector("#game-area-medium").className = "animate__animated animate__zoomIn hidden";
        document.querySelector("#game-area-hard").className = "animate__animated animate__zoomIn hidden";

        addGameSquareEasyEventListener();

    }
    
    if (difficultySetting.innerHTML === "Hard") {
        //creates new game section layout with 16 squares
        document.querySelector("#game-area-hard").className = "animate__animated animate__zoomIn";
        document.querySelector("#game-area-easy").className = "animate__animated animate__zoomIn hidden";
        document.querySelector("#game-area-medium").className = "animate__animated animate__zoomIn hidden";
        
        addGameSquareHardEventListener();
    }

    console.log("difficulty changed");
}
//keeps difficulty level as is and flashed the sequence again.
function dontChangeDifficulty() {
    if (gameSequence.length > 0) {
        flashSequence();
    }
    let difficultySetting = document.querySelector("#difficulty-setting");

    if (document.querySelector("#game-area-easy").className === "animate__animated animate__zoomIn") {
        difficultySetting.innerHTML = "Easy";
    } else if (document.querySelector("#game-area-medium").className === "animate__animated animate__zoomIn") {
        difficultySetting.innerHTML = "Medium";
    } else if (document.querySelector("#game-area-hard").className === "animate__animated animate__zoomIn") {
        difficultySetting.innerHTML = "Hard";
    }
}
//changes from medium to easy config if screen size below 315px
function removeMediumConfig() {
    if (screenSizeSm.matches && document.querySelector("#game-area-medium").className === "animate__animated animate__zoomIn") {
        document.querySelector("#game-area-easy").className = "animate__animated animate__zoomIn"
        document.querySelector("#game-area-medium").className = "animate__animated animate__zoomIn hidden"
        addGameSquareEasyEventListener();
        document.querySelector("#difficulty-setting").innerHTML = "Easy";
    }
}
//changes from hard to medium config if screen size below 750px
function removeHardConfig() {
    if (screenSizeMdSm.matches && document.querySelector("#game-area-hard").className === "animate__animated animate__zoomIn") {

        addGameSquareMediumEventListener();
        document.querySelector("#game-area-medium").className = "animate__animated animate__zoomIn"
        document.querySelector("#game-area-hard").className = "animate__animated animate__zoomIn hidden"
        document.querySelector("#difficulty-setting").innerHTML = "Medium";
    }
}


//creates event hadler for current game squares
function addGameSquareEasyEventListener() {
    gameSquare = document.querySelectorAll(".game-square-easy");

    for (let i = 0; i < gameSquare.length; i++) {
        gameSquare[i].addEventListener("click", flashSquare);
        gameSquare[i].addEventListener("click", createPlayerSequence);
        gameSquare[i].addEventListener("click", checkSequences);
        gameSquare[i].addEventListener("click", playPopSfx);
    }
}

function addGameSquareMediumEventListener() {
    gameSquare = document.querySelectorAll(".game-square-medium");

    for (let i = 0; i < gameSquare.length; i++) {
        gameSquare[i].addEventListener("click", flashSquare);
        gameSquare[i].addEventListener("click", createPlayerSequence);
        gameSquare[i].addEventListener("click", checkSequences);
        gameSquare[i].addEventListener("click", playPopSfx);
    }
}

function addGameSquareHardEventListener() {
    gameSquare = document.querySelectorAll(".game-square-hard");

    for (let i = 0; i < gameSquare.length; i++) {
        gameSquare[i].addEventListener("click", flashSquare);
        gameSquare[i].addEventListener("click", createPlayerSequence);
        gameSquare[i].addEventListener("click", checkSequences);
        gameSquare[i].addEventListener("click", playPopSfx);
    }
}
//removes event handler for current game squares
function removeGameSquareEasyEventListener() {
    gameSquare = document.querySelectorAll(".game-square-easy");

    for (let i = 0; i < gameSquare.length; i++) {
        gameSquare[i].removeEventListener("click", flashSquare);
        gameSquare[i].removeEventListener("click", createPlayerSequence);
        gameSquare[i].removeEventListener("click", checkSequences);
        gameSquare[i].removeEventListener("click", playPopSfx);
    }
}

function removeGameSquareMediumEventListener() {
    gameSquare = document.querySelectorAll(".game-square-Medium");

    for (let i = 0; i < gameSquare.length; i++) {
        gameSquare[i].removeEventListener("click", flashSquare);
        gameSquare[i].removeEventListener("click", createPlayerSequence);
        gameSquare[i].removeEventListener("click", checkSequences);
        gameSquare[i].removeEventListener("click", playPopSfx);
    }
}

function removeGameSquareHardEventListener() {
    gameSquare = document.querySelectorAll(".game-square-Hard");

    for (let i = 0; i < gameSquare.length; i++) {
        gameSquare[i].removeEventListener("click", flashSquare);
        gameSquare[i].removeEventListener("click", createPlayerSequence);
        gameSquare[i].removeEventListener("click", checkSequences);
        gameSquare[i].removeEventListener("click", playPopSfx);
    }
}
//toggles background music on or off
function toggleMusic() {
    let music = document.querySelector("#calm");

    let soundBtn = document.querySelector("#soundButton");

    if (music.paused) {
        music.play();
        music.volume = 0.5;
        soundBtn.className = "glow fas fa-volume-up";
    } else {
        music.pause();
        soundBtn.className = "glow fas fa-volume-mute";
    }


}

//------------------------event listeners----------------
window.onload = function () {

    resetLives();

    addGameSquareEasyEventListener();

    //listens for if speaker button clicked
    document.querySelector("#soundButton").addEventListener("click", toggleMusic);

    //listen for which difficulty setting is clicked and changes inner HTML of difficulty setting
    for (let i = 0; i < dificultyLevel.children.length; i++)
        dificultyLevel.children[i].addEventListener("click", function () {
            document.querySelector("#difficulty-setting").innerHTML = this.innerHTML;
        });

    //changes difficulty if user selects yes in change difficulty modal
    document.querySelector("#change-difficulty-yes-button").addEventListener("click", changeDificulty);

    //keeps difficulty the same if user selects no in change difficulty modal
    document.querySelector("#change-difficulty-no-button").addEventListener("click", dontChangeDifficulty);

    //listening for if start button is clicked
    startButton.addEventListener("click", startGame);

    //if play again button is clicked game will start again
    document.querySelector("#play-again-modal-btn").addEventListener("click", startGame);

    //clears stats if "no thanks" is selected at end of game
    document.querySelector("#no-thanks-modal-btn").addEventListener("click", reset);

    //clears stats if restart yes is clicked
    document.querySelector("#restart-yes-button").addEventListener("click", reset);

    //flashes sequence if player chose to not restart
    document.querySelector("#restart-no-button").addEventListener("click", flashSequence);

    //runs function if screensize is below 750px
    screenSizeMdSm.addListener(removeHardConfig);

    //runs function if screensize is below 315px
    screenSizeSm.addListener(removeMediumConfig);

};