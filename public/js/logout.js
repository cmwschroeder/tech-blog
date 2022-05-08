const logoutButton = document.querySelector("#logout-button");

const logout = async () => {
    //make a fetch request to the server to logout
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    
    //if the server told us that we successfully logged out then we can go back to the login page
    //or tell the browser that we weren't able to log them out
    if (response.ok) {
        document.location.replace('/login');
    } else {
        alert(response.statusText);
    }
};

logoutButton.addEventListener('click', logout);