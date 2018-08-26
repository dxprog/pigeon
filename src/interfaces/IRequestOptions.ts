import { Dictionary } from './common';

export interface IRequestOptions {
  headers: Dictionary<any>;
  queryString: Dictionary<any>;
  data?: Dictionary<any>;
}
