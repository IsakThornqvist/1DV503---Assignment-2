import { MemberModel } from '../models/memberModel.js'
/**
 * Encapsulates a controller.
 */
export class LoginController {

      constructor() {
      this.memberModel = new MemberModel()
    }

  renderLogin (req, res, next) {
    res.render('login/login', { title: 'Login' })
  }

  logout (req, res, next) {
    // Destroys session and redirects to home page
    req.session.destroy((err) => {
      if (err) {
        console.error(err)
        req.session.flash = { type: 'danger', text: 'Failed to log out!' }
        return res.redirect('/')
      }
      res.redirect('/')
    })
  }

async login(req, res, next) {
  try {
    const { email, password } = req.body
    
    // Make sure password and email are provided in the form
    if (!email || !password) {
      req.session.flash = { type: 'danger', text: 'Provide both email and password' }
      return res.redirect('/login')
    }
    
    // Make sure email exists in the database
    const emailExists = await this.memberModel.emailUniqueCheck(email)

      if (!emailExists) {
      req.session.flash = { type: 'danger', text: 'Invalid credentials, login failed!' }
      return res.redirect('/login')
    }

    // Verify password matches
    const isAMatch = await this.memberModel.emailAndPasswordMatch(email, password)

    if(isAMatch) {
      // Store user info in session
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
