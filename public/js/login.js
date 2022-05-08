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
    //get values for email and password that we will query the database with
    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();

    //check to make sure email and password were filled in
    if(email && password) {
        //if they were then make a request to the server to login with email and password values
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
          });

        //if we were able to log in then go to homepage, if not tell user
        if (response.ok) {
        document.location.replace('/');
        } else {
        alert('Failed to log in');
        }
    }
};

const createUserFunction = async (event) => {
    event.preventDefault();

    //get values for username, password, and email in order to create a user
    const username = createUsername.value.trim();
    const email = createEmail.value.trim();
    const password = createPassword.value.trim();

    //check to see that all fields were filled out
    if(username && email && password) {
        //make sure the password is at least 8 characters long
        if(password.length < 8) {
            alert('Password length must be at least 8 characters')
        } 
        else {
            //make our request to the server to create a new user
            const response = await fetch('/api/users', {
                method: 'POST',
                body: JSON.stringify({ username, email, password }),
                headers: { 'Content-Type': 'application/json' },
            });
          
            //if we were able to make a new user then we are logged in as that user so go back to hompage,
            //if we weren't able to create the user then tell them
            if (response.ok) {
            document.location.replace('/');
            } else {
            alert('Failed to sign up.');
            }
        }
    }
};

loginButton.addEventListener('click', loginFunction);
createButton.addEventListener('click', createUserFunction);