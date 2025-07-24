import { AxiosInstance } from 'axios';
import { validateRequired, validateType } from '../utils/validation';
import {
  CreatePaymentLinkOptions,
  CreatePaymentLinkResponse,
  ListPaymentLinksResponse,
  GetPaymentLinkResponse,
  UpdatePaymentLinkOptions,
  UpdatePaymentLinkResponse,
  DeletePaymentLinkResponse,
} from '../types/interfaces';

export class PaymentLinks {
  private httpClient: AxiosInstance;

  constructor(httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  async createPaymentLink(options: CreatePaymentLinkOptions): Promise<CreatePaymentLinkResponse> {
    try {
      validateRequired(options.amount, 'amount');
      validateType(options.amount, 'amount', 'number');
      validateRequired(options.currency, 'currency');
      validateType(options.currency, 'currency', 'string');

      const response = await this.httpClient.post('/links', options);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async listPaymentLinks(params: { start_date?: string, end_date?: string, limit?: number } = {}): Promise<ListPaymentLinksResponse> {
    try {
      if (params.start_date) validateType(params.start_date, 'start_date', 'string');
      if (params.end_date) validateType(params.end_date, 'end_date', 'string');
      if (params.limit) validateType(params.limit, 'limit', 'number');

      const response = await this.httpClient.get('/links/list', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getPaymentLink(payment_link_id: string): Promise<GetPaymentLinkResponse> {
    try {
      validateRequired(payment_link_id, 'payment_link_id');
      validateType(payment_link_id, 'payment_link_id', 'string');

      const response = await this.httpClient.get('/links/fetch', { params: { payment_link_id } });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updatePaymentLink(options: UpdatePaymentLinkOptions): Promise<UpdatePaymentLinkResponse> {
    try {
      validateRequired(options.payment_link_id, 'payment_link_id');
      validateType(options.payment_link_id, 'payment_link_id', 'string');
      if (options.amount) validateType(options.amount, 'amount', 'number');
      if (options.currency) validateType(options.currency, 'currency', 'string');
      if (options.status) validateType(options.status, 'status', 'string');

      const response = await this.httpClient.put('/links/update', options);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deletePaymentLink(payment_link_id: string): Promise<DeletePaymentLinkResponse> {
    try {
      validateRequired(payment_link_id, 'payment_link_id');
      validateType(payment_link_id, 'payment_link_id', 'string');

      const response = await this.httpClient.delete('/links/delete', { data: { payment_link_id } });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
