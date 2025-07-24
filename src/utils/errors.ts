export class ZuriPayError extends Error {
  public readonly statusCode: number;
  public readonly result: string;

  constructor(message: string, statusCode: number, result: string = 'error') {
    super(message);
    this.name = 'ZuriPayError';
    this.statusCode = statusCode;
    this.result = result;

    Object.setPrototypeOf(this, ZuriPayError.prototype);
  }
}
