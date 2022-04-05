let root;

const parseJSON = async (url) => {
    const response = await fetch(url);
    return response.json();
};

const userComponent = ({name, surname}) => { // object destructuring
    return `
        <div>
            <h1>${name}</h1>
            <h2>${surname}</h2>
        </div>
    `;
};

const addUserComponent = () => {
    return `
        <div>
            <input type= "text" name="first-name" class="first-name" placeHolder="First name">
            <input type= "text" name="surname" class="surname" placeHolder="Surname">
            <button id=submit-btn>Send</button>
        </div>
    `;
};

const submitClicked =  (event) => {
    // event.preventDefault();

    // dataToSend.append('cart', JSON.stringify(validCart));

    const firstname = document.querySelector(".first-name");
    const surname = document.querySelector(".surname");

    // const dataToSend = new FormData(form);
    // dataToSend.append('firstName', firstname.value);
    // dataToSend.append('surname', surname.value);

    // const userFormData = new FormData({
    //     'firstName': firstname.value,
    //     'surname': surname.value
    // });

    // console.log(userFormData.getValue('firstName'));
    // console.log(userFormData.getValue('surname'));

    const userData = {
        'firstName': firstname.value,
        'surname': surname.value
    };
    console.log(userData);

    const fethSettings = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(userData)
    }

    fetch('/users/new', fethSettings).then(data => {
        if (data.status === 200){
            messageRenderer('User has been added!');
        }
    }).then(async (data) => {
        const user = await data.json();
        root.insertAdjacentHTML(userComponent(user));

    }).catch(error => {
        console.log(error);
    });

    return response.json();
};

async function  init (event) {
    root = document.getElementById("root");
    if(window.location.pathname === "/admin/order-view"){ //  inspect whera re we string kezelő metódusokkal lehet megnézni, hogy az admin benne van-e a path-ban
        console.log("We are on the admin page.");
    } else {
        console.log("We are on the customer/ buyer page.");
    }

    const result = await parseJSON(`/api/v1/users`);

    root.insertAdjacentHTML(
        `beforeend`, 
        result.map(user => userComponent(user)).join("")
    );

    root.insertAdjacentHTML(
        `afterend`, 
        addUserComponent()
    );

    const submitBtn = document.getElementById("submit-btn");
    submitBtn.addEventListener('click', submitClicked);

}

window.addEventListener(`load`, init);