import pool from '../config/db.js'
import bcrypt from 'bcrypt'


export class MemberModel {

async getMembers(limit = 10) {
  const sql = 'SELECT fname, lname, address, city, zip, phone, email FROM members LIMIT ?'
  const [rows] = await pool.query(sql, [limit])
  return rows
}

 async createMember(memberData) {

  const { fname, lname, address, city, zip, phone, email, password } = memberData


  const passwordHashed = await bcrypt.hash(password, 10)

  const sqlQuery = `
    INSERT INTO members (fname, lname, address, city, zip, phone, email, password) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `

      const [userDATA] = await pool.query(sqlQuery, [
      fname, 
      lname, 
      address, 
      city, 
      zip, 
      phone, 
      email, 
      passwordHashed
    ])
    
    return userDATA.insertId
  }
  
} 


