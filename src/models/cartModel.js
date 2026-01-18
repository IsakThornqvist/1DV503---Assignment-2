import pool from '../config/db.js'

export class CartModel {


async addBookToCart(userid, isbn, qty) {

    const bookAlreadyInCart = await this.getItemFromCart(userid, isbn)

    if (bookAlreadyInCart) {
        return await this.updateQuantityForCart(userid, isbn, bookAlreadyInCart.qty + qty)
    } else {
        const sql = `INSERT INTO cart (userid, isbn, qty) VALUES (?, ?, ?)`
        const [rows] = await pool.query(sql, [userid, isbn, qty])
        return rows
    }
}

async getItemFromCart(userid, isbn) {
    const sql = `SELECT * FROM cart WHERE userid = ? AND isbn = ?`
    const [rows] = await pool.query(sql, [userid, isbn])
    return rows[0] || null
}

async updateQuantityForCart (userid, isbn, qty) {
const sql = `UPDATE cart SET qty = ? WHERE userid = ? AND isbn = ?`
const [rows] = await pool.query(sql, [qty, userid, isbn])
return rows
}

async getCartItemsWithUserId (userid) {
    const sql = `SELECT cart.isbn, cart.qty, books.title, books.author, books.price, books.subject, cart.qty * books.price AS total FROM cart INNER JOIN books on cart.isbn = books.isbn WHERE cart.userid = ? ORDER BY cart.isbn`
    const [rows] = await pool.query(sql, [userid])
    return rows

}

async clearCart (userid) {
    const sql = `DELETE FROM cart WHERE userid = ?`

    const [rows] = await pool.query(sql, [userid])
    return rows
}



}