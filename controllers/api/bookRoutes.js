const router = require('express').Router();
const { User, Book, UserBook } = require('../../models');  
const withAuth = require('../../utils/auth');


// Get all books associated with a user
router.get('/', async (req, res) => {
    try {

    // Grab the users ID (req.session.user_id)

    // Find all books assocaited with that user THROUGH UserBook

    // Serialize

    // Render 'yourbooks' template, with the array passed in (as object)

    } catch (err) {
      res.status(500).json(err);
    }
  });
  
// Get a single book by its ID, assoicated with that user
router.get('/:id', async (req, res) => {
  try {

    // Grab the users ID (req.session.user_id)

    // Find the one book (by ID - req.params.id) assoc with that user THROUGH UserBook

    // Serialize

    // Render 'book' template with that one book passed in


    //EXAMPLE OF A M:M GET-ONE (from miniproject):
    // try {
    //   const locationData = await Location.findByPk(req.params.id, {
    //     // JOIN with travellers, using the Trip through table
    //     include: [{ model: Traveller, through: Trip, as: 'location_travellers' }]
    //   });
  

    res.status(200).json(bookData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Adds a book to a user
router.post('/', withAuth, async (req, res) => {

  // Look for the book that was selected in the DB

  // If it isn't in there, add it

  // Link the user to that book thru UserBook

  // Redirect to the 'yourbooks' template

});

// Removes a book from user's inventory -- doesn't delete the book, but deletes the link of that book from that user
router.delete('/:id', withAuth, async (req, res) => {

  // Look for BOTH the userID (who wants to remove the book) (req.session.user_id), AND the ID of that book (req.params.id)

  // With those two IDs, find the row in UserBook whose 2 foreign keys match user_id and book_id and delete THAT

  // Redirect to the 'yourbooks' template
});


module.exports = router;
