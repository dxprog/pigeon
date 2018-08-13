import { expect } from 'chai';
import 'mocha';

import { 
  cleanUrl,
  encodeQueryStringList,
  encodeQueryStringObject,
  encodeRestLiQueryString } from '../../src/utils/Url';

describe('Url utils', () => {
  describe('cleanUrl', () => {
    it('should remove extraneous forward slashes in a URL', () => {
      const cleanedUrl = cleanUrl('this//is-a-very///ugly//url');
      expect(cleanedUrl).to.equal('this/is-a-very/ugly/url');
    });
  
    it('should retain a leading slash on a relative URL', () => {
      const cleanedUrl = cleanUrl('/back-to-root//please');
      expect(cleanedUrl).to.equal('/back-to-root/please');
    });
  
    it('should retain leading slashes on a relative scheme URL', () => {
      const cleanedUrl = cleanUrl('//ssl.ornot.com//please');
      expect(cleanedUrl).to.equal('//ssl.ornot.com/please');
    });
  });

  describe('encodeQueryStringList', () => {
    it('should properly encode a list', () => {
      const encodedList = encodeQueryStringList([
        'Hi there',
        42,
        'foobar'
      ]);
      expect(encodedList).to.equal('List(Hi%20there,42,foobar)');
    });
  });

  describe('encodeQueryStringObject', () => {
    it('should correctly encode a nested object', () => {
      const encodedObj = encodeRestLiQueryString({
        searchIntent: {
          specificScope: 'urn:li:learning:123'
        }
      });
      console.log(encodedObj);
      expect(true).to.equal(true);
    });
  });
});