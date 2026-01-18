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

  /**
   * Logs out the user by destroying the session and redirects to the home page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  logout (req, res, next) {
    req.session.destroy((err) => {
      if (err) {
        console.error(err)
        req.session.flash = { type: 'danger', text: 'Failed to log out!' }
        return res.redirect('/')
      }
      res.redirect('/')
      console.log('logged out')
    })
  }

  
  /**
   * Processes login form submission.
   * Validates credentials and sets session if successful.
   * Redirects back to login page with flash messages on failure.
   *
   * @param {object} req - Express request object containing `body` with `email` and `password`.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Promise<void>}
   */
async login(req, res, next) {
  try {
    const { email, password } = req.body
    
    if (!email || !password) {
      req.session.flash = { type: 'danger', text: 'Provide both email and password' }
      return res.redirect('/login')
    }
    
    const emailExists = await this.memberModel.emailUniqueCheck(email)

      if (!emailExists) {
      req.session.flash = { type: 'danger', text: 'Invalid credentials, login failed!' }
      return res.redirect('/login')
    }

    const isAMatch = await this.memberModel.emailAndPasswordMatch(email, password)


      if(isAMatch) {
    const userId = await this.memberModel.getUserId(email)
     req.session.user = { id: userId, email: email}


        req.session.flash = { type: 'success', text: 'User logged in' }
        return res.redirect('./books')
      }
       else {
        req.session.flash = { type: 'danger', text: 'Login failed' }
        return res.redirect('./login')
      }

    
  } catch (error) {
    next(error)
  }
}




}
