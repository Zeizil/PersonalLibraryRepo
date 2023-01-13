const bookTitle = document.querySelector('input[name="book-title]').value.trim();
console.log("testing");
console.log(postId);

const editFormHandler = async (event) => {
    event.preventDefault();

    const commentId = document.querySelector('#comment-edit').value.trim();
    const description = document.querySelector('#comment-body').value.trim();
    
    console.log(commentId);
    console.log(description);
    
    if (commentId && description) {
        const response = await fetch(`/api/comments`, {
          method: 'POST',
          body: JSON.stringify({ commentId, description }),
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

  
  document
    .querySelector('#edit-comment-form')
    .addEventListener('submit', editFormHandler);