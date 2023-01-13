const commentId = document.querySelector('input[name="book-title]').value.trim();
const commentFormHandler = async (event) => {
    event.preventDefault();

    const bookTitle = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (commentId) {
        const response = await fetch(`/api/comments`, {
          method: 'POST',
          body: JSON.stringify({ bookTitle, commentId }),
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
  document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
