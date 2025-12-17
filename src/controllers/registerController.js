import { MemberModel } from '../models/memberModel.js'
/**
 * Encapsulates a controller.
 */
export class RegisterController {

    constructor() {
      this.memberModel = new MemberModel()
    }
  /**
   * Renders a view and sends the rendered HTML string as an HTTP response.
   * index GET.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  register (req, res, next) {
    res.render('register/register', { title: 'Register Member' })
  }

  async registerNewMember (req, res, next) {
    try {
    const { fname, lname, address, city, zip, phone, email, password, confirmPassword } = req.body

    // funkar ej kolla på senare
    if (!fname || !lname || !address || !city || !zip || !phone || !email || !password) {
        req.session.flash = { type: 'danger', text: 'Fill in all fields' }
        return res.redirect('./register')
      }



      // makes sure you input the same password 2 times
      if (password !== confirmPassword) {
        req.session.flash = { type: 'danger', text: 'Passwords do not match. Please try again.' }
        return res.redirect('./register')
      }

      // validates password length
      if (password.length < 6) {
        req.session.flash = { type: 'danger', text: 'Password too short!' }
        return res.redirect('./register')
      }


      // validates that the email has not been used before
      const emailExists = await this.memberModel.emailUniqueCheck(email)
        if (emailExists) {
        req.session.flash = { type: 'danger', text: 'Email already exist in database!' }
        return res.redirect('./register')
      }



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

      console.log('user registered '  + userId)

 req.session.flash = { type: 'success', text: 'Account successfully registered!' }
      res.redirect('./login')

    } catch (error) {
      console.error('Registration error:', error)
      next(error)
    }

  }
}