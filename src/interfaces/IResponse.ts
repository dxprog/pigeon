export interface IResponse {
  xhr: XMLHttpRequest;
  httpStatus?: number;
  response?: any;
  error?: any;
}

export type IResponseFn = () => IResponse;