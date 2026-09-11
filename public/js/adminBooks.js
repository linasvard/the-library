const adminBookList = document.getElementById("admin-book-list");
const createBookForm = document.getElementById("create-book-form");

async function getAdminBooks() {
    try {
        const response = await fetch(API_URL + "/books/admin", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        });

        if (response.status === 401) {
            window.location.href = "index.html?error=unauthorized"; // tar dig till inlog om du är unauthorized
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

        fetchAdminBooks();
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

loadAdminBooks();
