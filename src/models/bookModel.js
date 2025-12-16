import pool from '../config/db.js'

export async function getBooks(limit = 5) {
  const sql = 'SELECT * FROM books LIMIT 10'
  const [rows] = await pool.query(sql, [limit])
  return rows
}
