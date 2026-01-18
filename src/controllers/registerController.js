import { MemberModel } from '../models/memberModel.js'
/**
 * Encapsulates a controller.
 */
export class RegisterController {

    constructor() {
      this.memberModel = new MemberModel()
    }

  register (req, res, next) {
    res.render('register/register', { title: 'Register Member' })
  }

  async registerNewMember (req, res, next) {
    try {
    const { fname, lname, address, city, zip, phone, email, password, confirmPassword } = req.body

    // Make sure all fields are filled in
    if (!fname || !lname || !address || !city || !zip || !phone || !email || !password) {
        req.session.flash = { type: 'danger', text: 'Fill in all fields' }
        return res.redirect('./register')
      }

      // Make sure you input the same password 2 times
      if (password !== confirmPassword) {
        req.session.flash = { type: 'danger', text: 'Passwords do not match. Please try again.' }
        return res.redirect('./register')
      }

      // Check password length
      if (password.length < 6) {
        req.session.flash = { type: 'danger', text: 'Password too short!' }
        return res.redirect('./register')
      }


      // Check that the email has not been used before
      const emailExists = await this.memberModel.emailUniqueCheck(email)
        if (emailExists) {
        req.session.flash = { type: 'danger', text: 'Email already exist in database!' }
        return res.redirect('./register')
      }

      // Create a new member  in the database
      const userId = await this.memberModel.createMember({
        fname,
        lname,
        address,
        city,
        zip,
        phone,
        email,
        password
      })


      req.session.flash = { type: 'success', text: 'Account successfully registered!' }
      res.redirect('./login')

    } catch (error) {
      console.error('Registration error:', error)
      next(error)
    }

  }
}