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
        // Gets a phrase from phrases arr
        this.activePhrase = this.getRandomPhrase();
        // Initialized Phrase obj with activePhrase
        this.phrase = new Phrase(this.activePhrase);
        // Calls the addPhraseToDisplay method
        this.phrase.addPhraseToDisplay();
    }

    // randomly retrieves one phrase from the phrases array
    getRandomPhrase() {
        var index = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[index];
    }

    // this method disables the selected digital key, removes a life if the key is not found and checks for win
    handleInteraction(keySelection) {
        var found = this.phrase.checkLetter(keySelection.toLowerCase());
        if (!found) {
            this.removeLife();
        }
        this.checkForWin();
    }

    // this method removes a life from the missed count and replaces the heart image with the hearless
    removeLife() {
        if (this.missed <= 4) {
            this.missed += 1;
            const lifes = document.querySelectorAll("img[src='images/heart.png']");
            lifes[lifes.length - 1].src = 'images/heartless.png';
        } 
    }

    // this method check if the user has won
    checkForWin() {
        if (this.missed > 4) {
            this.gameOver();
        }
        const letters = document.querySelectorAll('.letter');
        let isWin = true;
        letters.forEach(letter => { 
            if(letter.classList.contains('hide')) {
                isWin = false;
            }
        });
        if (isWin) {
            this.gameOver();
        }
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
        const lifes = document.querySelectorAll("img[src='images/lostHeart.png']");
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