const reviewForm = document.getElementById("review-form");

reviewForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("review-name").value;
    const content = document.getElementById("review-content").value;
    const rating = document.getElementById("review-rating").value;

    try {
        const response = await fetch(API_URL + "/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                content: content,
                rating: Number(rating),
                book_id: bookId
            })
        });

        const data = await response.json();

        if (response.ok) {
            reviewForm.reset();
            fetchBook();
        } else {
            console.error("Error creating review:", data.error);
        }
    } catch (error) {
        console.error("Error submitting review:", error);
    }
});