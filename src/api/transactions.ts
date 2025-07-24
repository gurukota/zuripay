import { AxiosInstance } from 'axios';
import { validateRequired, validateType } from '../utils/validation';
import {
  InitiatePaymentOptions,
  InitiatePaymentResponse,
  VerifyPaymentResponse,
  ListTransactionsResponse,
  GetTransactionResponse,
} from '../types/interfaces';

export class Transactions {
  private httpClient: AxiosInstance;

  constructor(httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  async initiatePayment(options: InitiatePaymentOptions): Promise<InitiatePaymentResponse> {
    try {
      validateRequired(options.amount, 'amount');
      validateType(options.amount, 'amount', 'number');
      validateRequired(options.email, 'email');
      validateType(options.email, 'email', 'string');
      validateRequired(options.currency, 'currency');
      validateType(options.currency, 'currency', 'string');

      const response = await this.httpClient.post('/transactions', options);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async verifyPayment(params: { transaction_reference?: string, transaction_id?: string, checkout_id?: string, code?: string, requested_response?: string }): Promise<VerifyPaymentResponse> {
    try {
      if (!params.transaction_reference && !params.transaction_id && !params.checkout_id) {
        throw new Error('One of transaction_reference, transaction_id, or checkout_id is required.');
      }
      if (params.transaction_reference) validateType(params.transaction_reference, 'transaction_reference', 'string');
      if (params.transaction_id) validateType(params.transaction_id, 'transaction_id', 'string');
      if (params.checkout_id) validateType(params.checkout_id, 'checkout_id', 'string');
      if (params.code) validateType(params.code, 'code', 'string');
      if (params.requested_response) validateType(params.requested_response, 'requested_response', 'string');

      const response = await this.httpClient.get('/transactions/verify', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async listTransactions(params: { start_date?: string, end_date?: string, limit?: number } = {}): Promise<ListTransactionsResponse> {
    try {
      if (params.start_date) validateType(params.start_date, 'start_date', 'string');
      if (params.end_date) validateType(params.end_date, 'end_date', 'string');
      if (params.limit) validateType(params.limit, 'limit', 'number');

      const response = await this.httpClient.get('/transactions/list', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getTransaction(params: { transaction_reference?: string, transaction_id?: string }): Promise<GetTransactionResponse> {
    try {
      if (!params.transaction_reference && !params.transaction_id) {
        throw new Error('One of transaction_reference or transaction_id is required.');
      }
      if (params.transaction_reference) validateType(params.transaction_reference, 'transaction_reference', 'string');
      if (params.transaction_id) validateType(params.transaction_id, 'transaction_id', 'string');

      const response = await this.httpClient.get('/transactions/fetch', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
