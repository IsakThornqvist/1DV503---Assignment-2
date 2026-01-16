import pool from '../config/db.js'

 /**
 * Model class for book-related database operations.
 */
export class BookModel {

   /**
   * Fetches a paginated list of books.
   * 
   * @param {number} [limit=5] - Number of books to fetch.
   * @param {number} [offset=0] - Number of books to skip (for pagination).
   * @returns {Promise<Array>} - Resolves to an array of book objects.
   */
async getBooks(limit = 5, offset = 0) {
  const sql = 'SELECT * FROM books LIMIT ? OFFSET ?'
  const [rows] = await pool.query(sql, [limit, offset])
  return rows
}

  /**
   * Counts the total number of books in the database.
   * 
   * @returns {Promise<number>} - Resolves to the total count of books.
   */
  async getBookCount() {
    const sql = 'SELECT COUNT(*) as total FROM books'
    const [rows] = await pool.query(sql)
    return rows[0].total
  }

  /**
   * Fetches a paginated list of books filtered by subject.
   * 
   * @param {number} [limit=5] - Number of books to fetch.
   * @param {number} [offset=0] - Number of books to skip (for pagination).
   * @param {string} subject - Subject to filter books by.
   * @returns {Promise<Array>} - Resolves to an array of book objects filtered by subject.
   */
  async getBookBySubject (limit = 5, offset = 0, subject = 'none') {
    const sql = `SELECT * FROM books WHERE subject = ? LIMIT ? OFFSET ?`
    const [rows] = await pool.query(sql, [subject, limit, offset])
    return rows
  }

  /**
   * Retrieves a list of unique subjects from all books.
   * 
   * @returns {Promise<Array>} - Resolves to an array of objects with distinct subjects.
   */
  async getSubjects () {
    const sql = 'SELECT DISTINCT subject FROM books'
    const [rows] = await pool.query(sql)
    return rows
  }

  /**
   * Counts the total number of books for a specific subject.
   * 
   * @param {string} subject - Subject to count books for.
   * @returns {Promise<number>} - Resolves to the total count of books for the given subject.
   */
    async getBookCountBySubject(subject) {
    const sql = 'SELECT COUNT(*) as total FROM books WHERE subject = ?'
    const [rows] = await pool.query(sql, [subject])
    return rows[0].total
    
  }

    async getAuthors () {
    const sql = 'SELECT DISTINCT author FROM books'
    const [rows] = await pool.query(sql)
    return rows
  }

    async getBookByAuthor (limit = 5, offset = 0, author = 'none') {
    const sql = `SELECT * FROM books WHERE author LIKE ? LIMIT ? OFFSET ?`
    const [rows] = await pool.query(sql, [`${author}%`, limit, offset])
    return rows
  }

    async getBookCountByAuthor(author) {
    const sql = 'SELECT COUNT(*) as total FROM books WHERE author LIKE ?'
    const [rows] = await pool.query(sql, [`${author}%`])
    return rows[0].total
    
  }
  
    async getAuthorsAndSubjects () {
    const sql = 'SELECT DISTINCT author, subject FROM books'
    const [rows] = await pool.query(sql)
    return rows
  }

    async getBookByAuthorAndSubject (limit = 5, offset = 0, author = 'none', subject = 'none') {
    const sql = `SELECT * FROM books WHERE author LIKE ? AND subject = ? LIMIT ? OFFSET ?`
    const [rows] = await pool.query(sql, [`${author}%`, subject, limit, offset])
    return rows
  }

    async getBookCountByAuthorAndSubject(author, subject) {
    const sql = 'SELECT COUNT(*) as total FROM books WHERE author LIKE ? AND subject = ?'
    const [rows] = await pool.query(sql, [`${author}%`, subject])
    return rows[0].total
    
  }

    async getBookByAuthorAndSubjectAndTitle (limit = 5, offset = 0, author = 'none', subject = 'none', title = 'none') {
    const sql = `SELECT * FROM books WHERE author LIKE ? AND subject = ? AND title LIKE ? LIMIT ? OFFSET ?`
    const [rows] = await pool.query(sql, [`${author}%`, subject, `%${title}%`,  limit, offset])
    return rows
  }

    async getBookCountByAuthorAndSubjectAndTitle(author, subject, title) {
    const sql = 'SELECT COUNT(*) as total FROM books WHERE author LIKE ? AND subject = ? AND title LIKE ?'
    const [rows] = await pool.query(sql, [`${author}%`, subject, `%${title}%`])
    return rows[0].total
    
  }

      async getBookByAuthorAndTitle (limit = 5, offset = 0, author = 'none', title = 'none') {
    const sql = `SELECT * FROM books WHERE author LIKE ? AND title LIKE ? LIMIT ? OFFSET ?`
    const [rows] = await pool.query(sql, [`${author}%`, `%${title}%`, limit, offset])
    return rows
  }

      async getBookCountByAuthorAndTitle(author, title) {
    const sql = 'SELECT COUNT(*) as total FROM books WHERE author LIKE ? AND title LIKE ?'
    const [rows] = await pool.query(sql, [`${author}%`, `%${title}%`])
    return rows[0].total
    
  }

    async getBookCountByTitleAndSubject(title, subject) {
    const sql = 'SELECT COUNT(*) as total FROM books WHERE title LIKE ? AND subject = ?'
    const [rows] = await pool.query(sql, [`%${title}%`, subject])
    return rows[0].total
    
  }

    async getBookBySubjectAndTitle (limit = 5, offset = 0, subject = 'none', title = 'none') {
    const sql = `SELECT * FROM books WHERE subject = ? AND title LIKE ? LIMIT ? OFFSET ?`
    const [rows] = await pool.query(sql, [subject, `%${title}%`, limit, offset])
    return rows
  }

  async getBookByTitle (limit = 5, offset = 0, title = 'none') {
    const sql = 'SELECT * FROM books WHERE title LIKE ? LIMIT ? OFFSET ?'
    const [rows] = await pool.query(sql, [`%${title}%`, limit, offset])
    return rows
  }

    async getBookCountByTitle(title) {
    const sql = 'SELECT COUNT(*) as total FROM books WHERE title LIKE ?'
    const [rows] = await pool.query(sql, [`%${title}%`])
    return rows[0].total
    
  }
}
