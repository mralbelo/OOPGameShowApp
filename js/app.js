/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const btn__reset = document.querySelector('#btn__reset');
const keyboard = document.querySelectorAll('.key');
var game = null;

// Listens for btn__reset click and starts the game
btn__reset.addEventListener("click", () => {
    game = new Game();
    game.startGame();
});

// Adds listener to each of the digital keys
keyboard.forEach(key => key.addEventListener("click", e => { keyboardEventHandler(e); } ));

// passes key to game.handleInteraction method
function keyboardEventHandler(event) {
    var keySelection = event.target.innerText;
    game.handleInteraction(keySelection);
}

// Add a listener for physical keyboard
document.addEventListener('keydown', (event) => {
    // Starts gane on key Enter press
    if(event.key == 'Enter' && game === null) {
        game = new Game();
        game.startGame();
    }
    // passes key to game.handleInteraction method
    if (game !== null) {
        const keyPressed = event.key;
        const keys = document.querySelectorAll('.key');
        keys.forEach(btn => {
            if (btn.textContent === keyPressed && !btn.disabled) {
                game.handleInteraction(keyPressed);
            }
        });
    }
});