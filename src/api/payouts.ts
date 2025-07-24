import { AxiosInstance } from 'axios';
import { validateRequired, validateType } from '../utils/validation';
import {
  InitiatePayoutResponse,
  GetPayoutResponse,
  ListPayoutsResponse,
  UpdatePayoutResponse,
  DeletePayoutResponse,
} from '../types/interfaces';

export class Payouts {
  private httpClient: AxiosInstance;

  constructor(httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  async initiatePayout(customer_id: string, withdrawal_method_code: string, amount: number, currency: string): Promise<InitiatePayoutResponse> {
    try {
      validateRequired(customer_id, 'customer_id');
      validateType(customer_id, 'customer_id', 'string');
      validateRequired(withdrawal_method_code, 'withdrawal_method_code');
      validateType(withdrawal_method_code, 'withdrawal_method_code', 'string');
      validateRequired(amount, 'amount');
      validateType(amount, 'amount', 'number');
      validateRequired(currency, 'currency');
      validateType(currency, 'currency', 'string');

      const response = await this.httpClient.post('/payout/request', {
        customer_id,
        withdrawal_method_code,
        amount,
        currency
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getPayout(payout_request_id: string): Promise<GetPayoutResponse> {
    try {
      validateRequired(payout_request_id, 'payout_request_id');
      validateType(payout_request_id, 'payout_request_id', 'string');

      const response = await this.httpClient.get(`/payout/request/fetch/${payout_request_id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async listPayouts(params: { start_date?: string, end_date?: string, limit?: number, skip?: number } = {}): Promise<ListPayoutsResponse> {
    try {
      if (params.start_date) validateType(params.start_date, 'start_date', 'string');
      if (params.end_date) validateType(params.end_date, 'end_date', 'string');
      if (params.limit) validateType(params.limit, 'limit', 'number');
      if (params.skip) validateType(params.skip, 'skip', 'number');

      const response = await this.httpClient.get('/payout/request/list', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updatePayout(payout_request_id: string, status: string): Promise<UpdatePayoutResponse> {
    try {
      validateRequired(payout_request_id, 'payout_request_id');
      validateType(payout_request_id, 'payout_request_id', 'string');
      validateRequired(status, 'status');
      validateType(status, 'status', 'string');

      const response = await this.httpClient.put(`/payout/request/update?payout_request_id=${payout_request_id}`, { status });
      return response.data;
    }  catch (error) {
      throw error;
    }
  }

  async deletePayout(payout_request_id: string): Promise<DeletePayoutResponse> {
    try {
      validateRequired(payout_request_id, 'payout_request_id');
      validateType(payout_request_id, 'payout_request_id', 'string');

      const response = await this.httpClient.delete(`/payout/request/delete?payout_request_id=${payout_request_id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
