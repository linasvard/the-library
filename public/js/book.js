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
    bookTitle.textContent = book.title;
    bookDetail.innerHTML = "";

    const imgCol = document.createElement("div");
    imgCol.className = "col-md-4";

    const img = document.createElement("img");
    img.src = book.image || "https://store.bookbaby.com/Bookshop/images/OnePageBookCoverImage.jpg?BookID=BK90049649";
    img.alt = book.title;
    img.className = "img-fluid";

    imgCol.appendChild(img);

    const infoCol = document.createElement("div");
    infoCol.className = "col-md-8";

    const author = document.createElement("p");
    const authorStrong = document.createElement("strong");
    authorStrong.textContent = "Author: ";
    author.appendChild(authorStrong);
    author.append(book.author);

    const publishedYear = document.createElement("p");
    const publishedYearStrong = document.createElement("strong");
    publishedYearStrong.textContent = "Published: ";
    publishedYear.appendChild(publishedYearStrong);
    publishedYear.append(String(book.published_year));

    const genresParagraph = document.createElement("p");
    book.genres.forEach(genre => {
        const badge = document.createElement("span");
        badge.className = "badge bg-secondary me-1";
        badge.textContent = genre;
        genresParagraph.appendChild(badge);
    });

    const description = document.createElement("p");
    description.className = "mt-3";
    description.textContent = book.description;

    infoCol.append(author, publishedYear, genresParagraph, description);

    bookDetail.append(imgCol, infoCol);
}

fetchBook();