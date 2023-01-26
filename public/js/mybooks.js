
// DELETE book event
const delButtonHandler = async (event) => {

  if (event.target.tagName == 'BUTTON') {
    //navigate thru the DOM to grab the individual book URL
    const urlVal = event.target.parentElement.parentElement.children[1].href;
    //extract the book ID from the URL
    const urlSplit = urlVal.split('/');
    const id = urlSplit[urlSplit.length - 1];

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


document
  .querySelector('.book-list')
  .addEventListener('click', delButtonHandler);
