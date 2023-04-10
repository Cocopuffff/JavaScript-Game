// Provided variables
const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');


const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const row = 10;
const col = 10;


// Other global variables
let field =[[]];
let numOfHoles = 12;
let pathRow = 0;
let pathCol = 0;
let pathCharPos = field[pathRow][pathCol];              //true current position of pathCharacter

// Generate Level

const generateField = () => {
    // reset pathRow & pathColumn when game restarts
    pathRow = 0;
    pathCol = 0;
    // Generate 10 X 10 array filled with blocks
    for( height = 0; height < row; height++) {
        // Initialise rows
        field[height] = [];
        
        for ( width = 0; width < col; width++) {
            // Generate rows and columns and fill out with blocks
            field[height][width] = fieldCharacter;
        }
    }

    // Generate holes
    for ( let i = 0; i < numOfHoles; i++ ) {
        field[Math.floor(Math.random()*(row))][Math.floor(Math.random()*(col))] = hole;
    }

    // If hole is generated at pathCharacter start position, delete it
    if (field[0][0] == hole) {
        field[0][0] = fieldCharacter;
    }

    // Generate hat
    field[Math.floor(Math.random()*(row))][Math.floor(Math.random()*(col))] = hat;
    
    // If hat is generated at pathCharacter start position, create another one at field[9][9] instead
    if (field[0][0] == hat) {
        field[9][9] = hat;
    }

    // Generate pathCharacter
    field[0][0] = pathCharacter;
}

// Create game display in console
const displayInput = () => {
    clear();
    const display = field.map(height => height.join('')).join('\n');
    console.log(display);
}

const getInput = () => {
    // Prompt user for input
    let input = prompt(`Go which way? Up = U, Down = D, Left = L, Right = R`).toUpperCase();
    
    // Initialize inputValid as false, only get out of while loop if user enters correct input
    let inputValid = false;
    while (inputValid == false) {
        if ( input == 'U' ) {
            pathRow -= 1;
            inputValid = true;
        } else if ( input == 'D' ) {
            pathRow += 1;
            inputValid = true;
        } else if ( input == 'L' ) {
            pathCol -= 1;
            inputValid = true;
        } else if ( input == 'R' ) {
            pathCol += 1;
            inputValid = true;
        } else {
            input = prompt(`Enter (U, D, L or R) only`).toUpperCase();
        }
    }
    // if-else statement to prevent error if up / down key goes out of bound
    if(pathRow < 0 || pathRow > 9) {
        isPlaying = false;
            console.log(`Out of bounds - Game End! (row)`);
    } else {
        pathCharPos = field[pathRow][pathCol];              //update current position of pathCharacter
        field[pathRow][pathCol] = pathCharacter;
    }
}

// Game over, try again logic
const tryAgain = () => {
    let retryInvalid = true;
    while (retryInvalid) {
        let retry = prompt(`Press Y to try again`).toUpperCase();
        if ( retry == "Y" ) {
            retryInvalid = false;
            isPlaying = true;
            clear();
            difficulty();
            generateField();
            startGame();
        }
    }
}

const difficulty = () => {
    // Prompt user for input
    let hardness = prompt(`What difficulty? Easy = E, Average = A, Hard = H, Crazy = C`).toUpperCase();
    
    // Initialize inputValid as false, only get out of while loop if user enters correct input
    let difficultyValid = false;
    while (difficultyValid == false) {
        if ( hardness == 'E' ) {
            numOfHoles = 5;
            difficultyValid = true;
        } else if ( hardness == 'A' ) {
            numOfHoles = 12;
            difficultyValid = true;
        } else if ( hardness == 'H' ) {
            numOfHoles = 20;
            difficultyValid = true;
        } else if ( hardness == 'C' ) {
            numOfHoles = 40;
            difficultyValid = true;
        } else {
            input = prompt(`Enter (E, A, H, C) only`).toUpperCase();
        }
    }
}


// Game rules
const startGame = () =>{
    let isPlaying = true;
    while (isPlaying) {
        displayInput();
        // LOSE LOGIC: WALK OUT OF BOUND
        if (pathRow < 0 || pathRow > 9 || pathCol < 0 || pathCol > 9) {
            isPlaying = false;
            console.log(`Out of bounds - Game End!`);
            tryAgain();
        } 
        // LOSE LOGIC: FALL DOWN A HOLE
        else if (pathCharPos == hole) {
            isPlaying = false;
            console.log(`Sorry, you fell down a hole!`);
            tryAgain();
        } 
        // WIN LOGIC
        else if (pathCharPos == hat) {
            isPlaying = false;
            console.log(`Congrats, you found your hat!`);
        } 
        // KEEP PLAYING
        else {
            getInput();
        }
    }
}

difficulty();
generateField();
startGame();
