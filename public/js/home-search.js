 const searchForm = document.getElementById('book-search');

 // sends results of the search to the back end for rendering
 const sendSearch = async (resultsArr) => {
   const response = await fetch(`/`, {
     method: 'POST',
     body: JSON.stringify({ resultsArr }),
     headers: {
       'Content-Type': 'application/json',
     },
   });
 
   if (response.ok) {
    document.location.reload();
   } else {
     alert('Hmm, something went wrong.')
   }
 };

// adds the book
const addBookHandler = async (event) => {
  event.preventDefault();

  if (event.target.classList[0] === 'save-btn') {
    const bookDataContainer = event.target.parentElement.parentElement;

    const bookObj = {
      title: bookDataContainer.children[1].innerText.split(':')[1].trim(),
      author: bookDataContainer.children[2].innerText.split(':')[1].trim(),
      isbn: bookDataContainer.children[3].innerText.split(':')[1].trim(),
      image_url: bookDataContainer.children[0].src,
    }

    const response = await fetch(`/api/books`, {
      method: 'POST',
      body: JSON.stringify(bookObj),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/mybooks');
    } else {
      alert('Failed to add book');
    }
  }
};

 // converts search string into proper format for API call (switches spaces out for '+' signs)
 const formatSearchText = function(string) {
  let result = '';
  for (letter of string) {
    if (letter !== ' ') {
      result += letter;
    } else {
      result += '+';
    }
  }
  return result;
}

// Add event listener to search button
searchForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  // Get the search query
  const rawQuery = event.target.children[0].value.trim();
  const query = formatSearchText(rawQuery);

  const resultArr =[];

  try {
    const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
    // Parse the response as JSON
    const data = await response.json();

    const requiredKeysArr = data.docs.filter(obj => obj.title && obj.author_name && obj.isbn && obj.cover_i);

    // limit length of search results to 10; if fewer, it'll just be that number
    const MAX_LENGTH = 10;
    const numResultObjs = (requiredKeysArr.length > MAX_LENGTH) ? MAX_LENGTH : requiredKeysArr.length;

    // build object with appropriate key names/fields for sending to back end
    for (let i = 0; i < numResultObjs; i++) {
      // format our object from the results
      const bookObj = {
        title: requiredKeysArr[i].title,
        author: requiredKeysArr[i].author_name[0],
        isbn: requiredKeysArr[i].isbn[0],
        image_url: `https://covers.openlibrary.org/b/isbn/${requiredKeysArr[i].isbn[0]}-M.jpg`
      };

      resultArr.push(bookObj);
    }

    sendSearch(resultArr);

  } catch (error) {
    console.log(error.message);
  }
});

document
  .querySelector('.search-result')
  .addEventListener('click', addBookHandler);