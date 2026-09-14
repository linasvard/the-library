const bookTitle = document.getElementById("book-title");
const bookDetail = document.getElementById("book-detail");

const params = new URLSearchParams(window.location.search);
const bookId = params.get("id");

async function fetchBook() {
    try {
        const response = await fetch(API_URL + `/books/${bookId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await response.json();
        if (response.ok) {
            renderBook(data.book);
        } else {
            bookDetail.innerHTML = "";
            const errorMessage = document.createElement("p");
            errorMessage.textContent = "Error loading book. Please try again later.";
            bookDetail.appendChild(errorMessage);
        }
    } catch (error) {
        console.error("Error fetching book:", error);
        bookDetail.innerHTML = "";
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Error loading book. Please try again later.";
        bookDetail.appendChild(errorMessage);
    }
}

function renderBook(book) {
    document.title = book.title;
    bookDetail.innerHTML = "";

    // Vänster kolumn med bild
    const imgCol = document.createElement("div");
    imgCol.className = "col-md-4";

    const img = document.createElement("img");
    img.src = book.image || "https://store.bookbaby.com/Bookshop/images/OnePageBookCoverImage.jpg?BookID=BK90049649";
    img.alt = book.title;
    img.width = 365;
    img.className = "img-fluid mb-3 rounded shadow-sm";

    imgCol.appendChild(img);


    // Höger kolumn med information
    const infoCol = document.createElement("div");
    infoCol.className = "book-info-col col-md-8";

    const title = document.createElement("h1");
    title.className = "fw-bold";
    title.textContent = book.title;

    const author = document.createElement("h5");
    author.className = "text-muted mb-4";
    author.textContent = book.author;

    const description = document.createElement("p");
    description.className = "fs-6";
    description.textContent = book.description;

    const genresParagraph = document.createElement("p");
    genresParagraph.className = "mt-4";
    book.genres.forEach(genre => {
        const badge = document.createElement("span");
        badge.className = "badge bg-secondary me-1";
        badge.textContent = genre;
        genresParagraph.appendChild(badge);
    });

    const publishedYear = document.createElement("p");
    publishedYear.className = "text-muted mb-4";
    publishedYear.textContent = `Published: ${book.published_year}`;


    infoCol.append(title, author, description, genresParagraph, publishedYear);

    bookDetail.append(imgCol, infoCol);
}

fetchBook();