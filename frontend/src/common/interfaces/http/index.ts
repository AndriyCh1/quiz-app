import { ContentType, HttpMethod } from '../../enums';

export interface IHttpOptions {
  method?: keyof typeof HttpMethod;
  contentType?: typeof ContentType[keyof typeof ContentType];
  payload?: any | null;
  hasAuth?: boolean;
  withCredentials?: boolean;
  headers?: { [key: string]: string };
}
