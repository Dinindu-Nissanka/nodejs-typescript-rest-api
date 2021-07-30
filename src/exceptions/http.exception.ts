export default class HttpException extends Error {
  statusCode?: number;
  status?: number;
  message: string;
  errors: Array<string> | null;

  constructor(statusCode: number, message: string, errors?: Array<string>) {
    super(message);

    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors || null;
  }
}
