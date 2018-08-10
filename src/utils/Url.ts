/**
 * Cleans superfluous forward slashes out of a URL
 * 
 * @param url The URL to clean
 */
export function cleanUrl(url: string): string {
  return url
    .split('/')
    .filter(token => !!token.length)
    .join('/');
}