export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message);
    Object.defineProperty(this, "name", { value: "AppError" });
  }
}
