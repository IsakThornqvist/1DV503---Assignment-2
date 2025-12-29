import { MemberModel } from '../models/memberModel.js'
/**
 * Encapsulates a controller.
 */
export class LoginController {

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
  renderLogin (req, res, next) {
    res.render('login/login', { title: 'Login' })
  }



async login(req, res, next) {
  try {
    const { email, password } = req.body
    
    if (!email || !password) {
      req.session.flash = { type: 'danger', text: 'Please provide both email and password' }
      return res.redirect('/login')
    }
    
    const emailExists = await this.memberModel.emailUniqueCheck(email)

      if (!emailExists) {
      req.session.flash = { type: 'danger', text: 'Login failed - Invalid credentials' }
      return res.redirect('/login')
    }

    const isAMatch = await this.memberModel.emailAndPasswordMatch(email, password)
      console.log(email)
      console.log(password)

      if(isAMatch) {
        req.session.flash = { type: 'success', text: 'Login worked' }
        return res.redirect('./books')
      } else {
        req.session.flash = { type: 'danger', text: 'Login failed' }
        return res.redirect('./register')
      }

    
  } catch (error) {
    next(error)
  }
}

}
