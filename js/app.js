/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const btn__reset = document.querySelector('#btn__reset');
const keyboard = document.querySelectorAll('.key');

var missed = 0;
var phrases = ['Que carajo', 'Parth Puerco', 'Super Sayian'];
var activePhrase = null;

var game = null;

btn__reset.addEventListener("click", e => {
    game = new Game(missed, phrases, activePhrase);
    game.startGame();
});

keyboard.forEach(key => key.addEventListener("click", e => { keyboarEventHandler(e); } ));

function keyboarEventHandler(event) {
    console.log(event.target.innerText);
    var keySelection = event.target.innerText;
    game.handleInteraction(keySelection);
}