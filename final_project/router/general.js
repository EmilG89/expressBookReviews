const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if(username || password) {
    if (!isValid(username)) {
      users.push({"username": username, "password": password});
      return res.send("Congratulations! User successfully registered.")
    }
    else {
      return res.send(`User with username: ${username} already exists.`);
    }
}
    else {
        return res.send(JSON.stringify({message: "Invalid input."}));
    }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  let listOfBooks = new Promise((resolve, reject) => {
    resolve(JSON.stringify(books, null, 2));
  });

  listOfBooks.then((message) => {
      return res.send("List of books: " + message);
  });

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let bookDetails = new Promise((resolve, reject) => {
    let number = req.params.isbn;
    resolve(JSON.stringify(books[number], null, 2));
  });

  bookDetails.then((message) => {
    return res.send("Book datails: " + message);
});
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let bookByAuthor = new Promise((resolve, reject) => {
    let author = req.params.author;
    let keys = Object.keys(books);

    let authorsFound = new Array();

    for (let i=0; i < keys.length; i++) {
        let value = books[keys[i]];
        let authorValue = value.author;
        if (authorValue.includes(author)) {
            authorsFound.push(value);
        }
    }
    resolve(JSON.stringify(authorsFound, null, 2));
  });

  bookByAuthor.then((message) => {
      return res.send(`Book details for author: ${req.params.author}` + message)
  });

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let bookByTitle = new Promise((resolve, reject) => {
    let title = req.params.title;
    let titlesFound = new Array();
    let keys = Object.keys(books);
    for (let i=0; i < keys.length; i++) {
    let value = books[keys[i]];
    let titleValue = value.title;
    if (titleValue.includes(title)) {
    titlesFound.push(value);
    }
    }
    resolve(JSON.stringify(titlesFound, null, 2));
    });
    bookByTitle.then((message) => {
    return res.send(`Book details for title: ${req.params.title}` + message)
    });
    
    
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let theBook = books[req.params.isbn];
  let reviews = theBook.reviews;
  return res.send(reviews);
});

module.exports.general = public_users;
