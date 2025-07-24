import axios, { AxiosInstance, AxiosError } from 'axios';
import { ZuriPayError } from './utils/errors';
import { Transactions } from './api/transactions';
import { Customers } from './api/customers';
import { Payouts } from './api/payouts';
import { Callbacks } from './api/callbacks';
import { PaymentLinks } from './api/paymentLinks';
import { Wallets } from './api/wallets';
import { ZuriPayErrorResponse } from './types/interfaces';

interface ZuriPayOptions {
  baseURL?: string;
  headers?: Record<string, string>;
}

export class ZuriPay {
  private httpClient: AxiosInstance;
  public transactions: Transactions;
  public customers: Customers;
  public payouts: Payouts;
  public callbacks: Callbacks;
  public paymentLinks: PaymentLinks;
  public wallets: Wallets;

  constructor(apiKey: string, options?: ZuriPayOptions) {
    this.httpClient = axios.create({
      baseURL: options?.baseURL || 'https://api.zuripay.app/v1',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        ...options?.headers
      }
    });

    this.httpClient.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          const data = error.response.data as ZuriPayErrorResponse;
          const message = data?.message || data?.error?.message || 'An unknown error occurred';
          const result = data?.result || 'error';
          throw new ZuriPayError(message, error.response.status, result);
        }
        throw error;
      }
    );

    this.transactions = new Transactions(this.httpClient);
    this.customers = new Customers(this.httpClient);
    this.payouts = new Payouts(this.httpClient);
    this.callbacks = new Callbacks(this.httpClient);
    this.paymentLinks = new PaymentLinks(this.httpClient);
    this.wallets = new Wallets(this.httpClient);
  }
}