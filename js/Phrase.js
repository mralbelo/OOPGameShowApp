/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    phrase = null;

    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    addPhraseToDisplay() {
        const phraseUl = document.querySelector('#phrase ul');

        this.phrase.split('').forEach(char => {
            console.log(char);
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

    checkLetter(keySelection) {
        var found = false;
        var keyClass = '';
        if (this.phrase.indexOf(keySelection) > -1) {
            keyClass = 'chosen'
            found = true;
        } else {
            keyClass = 'wrong'
        }
        var keyButtons = document.querySelectorAll('.key');
        keyButtons.forEach(key => {
            if(key.innerHTML == keySelection) {
                this.showMatchedLetter(keySelection);
                key.setAttribute('disabled', true);
                key.setAttribute('class', keyClass);
            }
        });
        return found;
    }

    showMatchedLetter(keySelection) {
        var letters = document.querySelectorAll(`.${keySelection}`);
        letters.forEach(letter => {
            letter.classList.remove('hide');
            letter.classList.add('show');
        });
    }
}