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
  return '';
}

export function encodeQueryStringList(list: Array<any>): string {
  return '';
}

export function encodeQueryStringObject(obj: Dictionary<any>): string {
  return '';
}