const initHeader = document.getElementById('init-header')
const initFooter = document.getElementById('init-footer')

initHeader.innerHTML = `
  <nav class="navbar navbar-expand-lg">
    <div class="container d-flex justify-content-between align-items-center">
      <a class="navbar-brand" href="books.html">the library.</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse flex-grow-0" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="index.html" id="login-link">Log in</a>
          </li>
          <li class="nav-item" id="admin-link-item">
            <a class="nav-link" href="admin-books.html">Admin</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
`;

initFooter.innerHTML = `
  <footer class="mt-5 py-5">
    <div class="container d-flex justify-content-between align-items-center">
      <p class="mb-0"><span class="fw-bold">&copy; 2026 The Library.</span> An API project done by students at Medieinstitutet.</p>
      <ul class="navbar-nav d-flex flex-row">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="books.html">Home</a>
        </li>
        <li class="nav-item ms-3">
          <a class="nav-link" href="index.html" id="login-link-footer">Log in</a>
        </li>
        <li class="nav-item ms-3" id="admin-link-item-footer">
          <a class="nav-link" href="admin-books.html">Admin</a>
        </li>
      </ul>
    </div>
  </footer>
`;

async function checkLoginStatus() {
    try {
        const response = await fetch(API_URL + "/users", {
            method: "GET",
            credentials: "include"
        });

        return response.ok;
    } catch (error) {
        console.error("Error checking login status:", error);
        return false;
    }
}

async function logout() {
    try {
        const response = await fetch(API_URL + "/auth/logout", {
            method: "POST",
            credentials: "include"
        });

        if (response.ok) {
            window.location.href = "books.html";
        }
    } catch (error) {
        console.error("Error logging out:", error);
    }
}

function handleAuthLinkClick(event, isLoggedIn) {
    if (isLoggedIn) {
        event.preventDefault();
        logout();
    }
}

async function updateNavForAuthStatus() {
    const isLoggedIn = await checkLoginStatus();

    const adminLinkItem = document.getElementById("admin-link-item");
    const adminLinkItemFooter = document.getElementById("admin-link-item-footer");
    const loginLink = document.getElementById("login-link");
    const loginLinkFooter = document.getElementById("login-link-footer");

    if (isLoggedIn) {
        adminLinkItem.classList.remove("hidden");
        adminLinkItemFooter.classList.remove("hidden");

        loginLink.textContent = "Log out";
        loginLinkFooter.textContent = "Log out";
    } else {
        adminLinkItem.classList.add("hidden");
        adminLinkItemFooter.classList.add("hidden");

        loginLink.textContent = "Log in";
        loginLinkFooter.textContent = "Log in";
    }

    loginLink.addEventListener("click", (event) => handleAuthLinkClick(event, isLoggedIn));
    loginLinkFooter.addEventListener("click", (event) => handleAuthLinkClick(event, isLoggedIn));
}

updateNavForAuthStatus();