import { getBooks } from '../models/bookModel.js'

export class BookController {
  async renderBooks(req, res, next) {
    try {
      const books = await getBooks(10) 
      res.render('books/books', { title: 'Books', books })
    } catch (err) {
      next(err)
    }
  }
}
