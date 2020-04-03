/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/* Variables explanation

    playerScores - array to hold total scores of each player.
    roundScore - variable to hold score of current round.
    activePlayer - variable to indicate which player's round it is.
    diceValue - variable to used to store the value of the dice roll.
    gameActive - state variable to indicate whether the game is active or not
*/

var playerScores, roundScore, activePlayer, diceValue, gameActive, winState;


// Function to initialize the game, whenever the game is loaded for the first time,
// and when 'New Game' is clicked, or refresh is clicked.

init();

/*

    To obtain a random number, we use the random method of the Math object, provided 
    in the JavaScript library. It returns a random decimal number between 0 and 1.
    But since we want a random integer number between 1 and 6, we multilply the
    value returned by the random method with 6, and floor it (to truncate the decimal part).
    This will then give us random values between 0 and 5 (because of floor, not ceil).
    To get the values from 1 to 6, we simply add 1 to the total result.
    Or we could just simply use ceil to avoid adding 1.

*/

//diceValue = Math.ceil(Math.random() * 6);




// DOM Manipulation Practise


// current + activePlayer is the ID of the current round score of Player-0, whose value we set to diceValue.

// document.querySelector('#current-' + activePlayer).textContent = diceValue;



// To manipulate the HTML content of the webpage, we use the innerHTML method, as follows:

// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';



// To manipulate the CSS content of the webpage, we use the style method, as follows:

// document.querySelector('.dice').style.display = 'none';



// Event handling

// Event listener for dice roll.

document.querySelector('.btn-roll').addEventListener('click', function () {

    // Only if the game is active, roll the dice.
    if (gameActive) {

        // Show the dice each time the player clicks roll.
        document.querySelector('.dice').style.display = 'block';
        // Generate the random number.
        diceValue = Math.ceil(Math.random() * 6);

        // Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.src = 'dice-' + diceValue + '.png';

        // Update the round score if the rolled number is not a 1.
        if (diceValue !== 1) {
            // Add to the round score
            roundScore += diceValue;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else {
            // Switch the players;
            togglePlayer();
        }
    }
});

// Event listner for hold button.

document.querySelector('.btn-hold').addEventListener('click', function () {

    // Only if the game is active, the hold button should be functional.
    if (gameActive) {
        // Once the hold button is clicked on, we have to add the current score to the global score.

        playerScores[activePlayer] += roundScore;
        roundScore = 0;

        // Change the visual element of the global score
        document.querySelector('#score-' + activePlayer).textContent = playerScores[activePlayer];

        // Check if the active player has won the game.
        if (playerScores[activePlayer] >= 100) {

            // Display the winning message
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            // Hide the dice
            document.querySelector('.dice').style.display = 'none';
            // Add the winner panel (custom css defined in the css file)
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            // Remove the active class (current player)
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            // Reset the current score
            document.getElementById('current-' + activePlayer).textContent = '0';
            // Set the win state to true
            winState = true;
            // Set the game to inactive, because the win state has been achieved.
            gameActive = false;
        }

        // We also have to switch the players once the hold button is clicked.
        togglePlayer();
    }
});

// Function declaration and definiton after function call works because of Function Hoisting.
function togglePlayer() {

    // If winning state has been achieved, then add active class to the winner (active player), and remove it from the loser.
    if (winState) {

        document.querySelector('player-' + activePlayer + '-panel').classList.add('active');
        document.querySelector('player-' + Math.abs(activePlayer - 1) + '-panel').classList.remove('active');
    }
    // According to the rules, if the player rolls a 1, make the current score of that round = 0
    document.getElementById('current-' + activePlayer).textContent = '0';

    // If dice rolls a 1, switch the players.
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    // Reset the round score back to zero
    roundScore = 0;

    /*
        We must also switch change the visibility i.e. player selection panel.
        The following removes the active class from player-0-panel, and adds it to
        player-1-panel. But this will only be valid when the switch is made from 
        player-0 to player-1. To handle that, we can use an if condition, and write
        add and remove for both cases.
    */

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    // Instead of that we can simply toggle for both players, whenever the dice rolls 1.

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // We also need to hide the dice, each time the dice rolls 1.

    document.querySelector('.dice').style.display = 'none';
}


// Event listener for 'New Game' button.

document.querySelector('.btn-new').addEventListener('click', init);



// Initialize the game parameters.
function init() {

    // Reset the values.

    playerScores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gameActive = true;
    winState = false;

    // Hide the dice
    document.querySelector('.dice').style.display = 'none';

    /*
    Change the values from the HTML page using getElementById method.
    Everytime the New Game button is clicked or if the page is refreshed, 
    the starting values will be 0.
    */

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Change the player names.
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    // Remove the winner class from the winner of the previous round.
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    // Remove the active class from the players.
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    /*
        We remove the active-class from Player-0, and then add it back again,
        because if we do not remove the active class before adding it again,
        there would be two active classes for Player 0.
    */

    // Add active class to Player-0
    document.querySelector('.player-0-panel').classList.add('active');
}