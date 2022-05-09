//references to input boxes
const titleEl = document.querySelector("#title");
const contentEl = document.querySelector("#content");

//references to button
const updateButton = document.querySelector("#update-button");
const deleteButton = document.querySelector("#delete-button");

const updatePostFunction = async (event) => {
    const title = titleEl.value;
    const content = contentEl.value;
    
    if(title && content) {
        const response = await fetch(window.location.pathname, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        //if we were able to update the post go to dashboard, if not tell the user
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to add post');
        }
    }
};

const deletePostFunction = async (event) => {
    const response = await fetch(window.location.pathname, {
        method: 'DELETE',
    });

    //if we were able to delete the post go to dashboard, if not tell the user
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to delete post');
    }
};

updateButton.addEventListener('click', updatePostFunction);
deleteButton.addEventListener('click', deletePostFunction);