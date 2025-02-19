

// 1. Setup MongoDB

// 2. Create Database and Collection
use library;
db.createCollection("books");

// 3. Insert Data

db.books.insertMany([
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    publishedYear: 1925,
    genre: "Classic",
    ISBN: "9780743273565"
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    publishedYear: 1960,
    genre: "Fiction",
    ISBN: "9780061120084"
  },
  {
    title: "1984",
    author: "George Orwell",
    publishedYear: 1949,
    genre: "Dystopian",
    ISBN: "9780451524935"
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    publishedYear: 1951,
    genre: "Fiction",
    ISBN: "9780316769488"
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    publishedYear: 1937,
    genre: "Fantasy",
    ISBN: "9780547928227"
  }
]);

// 4. Retrieve Data

// Retrieve all books
db.books.find().pretty();

// Query books by a specific author
db.books.find({ author: "George Orwell" }).pretty();

// Find books published after the year 2000
db.books.find({ publishedYear: { $gt: 2000 } }).pretty();

// 5. Update Data

// Update the publishedYear of a specific book
db.books.updateOne(
  { ISBN: "9780743273565" },
  { $set: { publishedYear: 2023 } }
);

// Add a new field called rating to all books with a default value of 5
db.books.updateMany(
  {},
  { $set: { rating: 5 } }
);

// 6. Delete Data

// Delete a book by its ISBN
db.books.deleteOne({ ISBN: "9780451524935" });

// Remove all books of a particular genre
db.books.deleteMany({ genre: "Fiction" });

// 7. Data Modeling Exercise

// E-commerce Platform Schema

db.createCollection("users");
db.createCollection("products");
db.createCollection("orders");

// Users collection example document
db.users.insertOne({
  userId: 1,
  name: "Alice",
  email: "alice@gmail.com",
  address: "Ruaka, Nairobi",
  orders: [] // Embedded relationship for user orders
});

// Products collection example document
db.products.insertOne({
  productId: 101,
  name: "Laptop",
  price: 1200,
  category: "Electronics"
});

// Orders collection example document
db.orders.insertOne({
  orderId: 1001,
  userId: 1, // Referencing user
  items: [
    { productId: 101, quantity: 1 }
  ],
  total: 1200
});

// 8. Aggregation Pipeline

// Find the total number of books per genre
db.books.aggregate([
  { $group: { _id: "$genre", totalBooks: { $sum: 1 } } }
]);

// Calculate the average published year of all books
db.books.aggregate([
  { $group: { _id: null, avgPublishedYear: { $avg: "$publishedYear" } } }
]);

// Identify the top-rated book
db.books.find().sort({ rating: -1 }).limit(1);

// 9. Indexing

// Create an index on the author field
db.books.createIndex({ author: 1 });

// Verify the index
db.books.getIndexes();

