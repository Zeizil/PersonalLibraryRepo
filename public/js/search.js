// Get the search button and form input
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-query');

// Add event listener to search button
searchButton.addEventListener('click', async function () {
  // Get the search query
  const query = searchInput.value;
  // Make a GET request to the OpenLibrary API
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${query}`
  );
  // Parse the response as JSON
  const data = await response.json();
  // Get the results div
  const resultsDiv = document.getElementById('results');
  // Clear the previous search results
  resultsDiv.innerHTML = '';
  // Loop through the results and create an HTML string
  const books = data.docs;
  let htmlString = '';
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    let bookCover = '';
    if (book.cover_i) {
      bookCover = `<img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" alt="Book cover">`;
    } else {
      bookCover = `<img src="https://via.placeholder.com/150" alt="No cover available">`;
    }
    //  htmlString += `
    //      <div>
    //        ${bookCover}
    //          <h2>${book.title}</h2>
    //          <p>Author: ${book.author_name}</p>
    //          <p>Published: ${book.first_publish_year}</p>
    //      </div>
    //  `;
  }
  // Insert the HTML string into the results div
  resultsDiv.innerHTML = htmlString;
});
