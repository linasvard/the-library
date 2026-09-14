const adminBookList = document.getElementById("admin-book-list");
const createBookForm = document.getElementById("create-book-form");
const genreDropdownMenu = document.getElementById("genre-dropdown-menu");
const genreDropdownBtn = document.getElementById("genre-dropdown-btn");

async function getAdminBooks() {
    try {
        const response = await fetch(API_URL + "/books/admin", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        });

        if (response.status === 401 || response.status === 403) {
            window.location.href = "index.html?error=unauthorized";
            return;
        }

        const books = await response.json();
        if (response.ok) {
            return books;
        } else {
            adminBookList.innerHTML = `<p>Error: ${books.error}</p>`;
        }
    } catch (error) {
        console.error("Error fetching admin books:", error);
        adminBookList.innerHTML = `<p>Error fetching admin books. Please try again later.</p>`;
    }
}

function renderAdminBooks(books) {
    adminBookList.innerHTML = books.map(book => `
         <tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.genres.join(", ")}</td>
            <td>${book.created_at ? formateDate(book.created_at) : "-"}</td>
            <td>${book.published_year}</td>
            <td>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteBook('${book._id}')">Delete</button>
            </td>
        </tr>
    `).join("");
}

async function deleteBook(bookId) {
    try {
        await fetch(API_URL + `/books/${bookId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        });

        loadAdminBooks();
    } catch (error) {
        console.error("Error deleting book:", error);
    }
}

async function loadAdminBooks() {
    const books = await getAdminBooks();
    if (books) {
        renderAdminBooks(books);
    }
}

// --- Läs in genres till dropdown ---

async function loadGenreOptions() {
    try {
        const response = await fetch(API_URL + "/genres");
        const availableGenres = await response.json();

        genreDropdownMenu.innerHTML = availableGenres.map((genre, index) => `
            <li>
                <div class="form-check">
                    <input class="form-check-input genre-checkbox" type="checkbox" value="${genre}" id="genre-${index}">
                    <label class="form-check-label" for="genre-${index}">${genre}</label>
                </div>
            </li>
        `).join("");
    } catch (error) {
        console.error("Error loading genres:", error);
    }
}

function getSelectedGenres() {
    return Array.from(document.querySelectorAll('.genre-checkbox:checked')).map(checkbox => checkbox.value);
}

genreDropdownMenu.addEventListener("change", () => {
    const selected = getSelectedGenres();
    genreDropdownBtn.textContent = selected.length > 0
        ? `${selected.length} genre${selected.length > 1 ? 's' : ''} selected`
        : "Select genres";
});

// --- Skapa bok ---

createBookForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("book-title").value.trim();
    const description = document.getElementById("book-description").value.trim();
    const author = document.getElementById("book-author").value.trim();
    const image = document.getElementById("book-image").value.trim();
    const published_year = parseInt(document.getElementById("book-published-year").value.trim());
    const genres = getSelectedGenres();

    if (genres.length === 0) {
        document.getElementById("create-message").className = "alert alert-danger";
        document.getElementById("create-message").innerHTML = "Please select at least one genre.";
        return;
    }

    try {
        const response = await fetch(API_URL + "/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                title,
                description,
                author,
                image,
                published_year,
                genres
            })
        });

        const data = await response.json();
        if (response.ok) {
            createBookForm.reset();
            document.querySelectorAll(".genre-checkbox").forEach(cb => cb.checked = false);
            genreDropdownBtn.textContent = "Select genres";
            document.getElementById("create-message").className = "alert alert-success";
            document.getElementById("create-message").innerHTML = "Book created successfully!";
            loadAdminBooks();
        } else {
            document.getElementById("create-message").className = "alert alert-danger";
            document.getElementById("create-message").innerHTML = `Error: ${data.error || "An error occurred while creating the book."}`;
        }
    } catch (error) {
        console.error("Error creating book:", error);
        document.getElementById("create-message").className = "alert alert-danger";
        document.getElementById("create-message").innerHTML = "An error occurred while creating the book. Please try again later.";
    }
});

loadAdminBooks();
loadGenreOptions();