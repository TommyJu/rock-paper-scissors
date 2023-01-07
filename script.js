//Rock Paper Scissors (creating a UI with JavaScript)


// Returns random string ('rock', 'paper', or 'scissors')
let listOfChoices = ["rock", "paper", "scissors"];
function computerSelection(listOfChoices) {
    return listOfChoices[Math.floor(Math.random()*listOfChoices.length)];
}

// --- Functions ---

// round wins
let playerScore = 0;
let computerScore = 0;

// Takes two strings as arguments and compares them to find a winner
// Returns string denoting each round result
// for every user pick; there is a counter pick, a match, and a non-match
// function will increment an accumulator to keep track of the score
function playRound(playerPick, computerPick) {
    switch(playerPick) {
        case "rock":
            // counter pick (computer wins)
            if (computerPick === "paper") {
                computerScore++;
                return `Round lost, ${computerPick} beats ${playerPick}.`;
            } // match (tie)
            else if (computerPick === playerPick) {
                return `Tie, the computer also picked ${computerPick}.`;
            } // non-match (player wins)
            else {
                playerScore++;
                return `Round won, ${playerPick} beats ${computerPick}.`;
            }
            break;

        case "paper":
            if (computerPick === "scissors") {
                computerScore++;
                return `Round lost, ${computerPick} beats ${playerPick}.`;              
            } 
            else if (computerPick === playerPick) {
                return `Tie, the computer also picked ${computerPick}.`;
            }
            else {
                playerScore++;
                return `Round won, ${playerPick} beats ${computerPick}.`;
            }
            break;

        case "scissors":
            if (computerPick === "rock") {
                computerScore++;
                return `Round lost, ${computerPick} beats ${playerPick}.`;
            }
            else if (computerPick === playerPick) {
                return `Tie, the computer also picked ${computerPick}.`;
            } 
            else {
                playerScore++;
                return `Round won, ${playerPick} beats ${computerPick}.`;
            }
            break;
    }
}

// Announces a winner, toggles roundResult off, RPS buttons off and playAgainButton on
function checkWinner(playerScore, computerScore) {
    if (playerScore == 3) {
        // we cannot toggle a nodelist so we must iterate through it to toggle the RPS buttons
        buttons.forEach(button => {
            button.classList.toggle('hide-element');
        });
        playAgainButton.classList.toggle('hide-element');
        roundResult.classList.toggle('hide-element');
        return "Congratulations! You win.";
    }

    else if (computerScore == 3) {
        buttons.forEach(button => {
            button.classList.toggle('hide-element');
        });
        playAgainButton.classList.toggle('hide-element');
        roundResult.classList.toggle('hide-element');
        return "Better luck next time! You lose.";
    }
}

// resets scores and textContent, toggles roundResult on, RPS buttons on and playAgainButton off, updates scoreBoard
function playAgain() {
    playerScore = 0;
    computerScore = 0;
    roundResult.textContent = "";
    roundResult.classList.toggle('hide-element');
    gameResult.textContent = "";
    
    buttons.forEach(button => {
        button.classList.toggle('hide-element');
    });
    playAgainButton.classList.toggle('hide-element');
    scoreBoard.textContent = `Player: ${playerScore} Computer: ${computerScore}`;
}


// Developing a UI
    // In our old logic, we would simply call the playerSelection() function in our loop
    // and retrieve the input from the user. Now that we have buttons, we
    // need to restructure our game loop so that the buttons are calling
    // the playRound() function with the proper playerSelection value.
    // We also need to create some sort of logic that resets the game
    // once a certain score is reached.

// First, create 3 buttons with event listeners that will call the playRound() function with the
// appropriate playerSelection.
// Create a div for displaying results
    // Use DOM methods instead of console.logs to show results
// Keep track of running score, first to 5 wins
// Scratch the game loop, have the playRound() function interact with an accumulator.
    // We can merge the logic from our game loop into the playRound() function
    // Once either accumulator reaches a certain value, announce winner.
        //create a function checkWinner() to determine a winner based off of the scores
    // Create a function playAgain() that appears after someone wins
        //resets scores and DOM for the next game 

// --- QuerySelectors and Event listeners ---
const buttons = document.querySelectorAll('#rock-btn, #paper-btn, #scissors-btn');
const roundResult = document.querySelector('#round-result');
const gameResult = document.querySelector('#game-result');
const playAgainButton = document.querySelector('#play-again-btn');
const playButton = document.querySelector('#play-btn');
const buttonContainer = document.querySelector('#button-container');
const scoreBoard = document.querySelector('#score-board');
// Assign each button with a parameter from listOfChoices ('rock', 'paper', or 'scissors')
for (let i=0; i<3; i++) {
    buttons[i].parameter = listOfChoices[i];
}

// Assigns each button with an event listener
// calls function playRound() with the button's parameter attribute
// clicking a button will play a round, change the textContent of 
// 'roundResult'/'gameResult', and update scoreBoard
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        roundResult.textContent = playRound(button.parameter, computerSelection(listOfChoices));
        gameResult.textContent = checkWinner(playerScore, computerScore);
        scoreBoard.textContent = `Player: ${playerScore} Computer: ${computerScore}`;
    })
});

playAgainButton.addEventListener('click', playAgain);
playButton.addEventListener('click', () => {
    buttonContainer.classList.toggle('hide-element');
    playButton.classList.toggle('hide-element');
}, {once : true});

scoreBoard.textContent = `Player: ${playerScore} Computer: ${computerScore}`;