import pool from '../config/db.js'

 /**
 * Model class for book-related database operations.
 */
export class BookModel {

// Fetch books with limit
async getBooks(limit = 5, offset = 0) {
  const sql = 'SELECT * FROM books LIMIT ? OFFSET ?'
  const [rows] = await pool.query(sql, [limit, offset])
  return rows
}


  async getBookCount() {
    const sql = 'SELECT COUNT(*) as total FROM books'
    const [rows] = await pool.query(sql)
    return rows[0].total
  }

  // Filter books by subject
  async getBookBySubject (limit = 5, offset = 0, subject = 'none') {
    const sql = `SELECT * FROM books WHERE subject = ? LIMIT ? OFFSET ?`
    const [rows] = await pool.query(sql, [subject, limit, offset])
    return rows
  }


  async getSubjects () {
    const sql = 'SELECT DISTINCT subject FROM books'
    const [rows] = await pool.query(sql)
    return rows
  }


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

    // Search by author (partial match on first name)
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
  
    // Filter by author and subject 
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

    // Search by title (partial match)
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
