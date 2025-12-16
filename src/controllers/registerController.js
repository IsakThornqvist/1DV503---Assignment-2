/**
 * Encapsulates a controller.
 */
export class RegisterController {
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



/*   registerMember (req, res, next) {

    const { firstName, lastName, address, city, zipCode, phoneNumber, email, password } = req.body



  } */
}