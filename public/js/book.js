const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('input[name="book-title]').value.trim();
  const isbn = document.querySelector('#book-isbn').value.trim();
  const author = document.querySelector('#book-author').value.trim();

  if (title && isbn && author) {
    const response = await fetch(`/api/books`, {
      method: 'POST',
      body: JSON.stringify({ title, isbn, author }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to add book');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

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

document
  .querySelector('.new-book-add')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.book-list')
  .addEventListener('click', delButtonHandler);

