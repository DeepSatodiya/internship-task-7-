const userContainer = document.getElementById("user-container");
const reloadBtn = document.getElementById("reload-btn");

async function fetchUsers() {
  userContainer.innerHTML = "<p>⏳ Loading users...</p>";
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    
    // If response is not OK, throw an error
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const users = await response.json();

    // Clear container
    userContainer.innerHTML = "";

    users.forEach(user => {
      const userCard = document.createElement("div");
      userCard.classList.add("user-card");

      userCard.innerHTML = `
        <h2>${user.name}</h2>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
      `;

      userContainer.appendChild(userCard);
    });
  } catch (error) {
    userContainer.innerHTML = `<p style="color:red;">⚠️ Failed to fetch data: ${error.message}</p>`;
  }
}

// Reload button click event
reloadBtn.addEventListener("click", fetchUsers);

// Fetch users on page load
fetchUsers();
