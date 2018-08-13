import { IRequestOptions } from './interfaces/IRequestOptions';
import { IResponse, IResponseFn } from './interfaces/IResponse';
import { cleanUrl } from './utils/Url';
import { 
  ResourceMethod,
  ResourceMethodToHttpMethod } from './utils/RestliConstants';

export class Pigeon {
  public baseUrl: string;

  constructor(baseUrl: string = '/') {
    this.baseUrl = baseUrl;
  }

  get(
    path: string, 
    options: IRequestOptions | null = null
  ) {
    return this.request(
      ResourceMethod.GET, 
      cleanUrl(`${this.baseUrl}/${path}`),
      options
    );
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
    return this.request(ResourceMethod.CREATE, path, options);
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

  /**
   * Creates and fires a Rest.li API call
   * 
   * @param method The Rest.li resource method to perform
   * @param url The URL of the API endpoint
   * @param options Options for the Rest.li call
   */
  request(
    method: ResourceMethod, 
    url: string, 
    options: IRequestOptions | null = null
  ): Promise<IResponse> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      if (!(method in ResourceMethodToHttpMethod)) {
        reject(new Error(`"${method}" is not a valid restli method`));
      }
      const httpMethod = ResourceMethodToHttpMethod[method];
      
      xhr.open(httpMethod, url, true);
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
          .catch((...args: any[]) => reject(...args));
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