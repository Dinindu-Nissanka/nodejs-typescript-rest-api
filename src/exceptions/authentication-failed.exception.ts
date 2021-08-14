import HttpException from './http.exception';

class AuthenticationFailedException extends HttpException {
  constructor(errors?: Array<string>) {
    super(401, `Authentication failed`, errors);
  }
}

export default AuthenticationFailedException;
