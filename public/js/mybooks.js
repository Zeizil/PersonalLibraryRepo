const bookFormHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#book-title').value.trim();
  
  if (title) {
    const response = await fetch(`/api/books`, {
    method: 'POST',
    body: JSON.stringify({ title }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/profile');
  } else {
    alert('Failed to add book to list');
  }
  }
};




const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    // Event listener for deleting item 
    const deleteButton = document.querySelectorAll('deleteBtn');
    for (let i = 0; i < deleteButton.length + 1; i++) {
      deleteButton[i].addEventListener('click', delButtonHandler);
    }

    const response = await fetch(`/api/books/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to remove book from inventory');
    }
  }
};

  
    // const searchTitle = document.getElementById('search-title');
    //const addBtn = document.getElementById('addBtn); 
    // const myBooks = JSON.parse(localStorage.getItem("myBooks")) || [];
    // addBtn.addEventListener('click', async function(event) {
    //   event.preventDefault();
    
         
    //     const addedBook = await getBooks(searchTitle.value);
    
// Event listener for adding book
// $("main").on("click", ".addButton", function(event){
//   const addButton = event.target.parentElement;


document
  .querySelector('.book-add')
  .addEventListener('click', bookFormHandler);

document
  .querySelector('.book-list')
  .addEventListener('click', delButtonHandler);
