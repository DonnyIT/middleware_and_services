function getUsers() {
    fetch('https://localhost:7213/api/home')
        .then(response => response.json())
        .then(users => {
            const tbody = document.getElementById('users_tbody_id');
            tbody.innerHTML = ''; // Очищаємо поточну таблицю

            users.forEach(user => {
                tbody.innerHTML += `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.firstName}</td>
                        <td>${user.lastName}</td>
                        <td>${user.email}</td>
                        <td>
                            <button class="btn btn-primary btn-sm" onclick="redirectToEditUser(${user.id})">Edit</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Delete</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(err => {
            console.error('Error fetching users:', err);
        });
}

// Функція для редагування користувача — перенаправляє на сторінку редагування
function redirectToEditUser(userId) {
    window.location.href = `edit.html?userId=${userId}`;
}

// Функція для видалення користувача
function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        fetch(`https://localhost:7213/api/home/${userId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    alert('User deleted successfully');
                    getUsers(); // Оновлюємо список після видалення
                } else {
                    alert('Failed to delete user');
                }
            })
            .catch(err => {
                console.error('Error deleting user:', err);
            });
    }
}

// Викликаємо getUsers при завантаженні сторінки
document.addEventListener('DOMContentLoaded', function () {
    getUsers();
});