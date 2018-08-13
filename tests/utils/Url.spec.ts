import { expect } from 'chai';
import 'mocha';

import { cleanUrl } from '../../src/utils/Url';

describe('Url utils', () => {
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