
// DELETE book event
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
      document.location.replace('/mybooks');
    } else {
      alert('Failed to remove book from inventory');
    }
  }
};


// document
//   .querySelector('.book-list')
//   .addEventListener('click', delButtonHandler);
