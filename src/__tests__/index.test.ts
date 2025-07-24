import { ZuriPay } from '../index';

describe('ZuriPay SDK', () => {
  it('should initialize with an API key', () => {
    const zuripay = new ZuriPay('test_api_key');
    expect(zuripay).toBeInstanceOf(ZuriPay);
  });

  it('should allow custom base URL', () => {
    const customBaseURL = 'https://api.custom.com';
    const zuripay = new ZuriPay('test_api_key', { baseURL: customBaseURL });
    // @ts-ignore - Accessing private property for testing purposes
    expect(zuripay.httpClient.defaults.baseURL).toBe(customBaseURL);
  });

  it('should allow custom headers', () => {
    const customHeaders = { 'X-Custom-Header': 'test' };
    const zuripay = new ZuriPay('test_api_key', { headers: customHeaders });
    // @ts-ignore - Accessing private property for testing purposes
    expect(zuripay.httpClient.defaults.headers['X-Custom-Header']).toBe('test');
  });
});
