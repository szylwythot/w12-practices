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

async function  init (event) {
    const result = await parseJSON(`/api/v1/users`);
    const root = document.getElementById("root");

    root.insertAdjacentHTML(
        `beforeend`, 
        result.map(user => userComponent(user)).join("")
    );

}

window.addEventListener(`load`, init);