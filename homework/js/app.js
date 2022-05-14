/*import { dictionary } from './dictionary.js';

let answer = dictionary[Math.floor(Math.random() * dictionary.length)].toUpperCase;
*/
const dictionary = ['earth', 'plane', 'crane', 'apple', 'curve', 'house', 'mouse', 'rabit'];
const state = {
    answer: dictionary[Math.floor(Math.random() * dictionary.length)],
    board: Array(6).fill().map(() => Array(5).fill('')),
    currentRow: 0,
    currentCol: 0,
}

const updateBoard = () => {
    for(let i = 0; i < state.board.length; i++){

        for(let j = 0; j < state.board[i].length; j++){
            const input = document.getElementById(`input${i}${j}`);
            input.textContent = state.board[i][j];
        }
    }
}

const createInput = (container, row, col, letter = '') => {
    const input = document.createElement('div');
    input.className = "letterCont";
    input.id = `input${row}${col}`;
    input.textContent = letter;
    container.appendChild(input);
    return input;
}

const createBoard = (container) => {
    const board = document.createElement('div');
    board.className = 'boardCont';
    
    for(let c = 0; c < 6; c++){
        for(let r = 0; r < 5; r++){
            createInput(board, c, r);
        }
    }

    container.appendChild(board);
}

const keyboardEvent = () => {
    document.body.onkeydown = (event) => {
        const key = event.key;

        if(key === 'Enter'){
            if(state.currentCol === 5){

                const word = getUserWord();

                if(isAnswerCorrect(word)){
                    revealAnswer(word);
                    state.currentRow++;
                    state.currentCol = 0;
                } else {
                    alert('Not in world list');
                }
            }
        }
        if(key === 'Backspace'){
            removeLetter();
        }
        if(isLetter(key)){
            addLetter(key);
        }

        updateBoard();
    };
}

const getUserWord = () => {
    
    return state.board[state.currentRow].reduce((prev, curr) => prev + curr);
}
const isAnswerCorrect = (word) => {
    return dictionary.includes(word);
}

const revealAnswer = (g) => {
    const row = state.currentRow;

    for(let i = 0; i < 5; i++){
        const input = document.getElementById(`input${row}${i}`);
        const letter = input.textContent;

        if(letter === state.answer[i]){
            input.classList.add('exact');
        } else if (state.answer.includes(letter)){
            input.classList.add('right');
        } else {
            input.classList.add('wrong');
        }
    }

    const win = state.answer === g;
    const lose = state.currentRow === 5;

    if(win){
        alert('Congratulations! You won.');
    } else if(lose){
        alert('Game over.');
    }
}

const isLetter = (key) => {
    return key.length === 1 && key.match(/[a-z]/i);
}

const addLetter = (letter) => {
    if(state.currentCol === 5){
        return;
    }
    state.board[state.currentRow][state.currentCol] = letter;
    state.currentCol++;
}

const removeLetter = () =>{
    if(state.currentCol === 0) return; 
    state.board[state.currentRow][state.currentCol - 1] = '';
    state.currentCol--;
}


const initGame = () => {
    const game = document.getElementById('game');
    createBoard(game);
    keyboardEvent();

    console.log(state.answer);
}

initGame();

