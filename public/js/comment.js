//reference to text area
const commentEl = document.querySelector("#comment");

//references to button
const submitButton = document.querySelector("#submit-button");

const createComment = async (event) => {
    try {
        const comment = commentEl.value;
    
        if(comment) {
            const response = await fetch(window.location.pathname, {
                method: 'POST',
                body: JSON.stringify({ comment }),
                headers: { 'Content-Type': 'application/json' },
            });
    
            //if we were able to update the post reload page, if not tell the user
            if (response.ok) {
                location.reload();
            } else {
                alert('Failed to add comment');
            }
        }
    } catch (err) {
        console.log(err);
    }
};

submitButton.addEventListener('click', createComment);