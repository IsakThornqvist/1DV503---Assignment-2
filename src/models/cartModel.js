import pool from '../config/db.js'

export class CartModel {


async addBookToCart(userId, isbn, qty) {

    const bookAlreadyInCart = await this.getItemFromCart(userId, isbn)

    if (bookAlreadyInCart) {
        return updateQuantity(userId, isbn, bookAlreadyInCart.qty + qty)
    } else {
        const sql = `INSERT INTO caer (userid, isbn, qty) VALUES (?, ?, ?)`
        const [rows] = await pool.query(sql, [userId, isbn, qty])
        return rows
    }
}

async getItemFromCart(userId, isbn) {
    const sql = `SELECT * FROM cart WHERE userID = ? AND isbn = ?`
    const [rows] = await pool.query(sql, [userId, isbn])
    return rows
}

async updateQuantityForCart (userId, isbn, qty) {

}

async getCartWithUserId (userId) {

}

async clearCart (userId) {
    const sql = `DELETE FROM cart WHERE userId = ?`

    const [rows] = await pool.query(sql, [userId])
    return rows
}



}