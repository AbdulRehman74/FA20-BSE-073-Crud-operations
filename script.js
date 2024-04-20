async function fetchPosts() {
    const response = await fetch('https://gorest.co.in/public/v2/posts');
    const posts = await response.json();
    displayPosts(posts);
}

async function fetchPost() {
    const postId = document.getElementById('fetchPostId').value;
    const response = await fetch(`https://gorest.co.in/public/v2/posts/${postId}`);
    if (!response.ok) {
        console.error('Failed to fetch post');
        return;
    }
    const post = await response.json();
    displayPosts([post]);  // Display this single post
}

async function createPost() {
    const userId = document.getElementById('userId').value;
    const title = document.getElementById('createTitle').value;
    const body = document.getElementById('createBody').value;
    const response = await fetch('https://gorest.co.in/public/v2/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
        },
        body: JSON.stringify({ user_id: userId, title, body })
    });
    if (response.ok) {
        fetchPosts(); // Reload the list after adding
    }
}

function displayPosts(posts) {
    const postList = document.getElementById('postList');
    postList.innerHTML = '';
    posts.forEach(post => {
        const div = document.createElement('div');
        div.className = 'post';
        div.innerHTML = `
            <h3>${post.title} (ID: ${post.id})</h3>
            <p>${post.body}</p>
            <button onclick="deletePost(${post.id})">Delete</button>
            <button onclick="setupUpdate(${post.id}, '${post.title}', '${post.body}', ${post.user_id})">Update</button>
        `;
        postList.appendChild(div);
    });
}

function setupUpdate(id, title, body, userId) {
    document.getElementById('userId').value = userId;
    document.getElementById('createTitle').value = title;
    document.getElementById('createBody').value = body;
    const button = document.getElementById('createPost').getElementsByTagName('button')[0];
    button.onclick = function() { updatePost(id); };
    button.textContent = 'Update Post';
}

async function updatePost(id) {
    const userId = document.getElementById('userId').value;
    const title = document.getElementById('createTitle').value;
    const body = document.getElementById('createBody').value;
    const response = await fetch(`https://gorest.co.in/public/v2/posts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
        },
        body: JSON.stringify({ user_id: userId, title, body })
    });
    if (response.ok) {
        fetchPosts();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    fetchPosts();
});
