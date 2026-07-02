export class AppError extends Error {
  constructor(
    message: string,
    public readonly status = 400,
    public readonly errors?: Record<string, string>
  ) {
    super(message);
  }
}

