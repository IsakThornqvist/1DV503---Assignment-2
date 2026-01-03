import { BookModel } from '../models/bookModel.js'

export class BookController {
  constructor() {
    this.bookModel = new BookModel()
  }

  async renderBooks(req, res, next) {
    try {
      const books = await this.bookModel.getBooks(10)
      res.render('books/books', { title: 'Books we offer!', books })
    } catch (err) {
      next(err)
    }
  }
}
