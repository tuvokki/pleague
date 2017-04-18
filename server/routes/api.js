const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// create a schema
const userSchema = new Schema({
  username: String,
  emails: [
    {
      address: String,
      verified: Boolean
    }
  ],
  profile: {
    firstname: String,
    lastname: String,
    role: String
  },
  createdAt: Date
});
const User = mongoose.model('User', userSchema);

dotenv.load();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Get all posts
router.get('/posts', (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  axios.get(`${API}/posts`)
    .then(posts => {
      res.status(200).json(posts.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });
});

router.get('/users', (req, res) => {
  const muser = process.env.MUSER;
  const mpass = process.env.MPASS;
  const mhost = process.env.MHOST;
  const mport = process.env.MPORT;
  const mdata = process.env.MDATA;

  mongoose.connect(`mongodb://${muser}:${mpass}@${mhost}:${mport}/${mdata}`);
  User.find({}, function (err, users) {
    if (err) throw err;

    // object of all the users
    console.log(users);
    res.status(200).json(users);
  });
});

module.exports = router;