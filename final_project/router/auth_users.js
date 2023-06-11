const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
    let keys = Object.keys(users);
    for (let i of keys) {
        let user = users[keys[i]];
        let namesfound = [];
        if (user.username === username) {
            namesfound.push(username);
        }
        if (namesfound.length > 0) {
            return true;
        }
    }

    return false;
    
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let validusers = users.filter((user)=>{
    return (user.username === username && user.password === password);
});
if (validusers.length > 0) {
    return true;
}
else {
    return false;
}
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  let username = req.body.username;
  let password = req.body.password;

  if (!username && !password) {
    return res.status(400).json({message: "Input invalid."});    
  }
  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign(
        {data: password},
        'access',
        {expiresIn: 60*60});
    
    req.session.authenticated = {accessToken,username};

    return res.status(200).send(`User ${username} logged in.`);
  }
  else {
    return res.status(300).json({message: "User not found."});
  }
  
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
