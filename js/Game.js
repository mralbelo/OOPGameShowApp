/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */


class Game {

    phrase = null;
    overlay = null;

    constructor() {
        this.missed = 0;
        this.phrases = ['Squirrel', 'Straight', 'Reception', 'jazz', 'zodiac', 'unknown'];
        this.activePhrase = null;
    }

    startGame() {
        // Hides the start screen overlay
        this.overlay = document.querySelector('#overlay');
        this.overlay.remove();
        
        // Gets random phrase and assigns it to activePhrase
        this.getRandomPhrase();

        // Initialized Phrase obj with activePhrase
        this.phrase = new Phrase(this.activePhrase);

        // Gets a phrase from phrases arr
        this.activePhrase = this.phrase.addPhraseToDisplay();
    }

    // randomly retrieves one phrase from the phrases array
    getRandomPhrase() {
        var index = Math.floor(Math.random() * this.phrases.length);
        this.activePhrase = this.phrases[index];
    }

    // this method disables the selected digital key, removes a life if the key is not found and checks for win
    handleInteraction(keySelection) {
        const found = this.phrase.checkLetter(keySelection.toLowerCase());
        const keyButtons = document.querySelectorAll('.key');
        
        if (!found) {
            this.removeLife();
        }

        keyButtons.forEach(key => {
            if(key.innerHTML == keySelection.toLowerCase()) {
                this.phrase.showMatchedLetter(keySelection.toLowerCase());
                key.setAttribute('disabled', true);
                key.setAttribute('class', found? 'chosen':'wrong');
            }
        });

        if (this.checkForWin()) {
            this.gameOver();
        }
    }

    // this method removes a life from the missed count and replaces the heart image with the hearless
    removeLife() {
        this.missed += 1;
        if (this.missed == 5) {
           this.gameOver();
        } else {
            const lifes = document.querySelectorAll("img[src='images/heart.png']");
            lifes[lifes.length - 1].src = 'images/heartless.png';
        }
    }

    // this method check if the user has won
    checkForWin() {
        const letters = document.querySelectorAll('.letter');
        let playerWon = true;
        letters.forEach(letter => { 
            if(letter.classList.contains('hide')) {
                playerWon = false;
            }
        });

        return playerWon;
    }

    // this method is called once the game is over and displays the overlay with a message
    gameOver() {
        this.resetGame();
        const mainContainer = document.querySelector('.main-container');
        mainContainer.insertBefore(this.overlay, document.querySelector('#banner'));
        var message = document.querySelector('#game-over-message'); 
        if (this.missed == 5) {
            message.className ="loser";
            message.textContent = "You lost! Better luck next time";
        } else {
            message.className ="winner";
            message.textContent = "You won! Dare to play again?";
        }
    }

    // this method resets the game to its original state
    resetGame() {
        // Resets phrase
        const phraseUl = document.querySelector('#phrase ul');
        phraseUl.innerHTML = '';

        // Resets Score Images
        const lifes = document.querySelectorAll("#scoreboard img");
        lifes.forEach(life => {
            life.src = 'images/heart.png'
        });

        // Resets buttons
        const keyboard = document.querySelectorAll('.keyrow button');
        keyboard.forEach(key => { 
            if (key.hasAttribute('disabled')) {
                key.removeAttribute('disabled');
                key.className = 'key';
            }
         });
    }
}