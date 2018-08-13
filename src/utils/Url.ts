import { Dictionary } from '../interfaces/common';

/**
 * Cleans superfluous forward slashes out of a URL
 * 
 * @param url The URL to clean
 */
export function cleanUrl(url: string): string {
  let previousToken: string = '';
  return url
    .split('')
    .filter((token, index) => {
      const retVal = index < 2 || !(token === '/' && previousToken === '/');
      previousToken = token;
      return retVal;
    })
    .join('');
}

/**
 * Takes a dictionary of query string arguments and returns a full
 * query string with all arguments properly encoded for Rest.li.
 */
export function encodeRestLiQueryString(queryStringParameters: Dictionary<any>): string {
  const encodedParameters: Array<string> = Object
    .keys(queryStringParameters)
    .map((key: string) => {
      let value: any = queryStringParameters[key];
      console.log(key, value);
      if (Array.isArray(value)) {
        value = encodeQueryStringList(value);
      } else if (typeof value === 'object') {
        value = encodeQueryStringObject(key, value);
      }
      return `${key}=${value}`;
    });

  return encodedParameters.join('&');
}

/**
 * Encodes a list of items for a Rest.li request query string
 * 
 * @param list The list to encode
 */
export function encodeQueryStringList(list: Array<any>): string {
  return `List(${list.map(encodeURIComponent).join(',')})`;
}

export function encodeQueryStringObject(keyName: string, obj: Dictionary<any>): string {
  const encodedParameters: Array<string> = Object.keys(obj).map(key => {
    let value = obj[key];
    if (Array.isArray(value)) {
      value = encodeQueryStringList(value);
    } else if (typeof value === 'object') {
      value = encodeQueryStringObject(key, value);
    } else {
      value = `${key}:${encodeURIComponent(value)}`;
    }
    return `(${value})`;
  });

  return `(${keyName}:${encodedParameters.join(',')})`;
}