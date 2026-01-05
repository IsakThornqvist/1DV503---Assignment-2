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
      const subject = req.query.subject || null
      const offset = (page -1) * this.#limit

      let books
      let totalBooks
      if (subject) {
        books = await this.#bookModel.getBookBySubject(this.#limit, offset, subject)
        totalBooks = await this.#bookModel.getBookCountBySubject(subject)
      } else {
      books = await this.#bookModel.getBooks(this.#limit, offset)
      totalBooks = await this.#bookModel.getBookCount()
      }

      const subjects = await this.#bookModel.getSubjects()
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
        lastPage,
        subjects,
        currentSubject: subject
      })
    } catch (err) {
      next(err)
    }
  }
}
