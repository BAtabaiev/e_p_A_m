const requestURL =  'https://jsonplaceholder.typicode.com/users';

const xhrBtn = document.querySelector('.js-container__button');
const fetchBtn = document.querySelector('.fetch-container__button');
const xhrCont = document.querySelector('.js-container');
const fetchCont = document.querySelector('.fetch-container');

const loader = document.getElementById("loader");


xhrBtn.addEventListener('click', () => {
    const xhr = new XMLHttpRequest();
    loader.removeAttribute('hidden');
    xhr.open('GET', requestURL);
    xhr.onload = function() {
        const users = JSON.parse(xhr.response);
        const userBlock = document.createElement('div');
        loader.setAttribute('hidden', '');
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
            <div class="fetch-container__block__data" id="data-${user.id}">

                <span class="data-text" id="user-${user.id}">${user.name}</span>
                <div class="fetch__buttons">
                    <button class="edit" id="${user.id}">Edit</button>
                    <button class="delete" id="delete-${user.id}">Delete</button>
                </div>

                <div class="form" id="form-${user.id}">
                    <input type="text" class="input" id="input-${user.id}">
                    <button class="save" id="save-${user.id}">Save</button>
                </div>

            </div>   
            `
            userBlock.appendChild(userBlockData);
            deleteUser(user, userBlockData);
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
   loader.removeAttribute('hidden');
   fetch(requestURL)
   .then(data => {
        return data.text(); 
   })
   
    .then(data => {
        const users = JSON.parse(data);
        const userBlock = document.createElement('div');
        loader.setAttribute('hidden', '');
        userBlock.classList.add('fetch-container__block');
        fetchCont.appendChild(userBlock);
        users.forEach(user => {
            addUser(user, userBlock, true);
            editUser(user);
        })
       
    })

    // try {
    //     const response = await fetch(requestURL, {
    //         method: 'POST',
    //         body
    //     });

    // }
   
})

function editUser (user, userBlock) {
    const editBtn = document.getElementById(user.id);
    const form = document.getElementById(`form-${user.id}`);
    const saveBtn = document.getElementById(`save-${user.id}`);
    const inputBtn = document.getElementById(`input-${user.id}`);

    editBtn.addEventListener('click', () => {
        loader.removeAttribute('hidden');
        form.classList.remove('hidden');
        const loading = setInterval (() => {
            form.classList.add('form__active');
            loader.setAttribute('hidden', '');
        }, 500);
        return loading;
    })

    

    saveBtn.addEventListener('click', () => {
        let newUser = inputBtn.value;
        if(newUser.length <= 0) {
            alert('Empty user name')
        } else {
            form.classList.add('hidden');
            const newUserData = document.getElementById(`user-${user.id}`);
            user.name = newUser;
            newUserData.innerHTML = user.name;
            inputBtn.value = "";
            fetch(requestURL, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                body:JSON.stringify(user.name)
            })
            .then(response => {
                return response.json();
            })
        }
        
    })

}

function deleteUser (user, userBlockData) {
    const deleteBtn = document.getElementById(`delete-${user.id}`);
    deleteBtn.addEventListener('click', () => {
        loader.removeAttribute('hidden');
        const loading = setInterval (() => {
            userBlockData.classList.add('hidden');
            loader.setAttribute('hidden', '');
        }, 500);
        alert('Deleted!')
        return loading;
    })
}
