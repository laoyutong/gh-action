export interface Options {
  token?: string;
  description?: string;
  private?: boolean;
}

export type Config = Options & { name: string };

export interface ErrorType {
  message: string;
}
