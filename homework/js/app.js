import { dictionary } from './dictionary.js';

const wordList = dictionary; 
const state = {
    answer: wordList[Math.floor(Math.random() * wordList.length)],
    board: Array(6).fill().map(() => Array(5).fill('')),
    currentRow: 0,
    currentCol: 0,
}


const checkBtn = document.getElementById('check');
checkBtn.addEventListener('click', checkAnswer);
function checkAnswer(){
    if(state.currentCol === 5){
        const word = getUserWord();
        if(isAnswerCorrect(word)){
            revealAnswer(word);
            state.currentRow++;
            state.currentCol = 0;
        } else {
            alert('Not in world list');
        }
        checkBtn.classList.remove('active');
    } 
}

const resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click', pageReload);
function pageReload(){
    location.reload();
    return false;
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
    return wordList.includes(word);
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
        pageReload();
    } else if(lose){
        alert('Game over.');
    }
}

const isLetter = (key) => {
    return key.length === 1 && key.match(/[А-ЩЬЮЯҐЄІЇ]/i);
}

const addLetter = (letter) => {
    if(state.currentCol === 5){
        return;
    }
    
    state.board[state.currentRow][state.currentCol] = letter;
    state.currentCol++;

    if(state.board[state.currentRow][4] !== ''){
        checkBtn.classList.add('active');
    }
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
}

initGame();

