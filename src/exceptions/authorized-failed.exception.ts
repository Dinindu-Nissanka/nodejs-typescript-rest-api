import HttpException from './http.exception';

class AuthorizationFailedException extends HttpException {
  constructor(errors?: Array<string>) {
    super(403, `Authorization failed`, errors);
  }
}

export default AuthorizationFailedException;
