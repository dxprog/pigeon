import { IRequestOptions } from './interfaces/IRequestOptions';
import { IResponse, IResponseFn } from './interfaces/IResponse';
import { cleanUrl } from './utils/Url';

export class Pigeon {
  public baseUrl: string;

  constructor(baseUrl: string = '/') {
    this.baseUrl = baseUrl;
  }

  get(
    path: string, 
    options: IRequestOptions | null = null
  ) {
    return this._request('GET', path, options);
  }

  batchGet(
    path: string, 
    options: IRequestOptions | null = null
  ) {

  }

  getAll(
    path: string, 
    options: IRequestOptions | null = null
  ) {

  }

  finder(
    path: string, 
    options: IRequestOptions | null = null
  ) {

  }

  create(
    path: string, 
    data: any, 
    options: IRequestOptions | null = null
  ) {
    return this._request('POST', path, options);
  }

  batchCreate(
    path: string, 
    data: any, 
    options: IRequestOptions | null = null
  ) {

  }

  update(
    path: string, 
    data: any, 
    options: IRequestOptions | null = null
  ) {

  }

  batchUpdate(
    path: string, 
    data: any, 
    options: IRequestOptions | null = null
  ) {

  }

  batchPartialUpdate(
    path: string, 
    data: any, 
    options: IRequestOptions | null = null
  ) {

  }

  delete(
    path: string, 
    data: any, 
    options: IRequestOptions | null = null
  ) {

  }

  batchDelete(
    path: string, 
    data: any, 
    options: IRequestOptions | null = null
  ) {
    
  }

  action(
    path: string, 
    data: any, 
    options: IRequestOptions | null = null
  ) {

  }

  private _request(
    method: string, 
    url: string, 
    options: IRequestOptions | null = null
  ): Promise<IResponse> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      url = cleanUrl(url);
      xhr.open(method, url, true);
      xhr.onreadystatechange = () => this._xhrReadyState(xhr, resolve, reject);
      xhr.send();
    });
  }

  private _xhrReadyState(
    xhr: XMLHttpRequest,
    resolve: Function, 
    reject: Function
  ): void {
    switch (xhr.readyState) {
      case XMLHttpRequest.DONE:
        this._xhrParseResponse(xhr)
          .then((response: IResponse) => resolve(response))
          .catch(reject);
        break;
      default:
        break;
    }
  }

  private _xhrParseResponse(
    xhr: XMLHttpRequest
  ): Promise<IResponse> {
    return new Promise((resolve, reject) => {
      if (xhr.status && xhr.status >= 200 && xhr.status < 300) {
        let jsonResponse: string;
        try {
          jsonResponse = JSON.parse(xhr.responseText);
        } catch (err) {
          reject(err);
          return;
        }
        
        resolve({
          xhr,
          httpStatus: xhr.status,
          response: jsonResponse
        });
      } else {
        reject({
          xhr
        });
      }
    });
  }
}