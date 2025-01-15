document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Log to verify data is being captured
    console.log("Username:", username, "Password:", password);

    fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usernameOrEmail: username, password })  // Change 'username' to 'usernameOrEmail'
    })
    .then(response => response.json())
    .then(data => {
        const messageElement = document.getElementById('message');
        if (data.success) {
            messageElement.innerText = "✅ Login recorded!";
            messageElement.style.color = "green";
        } else {
            messageElement.innerText = "❌ Login failed!";
            messageElement.style.color = "red";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred.');
    });
});
