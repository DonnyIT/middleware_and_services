document.addEventListener("DOMContentLoaded", function () {
    const editUserForm = document.getElementById('editUserForm');

    // Завантаження даних користувача при завантаженні сторінки
    const userId = getUserIdFromURL();
    if (userId) {
        fetch(`https://localhost:7213/api/home/${userId}`)
            .then(response => response.json())
            .then(user => {
                document.getElementById('firstName').value = user.firstName;
                document.getElementById('lastName').value = user.lastName;
                document.getElementById('email').value = user.email;
            })
            .catch(err => console.error('Error fetching user data:', err));
    }

    // Додаємо обробник події на форму
    if (editUserForm) {
        editUserForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const user = {
                id: userId, // Використовуємо ID користувача з URL
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value
            };
            updateUser(user);
        });
    }

    // Функція для оновлення користувача
    function updateUser(user) {
        const url = `https://localhost:7213/api/home/${user.id}`;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Response from server:', data);
                if (data) {
                    alert('User updated successfully!');
                    window.location.href = 'users.html';
                } else {
                    alert('Error updating user');
                }
            })
            .catch(err => console.error('Error updating user:', err));
    }

    // Функція для отримання ID користувача з URL
    function getUserIdFromURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get('userId');
    }
});