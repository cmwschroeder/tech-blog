//references to input boxes
const loginEmail = document.querySelector("#login-email");
const loginPassword = document.querySelector("#login-password");
const createUsername = document.querySelector("#create-username");
const createEmail = document.querySelector("#create-email");
const createPassword = document.querySelector("#create-password");

//references to buttons
const loginButton = document.querySelector("#login-button");
const createButton = document.querySelector("#create-button");

const loginFunction = async (event) => {
    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();

    if(email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
          });

        if (response.ok) {
        document.location.replace('/');
        } else {
        alert('Failed to log in');
        }
    }
}

loginButton.addEventListener('click', loginFunction);