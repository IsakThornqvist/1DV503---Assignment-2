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

}
