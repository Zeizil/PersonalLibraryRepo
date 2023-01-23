const content = document.querySelector('#comment-content').value.trim()
console.log(content);
const book_id = document.querySelector('#book_id').value.trim()
console.log(book_id);

const commentFormHandler = async (event) => {
  event.preventDefault();

  if (content && book_id) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ content, book_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

const editFormHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector('#comment-content').value.trim();
  const book_id = document.querySelector('#book-id').value.trim()

  console.log(content, book_id);

  if (content && book_id) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ content, book_id}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to update comment.');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete comment.');
    }
  }
};

document
  .querySelector('.comment-form')
  .addEventListener('submit', commentFormHandler);

document
  .querySelector('#edit-comment-form')
  .addEventListener('submit', editFormHandler);

document
  .querySelector('.comment-list')
  .addEventListener('click', delButtonHandler);
