const loginbox = document.getElementById("login-box");
const registerbox = document.getElementById("register-box");
const toggleAuthViewLink = document.getElementById("toggle-auth-view");

function toggleViews(isRegistration = false) {
    loginbox.classList.toggle("d-none");
    registerbox.classList.toggle("d-none");
    toggleAuthViewLink.textContent = loginbox.classList.contains("d-none")
        ? "Already have an account? Log in here!"
        : "Don't have an account? Register here!";

        if (document.getElementById("login-username")) document.getElementById("login-form").reset();
        if (document.getElementById("register-username")) document.getElementById("register-form").reset();

        document.getElementById("register-message").textContent = "";
        document.getElementById("register-message").className = "";

        if (!isRegistration) {
            document.getElementById("login-message").textContent = "";
            document.getElementById("login-message").className = "";
        }
}

toggleAuthViewLink.addEventListener("click", (e) => {
  e.preventDefault();
  toggleViews(false);
});

// LOGIN
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  const messageDiv = document.getElementById("login-message");

  try {
    const response = await fetch(API_URL + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

    if (response.ok) {
        window.location.href = "index.html";

    } else {
        const errorData = await response.json();
        messageDiv.textContent = errorData.message || "Wrong username or password.";
        messageDiv.className = "text-danger";
    }

  } catch (error) {
    messageDiv.textContent = "Could not connect to the server.";
    messageDiv.className = "text-danger";
  }
});

// REGISTER
document.getElementById("register-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;
  const messageDiv = document.getElementById("register-message");

  try {
    const response = await fetch(API_URL + "/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

    if (response.ok) {
        const loginMessageDiv = document.getElementById("login-message");
        loginMessageDiv.textContent = "Registration successful! Please log in.";
        loginMessageDiv.className = "text-success";

        toggleViews(true);

    } else {
        const errorData = await response.json();
        messageDiv.textContent = errorData.message || "Registration failed.";
        messageDiv.className = "text-danger";
    }

  } catch (error) {
    messageDiv.textContent = "Could not connect to the server.";
    messageDiv.className = "text-danger";
  }
});