document.getElementById('createUserForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const newUser = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value
    };

    fetch('https://localhost:7213/api/home', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
        .then(response => response.json())
        .then(data => {
            alert('User added successfully!');
            document.getElementById('createUserForm').reset();
        })
        .catch(err => {
            console.error('Error adding user:', err);
        });
});
