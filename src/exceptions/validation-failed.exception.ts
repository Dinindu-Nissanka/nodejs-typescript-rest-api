import HttpException from './http.exception';

class ValidationFailedException extends HttpException {
  constructor(errors: Array<string>) {
    super(400, 'Validation failed', errors);
  }
}

export default ValidationFailedException;
