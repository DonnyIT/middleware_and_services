document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById('searchUserForm');

    if (searchForm) {
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const userId = document.getElementById('userId').value;
            searchUserById(userId);
        });
    }

    function searchUserById(userId) {
        fetch(`https://localhost:7213/api/home/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('User not found');
                }
                return response.json();
            })
            .then(user => {
                const tbody = document.getElementById('users_tbody_id');
                tbody.innerHTML = '';
                tbody.innerHTML += `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.firstName}</td>
                        <td>${user.lastName}</td>
                        <td>${user.email}</td>
                    </tr>
                `;
            })
            .catch(err => {
                console.error('Error fetching user by ID:', err);
                const searchResult = document.getElementById('searchResult');
                searchResult.innerHTML = '<div class="alert alert-danger">User not found</div>';
            });
    }
});