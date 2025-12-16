import pool from '../config/db.js'


export class BookModel {

async getBooks(limit = 10) {
  const sql = 'SELECT * FROM books ORDER BY price DESC LIMIT ?'
  const [rows] = await pool.query(sql, [limit])
  return rows
}

}
