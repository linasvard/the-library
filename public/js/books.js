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

        const col = document.createElement("div");
        col.className = "col-md-2 mb-3";

        const link = document.createElement("a");
        link.href = `book.html?id=${book._id}`;
        link.className = "text-decoration-none text-dark";

        const bookElement = document.createElement("div");
        bookElement.className = "card h-100 border-0";

        const img = document.createElement("img");
        img.src = book.image || "https://store.bookbaby.com/Bookshop/images/OnePageBookCoverImage.jpg?BookID=BK90049649"; // placeholder image if book.image is null
        img.alt = book.title;
        img.width = 200;
        img.className = "card-img-top";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body p-0 pt-2";


        const genreBadges = document.createElement("p");
        book.genres.forEach(genre => {
            const badge = document.createElement("span");
            badge.className = "badge bg-secondary me-1";
            badge.textContent = genre;
            genreBadges.appendChild(badge);
        });

        const title = document.createElement("h5");
        title.textContent = book.title;

        const publishedYear = document.createElement("h6");
        publishedYear.textContent = book.published_year;

        const author = document.createElement("p");
        author.textContent = book.author;

        cardBody.append(title, publishedYear, author, genreBadges);
        bookElement.append(img, cardBody);
        
        link.appendChild(bookElement);
        col.appendChild(link);
        bookList.appendChild(col);
       
    });
}


async function initBooks() {
    const books = await getBooks();
    if (books) {
        renderBooks(books);
    }
}


initBooks();