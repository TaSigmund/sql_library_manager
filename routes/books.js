var express = require('express');
var router = express.Router();
const models = require('../models');
const { Book } = models;

/*ASYNC HANDLER*/
function asyncHandler(cb){
  return async(req , res , next) => {
    try {await cb(req,res,next)}
    catch (error) {res.status(500).send(error)}
  }
}

/* GET books listing. */
router.get('/', asyncHandler(async (req, res)=> {
    const books = await Book.findAll();
    const booksList = await books.map(books => books.toJSON())
    res.render('index', {books: booksList})
}));

/* GET form to create a new book. */

router.get('/new', (req, res, next) => {
  res.render('new-book')
}) 

/* POST data to add a new book */
router.post('/new', asyncHandler(async (req, res, next) => {
    await parseInt(req.body.year);
    const book = await Book.create(req.body);
    res.redirect('/books');
})) 

/* GET book details */

router.get('/:id', async (req, res, next) => {
  const book = await Book.findByPk(req.params.id);
  res.render('book-details', {book})
}) 

module.exports = router;