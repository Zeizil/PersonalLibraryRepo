const fetch = require('node-fetch');
const sequelize = require('../config/connection');
const { User, Book } = require('../models');

const userData = require('./userData.json');
// const projectData = require('./projectData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const bookData = await fetch(
    'https://openlibrary.org/search.json?q=first_publish_year%3A[2000+TO+2022]&sort=new&limit=50'
  );

  const books = await bookData.json();

  const formattedBooks = books.docs.map((book) => {
    return {
      title: book?.title || 'title unknown',
      isbn: book?.isbn?.[0] || '',
      author: book?.author_name?.[0] || 'author unknown',
    };
  });
  const root = 'https://covers.openlibrary.org/b/isbn/';
  // for each book, fetch the cover image
  const booksWithCovers = await Promise.all(
    formattedBooks.map(async (book) => {
      if (book?.isbn) {
        const coverData = await fetch(`${root}${book.isbn}-M.jpg`);

        return { ...book, image_url: coverData?.url };
      } else {
        return { ...book, image_url: '' };
      }
    })
  );
  console.log(booksWithCovers);

  await Book.bulkCreate(booksWithCovers);

  await User.bulkCreate(userData, { individualHooks: true });



  // await UserBook.bulkCreate([
  //   {
  //     user_id: 1,
  //     book_id: 1,
  //   },
  // ]);

  process.exit(0);
};

seedDatabase();
