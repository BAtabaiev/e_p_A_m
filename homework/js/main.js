// Write your code here
const requestURL =  'https://jsonplaceholder.typicode.com/users';

const xhrBtn = document.querySelector('.js-container__button');
const fetchBtn = document.querySelector('.fetch-container__button');
const xhrCont = document.querySelector('.js-container');
const fetchCont = document.querySelector('.fetch-container');

xhrBtn.addEventListener('click', () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', requestURL);
    xhr.onload = function() {
        const users = JSON.parse(xhr.response);
        const userBlock = document.createElement('div');
        userBlock.classList.add('js-container__block');
        xhrCont.appendChild(userBlock);
        users.forEach(user => {
            addUser(user, userBlock, false);
        });
    };
    
    xhr.send(); 


})

function addUser(user, userBlock, isFetch) {
    if(isFetch) {
        const userBlockData = document.createElement('div');
        userBlockData.classList.add('fetch-container__block__data');
        userBlockData.innerHTML = 
            `
            <div class="fetch-container__block__data">

                <span class="data-text">${user.name}</span>
                <div class="fetch__buttons">
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </div>

                <div class="form">
                    <input type="text" class="input">
                    <button class="save">Save</button>
                </div>

            </div>   
            `
            const edit = document.querySelector('.edit');
            
            const form = document.querySelector('.form');
            
            edit.addEventListener('click', () => {
                form.classList.remove('form');
                form.classList.add('form__active')
            });
            userBlock.appendChild(userBlockData);
    } else {
        const userBlockData = document.createElement('div');
        userBlockData.classList.add('js-container__block__data');
        userBlockData.innerHTML = 
            `
                <span class="data-text">${user.name}</span>
            
            `
        userBlock.appendChild(userBlockData);
    }   
}


fetchBtn.addEventListener('click', () => {
   fetch(requestURL)
   .then(data => {
        return data.text(); 
   })
   
    .then(data => {
        const users = JSON.parse(data);
        const userBlock = document.createElement('div');
        userBlock.classList.add('fetch-container__block');
        fetchCont.appendChild(userBlock);
        

        users.forEach(user => {
            addUser(user, userBlock, true);
            console.log(user.name);
        })
        
    })
   
})

