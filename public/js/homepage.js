const viewPost = async (event) => {
    postId = event.target.getAttribute("data-post");
    document.location.replace('/posts/' + postId);
};

document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener('click', viewPost);
});