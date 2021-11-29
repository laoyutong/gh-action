export interface BaseOptions {
  token?: string;
}

export interface DetailOptions extends BaseOptions {
  description?: string;
  private?: boolean;
}

export type NameType = { name: string };

export type CreateConfig = DetailOptions & NameType;

export type DeleteConfig = BaseOptions & NameType;

export type HandleActionCallback = (token?: string) => void;

export interface ErrorType {
  message: string;
}
