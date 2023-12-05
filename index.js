let currentRow = 0;
let currentTile = 0;
const maxTiles = 5;
let randomWord;
let words = [];

// Function to fetch the words and randomly select one
function loadAndSelectWord() {
    fetch('words.txt')
        .then(response => response.text())
        .then(text => {
            words = text.split('\n'); // Splitting the text content into an array of words
            randomWord = selectRandomWord(words);
        })
        .catch(error => console.error('Error loading word list:', error));
}

// Function to select a random word from an array
function selectRandomWord(words) {
    const index = Math.floor(Math.random() * words.length);
    return words[index].trim(); // Trim to remove any extra whitespace
}

// Call the function to load and select a word
loadAndSelectWord();

document.addEventListener('keydown', (event) => {
    console.log(event.key);
    const tile = document.getElementById(`${currentRow}-${currentTile}`);

    if (currentRow > 5){
        return;
    } else if (event.key === 'Backspace'){
        deleteLetter();
    } else if (event.key === 'Enter' && currentTile === 5){
        checkWord();
    } else if (currentTile < maxTiles && isLetter(event.key)){
        updateGrid(event.key);
    }
});

function isLetter(key) {
    return key.length === 1 && key.match(/[a-z]/i);
}

function deleteLetter() {
    console.log ("Delete")
    if (currentTile > 0) {
    currentTile--;
    const tile = document.getElementById(`${currentRow}-${currentTile}`);
    tile.textContent = '';
    }
}

function updateGrid(letter) {
    const tile = document.getElementById(`${currentRow}-${currentTile}`);
    tile.textContent = letter;
    currentTile++;
}

function getUserGuess() {
    let guessedWord = '';
    for (let i = 0; i < maxTiles; i++) {
        const tile = document.getElementById(`${currentRow}-${i}`);
        guessedWord += tile.textContent;
    }
    return guessedWord.toLowerCase();
}

function checkWord() {
    console.log ("Word check");
    const animation_duration = 500;
    const tile = document.getElementById(`${currentRow}-${currentTile}`);
    // Logic to validate the word goes here
    const guess = getUserGuess();
    if (guess === randomWord){
        for (let i = 0; i < 5; i++){
            const box = document.getElementById(`${currentRow}-${i}`);
            const letter = box.textContent;

            setTimeout(() => {
                if (letter === randomWord[i]) {
                    box.classList.add('right');
                }
            }, ((i + 1) * animation_duration) / 2);

            box.classList.add('animated')
            box.style.animationDelay = `${(i * animation_duration / 2)}ms`;
        }
        setTimeout(() => {
            window.alert('Congrats!')
        }, 1500)
    } else if (words.includes(guess) != true) {
        window.alert("Not in words list")
    } else {
        for (let i = 0; i < 5; i++){
            const box = document.getElementById(`${currentRow}-${i}`);
            const letter = box.textContent;

            setTimeout(() => {
                if (letter === randomWord[i]) {
                    box.classList.add('right');
                } else if (randomWord.includes(letter)) {
                    box.classList.add('wrong');
                } else {
                    box.classList.add('empty');
                }
            }, ((i + 1) * animation_duration) / 2);

            box.classList.add('animated')
            box.style.animationDelay = `${(i * animation_duration / 2)}ms`;
        }

        if (currentRow === maxTiles){
            setTimeout(() => 
            window.alert("Next time! The word was " + randomWord), 1500 );
        } else {
        currentTile = 0;
        }
        currentRow++;
    }

    // Reset the currentTile and increment currentRow for the next word
}

// Add an event listener or a button for the user to trigger checkWord function


function help() {
    console.log ("This is the help button");
}

function settings() {
    console.log ("This is the settings button");
}