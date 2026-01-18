import { BookModel } from '../models/bookModel.js'

/**
 * Controller class to handle book-related HTTP requests and responses.
 */
export class BookController {
  #bookModel
  #limit = 5


  constructor() {
    this.#bookModel = new BookModel()
  }

  async renderBooks(req, res, next) {
    try {
      // Get pagination and get parameters from query string
      const page = parseInt(req.query.page) || 1

      const subject = req.query.subject || null

      const author = req.query.author || null

      const title = req.query.title || null

      const offset = (page -1) * this.#limit

      let books
      let totalBooks
      
      // Fetch books based on all combinations of the filters
      if (author && subject && title) {
        books = await this.#bookModel.getBookByAuthorAndSubjectAndTitle(this.#limit, offset, author, subject, title)
        totalBooks = await this.#bookModel.getBookCountByAuthorAndSubjectAndTitle(author, subject, title)

      }
        else if (author && subject) {
        books = await this.#bookModel.getBookByAuthorAndSubject(this.#limit, offset, author, subject)
        totalBooks = await this.#bookModel.getBookCountByAuthorAndSubject(author, subject)

      }

        else if (author && title) {
        books = await this.#bookModel.getBookByAuthorAndTitle(this.#limit, offset, author, title)
        totalBooks = await this.#bookModel.getBookCountByAuthorAndTitle(author, title)

      }
      else if (subject && title) {
        books = await this.#bookModel.getBookBySubjectAndTitle(this.#limit, offset, subject, title )
        totalBooks = await this.#bookModel.getBookCountByTitleAndSubject(title, subject)
      }

      else if (author) {
        books = await this.#bookModel.getBookByAuthor(this.#limit, offset, author)
        totalBooks = await this.#bookModel.getBookCountByAuthor(author)
      }
      else if (subject) {
        books = await this.#bookModel.getBookBySubject(this.#limit, offset, subject)
        totalBooks = await this.#bookModel.getBookCountBySubject(subject)
      }
      else if (title) {
        books = await this.#bookModel.getBookByTitle(this.#limit, offset, title)
        totalBooks = await this.#bookModel.getBookCountByTitle(title)
      }
      else {
      books = await this.#bookModel.getBooks(this.#limit, offset)
      totalBooks = await this.#bookModel.getBookCount()
      }

      const subjects = await this.#bookModel.getSubjects()
      const totalPages = Math.ceil(totalBooks / this.#limit)
      const authors = await this.#bookModel.getAuthors()

      const maxPages = 20

      // Calculate needed pages
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
        booksExist: books.length > 0,
        subjects,
        currentSubject: subject,
        authors,
        currentAuthor: author,
        title,
        currentTitle: title
      })
    } catch (err) {
      next(err)
    }
  }
}
