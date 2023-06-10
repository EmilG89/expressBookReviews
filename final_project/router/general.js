const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if(!username || !password) {
     return res.send(JSON.stringify({message: "Invalid input."}));
  }
  if (!isValid(username)) {
      users.push({"username": username, "password": password});
      return res.send("Congratulations! User successfully registered.")
  }
  else {
      return res.send(`User with username: ${username} already exists.`);
  }

});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.send(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let number = req.params.isbn;
  return res.send(books[number]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
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
  
  return res.send(authorsFound);

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let title = req.params.title;
  let keys = Object.keys(books);

  let titlesFound = new Array();

  for (let i=0; i < keys.length; i++) {
    let value = books[keys[i]];
    let titleValue = value.title;
    if (titleValue.includes(title)) {
        titlesFound.push(value);
    }
  }
  
  return res.send(titlesFound);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let theBook = books[req.params.isbn];
  let reviews = theBook.reviews;
  return res.send(reviews);
});

module.exports.general = public_users;
