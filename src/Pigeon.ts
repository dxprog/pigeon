import { Dictionary } from './interfaces/common';
import { IRequestOptions } from './interfaces/IRequestOptions';
import { IResponse, IResponseFn } from './interfaces/IResponse';
import { cleanUrl } from './utils/Url';
import {
  ResourceMethod,
  ResourceMethodToHttpMethod } from './utils/RestliConstants';

export class Pigeon {
  private _defaultHeaders: Dictionary<string>;

  private _baseUrl: string;
  get baseUrl(): string {
    return this._baseUrl;
  }

  set baseUrl(value: string) {
    this._baseUrl = value;
  }

  constructor(baseUrl: string = '/') {
    this.baseUrl = baseUrl;
  }

  get(
    path: string,
    options?: IRequestOptions
  ) {
    return this._request(ResourceMethod.GET, path, undefined, options);
  }

  batchGet(
    path: string,
    options?: IRequestOptions
  ) {
    return this._request(ResourceMethod.BATCH_GET, path, undefined, options);
  }

  getAll(
    path: string,
    options?: IRequestOptions
  ) {
    return this._request(ResourceMethod.GET_ALL, path, undefined, options);
  }

  finder(
    path: string,
    options?: IRequestOptions
  ) {
    return this._request(ResourceMethod.FINDER, path, undefined, options);
  }

  create(
    path: string,
    data: any,
    options?: IRequestOptions
  ) {
    return this._request(ResourceMethod.CREATE, path, data, options);
  }

  batchCreate(
    path: string,
    data: any,
    options?: IRequestOptions
  ) {
    return this._request(ResourceMethod.BATCH_CREATE, path, data, options);
  }

  update(
    path: string,
    data: any,
    options?: IRequestOptions
  ) {
    return this._request(ResourceMethod.UPDATE, path, data, options);
  }

  batchUpdate(
    path: string,
    data: any,
    options?: IRequestOptions
  ) {
    return this._request(ResourceMethod.BATCH_UPDATE, path, data, options);
  }

  batchPartialUpdate(
    path: string,
    data: any,
    options?: IRequestOptions
  ) {
    return this._request(ResourceMethod.BATCH_PARTIAL_UPDATE, path, data, options);
  }

  delete(
    path: string,
    data: any,
    options?: IRequestOptions
  ) {
    return this._request(ResourceMethod.DELETE, path, data, options);
  }

  batchDelete(
    path: string,
    data: any,
    options?: IRequestOptions
  ) {
    return this._request(ResourceMethod.BATCH_DELETE, path, data, options);
  }

  action(
    path: string,
    data: any,
    options?: IRequestOptions
  ) {
    return this._request(ResourceMethod.ACTION, path, data, options);
  }

  /**
   * Internal wrapper for the named method calls
   */
  _request(
    method: ResourceMethod,
    path: string,
    data?: any,
    options?: IRequestOptions
  ) {
    return this.request(
      method,
      cleanUrl(`${this.baseUrl}/${path}`),
      Object.assign({}, options, { data })
    );
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
    options?: IRequestOptions
  ): Promise<IResponse> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      if (!(method in ResourceMethodToHttpMethod)) {
        reject(new Error(`"${method}" is not a valid restli method`));
      }
      const httpMethod = ResourceMethodToHttpMethod[method];

      xhr.open(httpMethod, url, true);
      xhr.setRequestHeader('X-Restli-Method', method);
      xhr.onreadystatechange = () => this._xhrReadyState(xhr, resolve, reject);

      let data;
      if (options && options.data) {
        data = new FormData();
        for (let i in options.data) {
          data.append(i, options.data[i]);
        }
      }

      xhr.send(data);
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