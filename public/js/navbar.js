const initHeader = document.getElementById('init-header');

// init navbar from div id=init-header element
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
            <a class="nav-link active" aria-current="page" href="books.html">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="login.html">Log in</a>
          </li>
          <li class="nav-item hidden">
            <a class="nav-link" href="admin-books.html">Admin</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
`;