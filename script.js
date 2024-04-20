async function fetchPosts() {
    const response = await fetch('https://gorest.co.in/public/v2/posts');
    const posts = await response.json();
    displayPosts(posts);
}

async function createPost() {
    const title = document.getElementById('createTitle').value;
    const body = document.getElementById('createBody').value;
    const response = await fetch('https://gorest.co.in/public/v2/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': '0d713e852e41be16379b8e611219abd3c11dcda218ed21f4124f4d01c0f1d5f6' // You need an access token here
        },
        body: JSON.stringify({ title, body, user_id: 1 }) // Assuming a static user_id for example
    });
    if(response.ok) {
        fetchPosts(); // Reload the list after adding
    }
}

function displayPosts(posts) {
    const postList = document.getElementById('postList');
    postList.innerHTML = '';  // Clear existing posts
    posts.forEach(post => {
        const div = document.createElement('div');
        div.className = 'post';
        div.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <button onclick="deletePost(${post.id})">Delete</button>
            <button onclick="setupUpdate(${post.id}, '${post.title}', '${post.body}')">Update</button>
        `;
        postList.appendChild(div);
    });
}

async function deletePost(postId) {
    const response = await fetch(`https://gorest.co.in/public/v2/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': '0d713e852e41be16379b8e611219abd3c11dcda218ed21f4124f4d01c0f1d5f6' // Same token as above
        }
    });
    if(response.ok) {
        fetchPosts(); // Reload the list after deleting
    }
}

function setupUpdate(id, title, body) {
    document.getElementById('createTitle').value = title;
    document.getElementById('createBody').value = body;
    const button = document.getElementById('createPost').getElementsByTagName('button')[0];
    button.onclick = function() { updatePost(id); };
    button.textContent = 'Update Post';
}

async function updatePost(id) {
    const title = document.getElementById('createTitle').value;
    const body = document.getElementById('createBody').value;
    const response = await fetch(`https://gorest.co.in/public/v2/posts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': '0d713e852e41be16379b8e611219abd3c11dcda218ed21f4124f4d01c0f1d5f6'
        },
        body: JSON.stringify({ title, body })
    });
    if(response.ok) {
        fetchPosts();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    fetchPosts();
});
