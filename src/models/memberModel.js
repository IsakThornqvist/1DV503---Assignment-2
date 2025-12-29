import pool from '../config/db.js'
import bcrypt from 'bcrypt'


/**
 * Class representing database operations related to members.
 */
export class MemberModel {

    /**
   * Retrieve a list of members limited by a specified count.
   * 
   * @param {number} [limit=10] - Maximum number of members to return.
   * @returns {Promise<Array<Object>>} Array of member objects with fields: fname, lname, address, city, zip, phone, email.
   */
async getMembers(limit = 10) {
  const sql = 'SELECT fname, lname, address, city, zip, phone, email FROM members LIMIT ?'
  const result = await pool.query(sql, [limit])
  const rows = result[0]
  return rows
}


  /**
   * Create a new member with the provided data and store it in the database.
   * Password will be hashed before storing.
   * 
   * @param {Object} memberData - Member details.
   * @param {string} memberData.fname - First name.
   * @param {string} memberData.lname - Last name.
   * @param {string} memberData.address - Address.
   * @param {string} memberData.city - City.
   * @param {string|number} memberData.zip - Zip code.
   * @param {string} memberData.phone - Phone number.
   * @param {string} memberData.email - Email address.
   * @param {string} memberData.password - Plain text password.
   * @returns {Promise<number>} The insert ID (user id) of the newly created member.
   */
 async createMember(memberData) {

  const { fname, lname, address, city, zip, phone, email, password } = memberData


  const passwordHashed = await bcrypt.hash(password, 10)
// insert a new row into members
// fill each colums with a value
// Values will be provided later bcuz ? ? ?
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

  /**
   * Check if an email is already registered in the members table.
   * 
   * @param {string} email - The email address to check.
   * @returns {Promise<boolean>} True if email exists, false otherwise.
   */
  async emailUniqueCheck (email) {
    const sqlQuery = 'SELECT userid from members WHERE email = ?'

    const result = await pool.query(sqlQuery, [email])
    const rows = result[0]

    return rows.length > 0
  }
  
} 


