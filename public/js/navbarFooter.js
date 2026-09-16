const initHeader = document.getElementById('init-header')
const initFooter = document.getElementById('init-footer')

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

// init footer from div id=init-footer element 
initFooter.innerHTML = `
  <footer class="mt-5 py-5">
    <div class="container d-flex justify-content-between align-items-center">
      <p class="mb-0"><span class="fw-bold">&copy; 2026 The Library.</span> An API project done by students at Medieinstitutet.</p>
      <ul class="navbar-nav d-flex flex-row">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="books.html">Home</a>
        </li>
        <li class="nav-item ms-3">
          <a class="nav-link" href="login.html">Log in</a>
        </li>
        <li class="nav-item ms-3 hidden">
          <a class="nav-link" href="admin-books.html">Admin</a>
        </li>
      </ul>
    </div>
  </footer>
`;