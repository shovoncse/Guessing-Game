/*
GAME FUNCTIONS:
-------------
- Player must guess a number between a min and max.
- Player gets a certain amount of guesses
- Notify Player of guesses Remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1,
    max = 10,
//    winningNum = getRandWinNum(min, max),
    winningNum = 2,
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message'),
      progress = document.querySelector('.progress-bar');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.classList.contains('play-again')){
        window.location.reload();
    }
});

// Listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);
    loading.style.display = 'block';
    guessBtn.disabled = true;

    setTimeout(function(){
        
        loading.style.display = 'none';
        guessBtn.disabled = false;

        // Validate
        if(isNaN(guess) || guess < min || guess > max){
            setMessage(`Please enter a number between ${min} and ${max}`, 'red');
        }else{
            // Check if won
            if(guess === winningNum){

                gameOver(true, `${winningNum} is Correct, YOU WIN`);

                // progress(width,parentHeight,addClass,text);
                Showprogress('100%','25px','bg-success',"WIN!! WIN!! WIN!!");

            }else{

                // Wrong Number
                guessesLeft -= 1;

                if(guessesLeft === 0){

                    // Game Over - Lost
                    gameOver(false, `Game over, you lost!. The correct number was ${winningNum}`);

                    // progress(width,parentHeight,addClass,text);
                    Showprogress('100%','25px','bg-danger',"Wrong!! Game over ");


                }else{
                    // Game continues - Answer Wrong

                    //Change border color
                    guessInput.style.borderColor = 'red';
                    // Text Color
                    message.style.color = 'red';
                    // Clear input
                    guessInput.value = '';

                    let guessOrguesses = '';

                    guessesLeft === 1 ? guessOrguesses = 'guess' : guessOrguesses = 'guesses' ;
                    
                    // Tell User its the wrong number
                    setMessage(`${guess} is not correct, ${guessesLeft} ${guessOrguesses} Left `, 'red');

                    switch(guessesLeft){
                        case 2:
                            // progress(width,parentHeight,addClass,text);
                            Showprogress('33%','25px','bg-info',"Wrong!! 2 Guesses Left ");
                            break;
                        case 1:
                            // progress(width,parentHeight,addClass,text);
                            Showprogress('66%','25px','bg-warning',"Wrong!! 1 Guesses Left ");
                            break;
                    }
                }
            }
        }
    },1000);
    
});

// Game Over
function gameOver(won, msg){

    let color;

    won === true ? color = 'green' : color = 'red' ;

    // Disable Input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = color;
    // Set Color
    message.style.color = color;
    // Set Message
    setMessage(msg, color);

    // Play again?
    guessBtn.innerHTML = 'Play Again';
    guessBtn.className += ' play-again';


}

// Get Random winning number
function getRandWinNum(min, max){
    return Math.floor(Math.random() * ( max - min + 1 ));
}

// Set message
function setMessage(msg, color){
    message.innerHTML = msg;
    message.style.color = color;
}

// Progress
function Showprogress(width,parentHeight,addClass,text){
    progress.className = 'progress-bar';
    progress.style.width = width;
    progress.parentElement.style.height = parentHeight;
    progress.classList.add(addClass);
    progress.innerHTML = text;
}