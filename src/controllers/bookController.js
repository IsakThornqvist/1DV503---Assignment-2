import { BookModel } from '../models/bookModel.js'

/**
 * Controller class to handle book-related HTTP requests and responses.
 */
export class BookController {
  #bookModel
  #limit = 5

  /**
   * Creates a new BookController instance.
   * Initializes a BookModel instance and sets the default pagination limit.
   */
  constructor() {
    this.#bookModel = new BookModel()
  }

  /**
   * Handles rendering the list of books, optionally filtered by subject, with pagination.
   * Extracts query parameters from the request (page and subject).
   * Fetches books and metadata from the model, then renders the 'books/books' view.
   * 
   * @param {import('express').Request} req - Express request object
   * @param {import('express').Response} res - Express response object
   * @param {import('express').NextFunction} next - Express next middleware function
   * @returns {Promise<void>} - Resolves when rendering is complete
   */
  async renderBooks(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1
      console.log('page', page)
      const subject = req.query.subject || null
      console.log('subject', subject)
      const offset = (page -1) * this.#limit
      console.log('offset', offset)

      let books
      let totalBooks
      if (subject) {
        books = await this.#bookModel.getBookBySubject(this.#limit, offset, subject)
        totalBooks = await this.#bookModel.getBookCountBySubject(subject)
        console.log('totalBooks', totalBooks)
      } else {
      books = await this.#bookModel.getBooks(this.#limit, offset)
      totalBooks = await this.#bookModel.getBookCount()
      console.log('totalBooks', totalBooks)
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

  // Render the books page with all relevant data for display and controls
      res.render('books/books', {
        title: 'Books we offer!',
        books,
        currentPage: page,
        totalPages,
        firstPage,
        lastPage,
        booksExist: books.length > 0,
        subjects,
        currentSubject: subject
      })
    } catch (err) {
      next(err)
    }
  }
}
