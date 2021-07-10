let gameSquare = document.getElementsByClassName("game-square");


function startGame() {

}
//generates an array of 4 random numbers 
function createSequence() {
    let sequence = [];
    
    for (let i = 0; i <= 3; i++) {
        let randomNum = Math.floor(Math.random()*4 + 1)
        sequence.push(randomNum);
    }
    console.log(sequence);
}

function runSequence() {

}

function checkSequence() {

}

function incrementRound() {

}




function flash() {
    $(this).fadeOut(150).fadeIn(150);
}


//flashes game squares when clicked
for (let i = 0; i < gameSquare.length; i++) {
    gameSquare[i].addEventListener("click", flash)
}
