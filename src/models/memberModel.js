import pool from '../config/db.js'

export async function getMembers(limit = 10) {
  const sql = 'SELECT * FROM books LIMIT ?'
  const [rows] = await pool.query(sql, [limit])
  return rows
}

export async function getMembers(limit = 10) {
  const sql = 'SELECT * FROM books LIMIT ?'
  const [rows] = await pool.query(sql, [limit])
  return rows
}

