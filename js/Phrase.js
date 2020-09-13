/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    phrase = null;

    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    // This method displays the phrase
    addPhraseToDisplay() {
        const phraseUl = document.querySelector('#phrase ul');
        // Creates each an element for each letter and/or spaces with their proper css classes and appends them
        this.phrase.split('').forEach(char => {
            var element = document.createElement('li');
            if (char != ' ') {
                element.setAttribute('class', `hide letter ${char}`);
                element.textContent = char;
            } else {
                element.setAttribute('class', 'space')
            }
            phraseUl.appendChild(element);
        });        
    }

    // This method accepts a key value and checks if it exist in the phrase
    checkLetter(keySelection) {
        var found = false;
        var keyClass = '';
        // Adds css class if the key exists on the phrase or not
        if (this.phrase.indexOf(keySelection) > -1) {
            keyClass = 'chosen'
            found = true;
        } else {
            keyClass = 'wrong'
        }
        var keyButtons = document.querySelectorAll('.key');
        // Disables the digital key after it's been pressed
        keyButtons.forEach(key => {
            if(key.innerHTML == keySelection) {
                this.showMatchedLetter(keySelection);
                key.setAttribute('disabled', true);
                key.setAttribute('class', keyClass);
            }
        });
        return found;
    }

    // This method accepts the key and displays the matched letters
    showMatchedLetter(keySelection) {
        var letters = document.querySelectorAll(`.${keySelection}`);
        letters.forEach(letter => {
            letter.classList.remove('hide');
            letter.classList.add('show');
        });
    }
}