async function getBooks() {
    try {
        const response = await fetch(API_URL + "/books", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            document.getElementById("book-list").innerHTML = 
            `<p>Error: ${data.error}</p>`;
        }
    } catch (error) {
        console.error("Error fetching books:", error);
        document.getElementById("book-list").innerHTML = 
        `<p>Error fetching books. Please try again later.</p>`;
    }   
}

function renderBooks(books) {
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = "";
    
    books.forEach(book => {
        const bookElement = document.createElement("div");

        const genreBadges = book.genres
            .map(genre => `<span class="badge bg-secondary me-1">${genre}</span>`)
            .join("");
        
        bookElement.innerHTML = `
            <img src="${book.image}" alt="${book.title}" width="200">
            <p>${genreBadges}</p>
            <h3>${book.title}</h3>
            <p>${book.author}</p>
        `;
        bookList.appendChild(bookElement);
    });
}

async function initBooks() {
    const books = await getBooks();
    if (books) {
        renderBooks(books);
    }
}

initBooks();