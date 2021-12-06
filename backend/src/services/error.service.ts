export class ExpressError extends Error {
  constructor(public customMessage: string, public statusCode: number) {
    super();
  }
}
