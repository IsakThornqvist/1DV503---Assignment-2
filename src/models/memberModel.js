import pool from '../config/db.js'
import bcrypt from 'bcrypt'


/**
 * Class representing database operations related to members.
 */
export class MemberModel {

async getMembers(limit = 10) {
  const sql = 'SELECT fname, lname, address, city, zip, phone, email FROM members LIMIT ?'
  const result = await pool.query(sql, [limit])
  const rows = result[0]
  return rows
}


async createMember(memberData) {
  const { fname, lname, address, city, zip, phone, email, password } = memberData

  // Hash password before storing it
  const passwordHashed = await bcrypt.hash(password, 10)

  const sqlQuery = `
    INSERT INTO members (fname, lname, address, city, zip, phone, email, password) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `

  const result = await pool.query(sqlQuery, [
    fname, 
    lname, 
    address, 
    city, 
    zip, 
    phone, 
    email, 
    passwordHashed
    ])
    
    return result[0].insertId
  }

  // Check if email exist in the database
  async emailUniqueCheck (email) {
    const sqlQuery = 'SELECT userid from members WHERE email = ?'

    const result = await pool.query(sqlQuery, [email])
    const rows = result[0]

    return rows.length > 0
  }

  // Make sure email and password combination match
  async emailAndPasswordMatch (email, password) {
    const sqlQuery = 'SELECT password FROM members WHERE email = ?'
    const result = await pool.query(sqlQuery, [email])
    const rows = result[0]

       if (rows.length === 0) {
      return false
    }

    const passwordHashed = rows[0].password
    const isAMatch = await bcrypt.compare(password, passwordHashed)

    return isAMatch
  }

  async getUserId (email) {
    const sqlQuery = 'SELECT userid from members WHERE email = ?'

    const result = await pool.query(sqlQuery, [email])
    const rows = result[0]

    return rows[0].userid
  }

async getUserAddress(userid) {
  const sql = `SELECT fname, lname, address, city, zip FROM members WHERE userid = ?`
  const [rows] = await pool.query(sql, [userid])
  return rows[0]
}
  
} 


