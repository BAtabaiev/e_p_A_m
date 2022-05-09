const nickname = document.getElementById('nickname');
const start = document.getElementById('start');
const best_result = document.getElementById('best_result');
const best_result_all = document.getElementById('best_result_all');
const clear = document.getElementById('clear');
const clear_all = document.getElementById('clear_all');
const click_btn = document.getElementById('click_btn');
let count;
let mySession = window.sessionStorage;
let myStorage = window.localStorage;

start.addEventListener('click', newGame);
best_result.addEventListener('click', checkBestResult);
best_result_all.addEventListener('click', checkBestResultAll);
clear.addEventListener('click', clearBestResult);
clear_all.addEventListener('click', clearBestResultAll);




function newGame(){
    count = 0;
    try{
        if (nickname.value == '') throw new Error('Empty nickname');     
    }
    catch(err){
        return alert(err.message);
    }
    click_btn.addEventListener('click', clickCounter); 
    setTimeout(finishGame, 5000);
}

function clickCounter(){
    count++;
}

function finishGame(){
    click_btn.removeEventListener('click', clickCounter);
    alert(`You clicked ${count} times`);
    let userResult = myStorage.getItem(nickname.value);
    if(!userResult || userResult < count){
        myStorage.setItem(nickname.value, count);
    }
    let sessionResult = mySession.getItem('bestResult');
    if(!sessionResult || sessionResult < count){
        mySession.setItem('bestResult', count);
    }
}

function checkBestResult(){
    if(mySession.getItem('bestResult')){
        alert(`Best result is: ${mySession.getItem('bestResult')} times`);
    } else {
        alert('Best result is 0')
    }
}

function checkBestResultAll(){
    const results = { ...myStorage };
    let max = 0;
    let arr = Object.keys(results).map(x => mathCalc(x))
    function mathCalc(key){
        if(+results[key] > max) {max = results[key]}
        return max;
    } 
    let bestResult = arr.reduce((a, b) => results[a] > results[b] ? a : b);
    let bestResultName = Object.keys(results).find(key => results[key] == bestResult);
    alert(`Best result for the whole time is: ${bestResult} by ${bestResultName}`);
}

function clearBestResult(){
    mySession.clear();
    alert('Best result is cleared')
}

function clearBestResultAll(){
    myStorage.clear();
    alert('Best result for whole time is cleared')
}