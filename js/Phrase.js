/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    phrase;

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
        if (this.phrase.indexOf(keySelection) > -1) {
            return true;
        } else {
            return false;
        }
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