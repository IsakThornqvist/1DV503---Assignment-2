import pool from '../config/db.js'

export class OrderModel {
  
  async createOrder(userid, address, city, zip) {
    const sql = `INSERT INTO orders (userid, created, shipAddress, shipCity, shipZip) VALUES (?, NOW(), ?, ?, ?)`
    const [rows] = await pool.query(sql, [userid, address, city, zip])
    return rows.insertId
  }

  async createOrderDetail(ono, isbn, qty, amount) {
    const sql = `INSERT INTO odetails (ono, isbn, qty, amount) VALUES (?, ?, ?, ?)`
    await pool.query(sql, [ono, isbn, qty, amount])
  }
}