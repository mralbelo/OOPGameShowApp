/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */


class Game {
    // properties initialization
    missed = 0;
    phrases = [];
    activePhrase = null;
    phrase = null;
    overlay = null;

    constructor(missed, phrases, activePhrase) {
        this.missed = missed;
        this.phrases = phrases;
        this.activePhrase = activePhrase;
    }

    startGame() {
        this.overlay = document.querySelector('#overlay');
        this.overlay.remove();

        // Gets a phrase from phrases arr
        this.activePhrase = this.getRandomPhrase();
        // Initialized Phrase obj with activePhrase
        this.phrase = new Phrase(this.activePhrase);
        // Calls the addPhraseToDisplay method
        this.phrase.addPhraseToDisplay();
    }

    getRandomPhrase() {
        var index = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[index];
    }

    handleInteraction(keySelection) {
        var found = this.phrase.checkLetter(keySelection);
        if (!found) {
            this.removeLife();
        }
        this.checkForWin();
    }

    removeLife() {
        if (this.missed <= 4) {
            const life = document.querySelector('.tries');
            life.remove()
            this.missed += 1;
        } 
    }

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

    gameOver() {
        this.resetGame();
        const mainContainer = document.querySelector('.main-container');
        mainContainer.insertBefore(this.overlay, document.querySelector('#banner'));
        var message = document.querySelector('#game-over-message'); 
        if (this.missed == 5) {
            message.textContent = 'you lose';
        } else {
            message.textContent = 'you win';
        }
    }

    resetGame() {
        // Resets phrase
        const phraseUl = document.querySelector('#phrase ul');
        phraseUl.innerHTML = '';   

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