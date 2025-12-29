# 1DV503---Assignment-2

# Notes to Self

## Register New Member flow

- Frontend form submits a **POST** request with user input data.
- `RegisterController.registerNewMember` method handles the request.
- Form input values are extracted from `req.body` into variables that correspond to each form field.
- Controller performs validation:
  - All required fields are filled.
  - Password and confirmation password match.
  - Password meets minimum length requirements.
  - Email is unique by calling `emailUniqueCheck` in `MemberModel`.
- If validation fails:
  - An error message is set.
  - User is redirected back to the registration page.
- If validation passes:
  - Password is hashed securely using **bcrypt**.
  - `MemberModel.createMember` inserts the new member data (including hashed password) into the database.
  - Database returns the new user's ID (`insertId`).
- Controller sets a success message in the session.
- User is redirected to the login page to sign in.

 