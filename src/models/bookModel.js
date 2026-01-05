import pool from '../config/db.js'


export class BookModel {
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

}
