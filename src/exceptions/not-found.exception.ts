import HttpException from './http.exception';

class NotFoundException extends HttpException {
  constructor(message: string) {
    super(400, message);
  }
}

export default NotFoundException;
