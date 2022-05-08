//references to input boxes
const titleEl = document.querySelector("#title");
const contentEl = document.querySelector("#content");

//references to button
const createButton = document.querySelector("#create-button");

const createPostFunction = async (event) => {
    const title = titleEl.value;
    const content = contentEl.value;
    
    if(title && content) {
        const response = await fetch('/dashboard/create', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        //if we were able to create the post go to dashboard, if not tell the user
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to add post');
        }
    }
};

createButton.addEventListener('click', createPostFunction);