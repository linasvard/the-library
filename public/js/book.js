const bookTitle = document.getElementById("book-title");
const bookDetail = document.getElementById("book-detail");
const reviewList = document.getElementById("review-list");

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
            renderReviews(data.reviews);
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
    imgCol.className = "col-md-6 d-flex justify-content-space-between align-items-start";

    const img = document.createElement("img");
    img.src = book.image || "https://store.bookbaby.com/Bookshop/images/OnePageBookCoverImage.jpg?BookID=BK90049649";
    img.alt = book.title;
    img.width = 365;
    img.className = "img-fluid mb-3 rounded shadow-sm";

    imgCol.appendChild(img);


    // Höger kolumn med information
    const infoCol = document.createElement("div");
    infoCol.className = "book-info-col col-md-6";

    const title = document.createElement("h1");
    title.className = "fw-bold book-heading";
    title.textContent = book.title;
    title.style.color = "var(--secondary-color)";

    const author = document.createElement("h5");
    author.className = "text-secondary mb-4";
    author.textContent = book.author;

    const description = document.createElement("p");
    description.className = "fs-6";
    description.textContent = book.description;

    const genresParagraph = document.createElement("p");
    genresParagraph.className = "mt-4";
    book.genres.forEach(genre => {
        const badge = document.createElement("span");
        badge.className = "badge me-1";
        badge.textContent = genre;
        genresParagraph.appendChild(badge);
    });

    const backButton = document.createElement("a");
    backButton.href = "index.html";
    backButton.className = "btn mt-5 back-btn";
    backButton.textContent = "← Back to books";

    infoCol.appendChild(backButton);

    const publishedYear = document.createElement("p");
    publishedYear.className = "text-secondary mb-4";
    publishedYear.textContent = `Published: ${book.published_year}`;


    infoCol.append(title, author, description, genresParagraph, publishedYear, backButton);

    bookDetail.append(imgCol, infoCol);
}

function renderReviews(reviews) {
    reviewList.innerHTML = "";

    if (reviews.length === 0) {
        const noReviewsMessage = document.createElement("p");
        noReviewsMessage.textContent = "No reviews yet.";
        reviewList.appendChild(noReviewsMessage);
        return;
    }

    reviews.forEach(review => {
        const reviewCard = document.createElement("div");
        reviewCard.className = "border-bottom pb-4 mb-3";

        const name = document.createElement("h6");
        name.className = "mb-1";
        name.textContent = review.name;

        const rating = document.createElement("span");
        rating.className = "badge bg-primary mb-2";
        rating.textContent = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);
        rating.ariaLabel = `Rating: ${review.rating} out of 5`;

        const content = document.createElement("p");
        content.className = "mb-1";
        content.textContent = review.content;

        const createdAt = document.createElement("small");
        createdAt.className = "text-secondary";
        createdAt.textContent = `Posted: ${formateDate(review.created_at)}`;

        reviewCard.append(name, rating, content, createdAt);
        reviewList.appendChild(reviewCard);
    })
}
fetchBook();