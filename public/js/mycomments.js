const title = document.querySelector('input[name="book-title]').value.trim();
console.log('testing');
console.log(title);

const commentFormHandler = async (event) => {
  event.preventDefault();

  const title = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  if (content) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
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

  const content = document.querySelector('#comment-edit').value.trim();

  console.log(content);

  if (comment) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ content }),
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
