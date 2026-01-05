import { BookModel } from '../models/bookModel.js'

export class BookController {
  #bookModel
  #limit = 5

  constructor() {
    this.#bookModel = new BookModel()
  }

  async renderBooks(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1
      const offset = (page -1) * this.#limit

      const books = await this.#bookModel.getBooks(this.#limit, offset)
      const totalBooks = await this.#bookModel.getBookCount()

      const totalPages = Math.ceil(totalBooks / this.#limit)

      const maxPages = 20

      let firstPage = Math.max(1, page - Math.floor(maxPages / 2))
      let lastPage = firstPage + maxPages - 1

  if (lastPage > totalPages) {
    lastPage = totalPages
    firstPage = Math.max(1, lastPage - maxPages + 1)
  }

      res.render('books/books', {
        title: 'Books we offer!',
        books,
        currentPage: page,
        totalPages,
        firstPage,
        lastPage
      })
    } catch (err) {
      next(err)
    }
  }
}
