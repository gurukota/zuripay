import { AxiosInstance } from 'axios';
import { validateRequired, validateType } from '../utils/validation';
import {
  CreateWalletOptions,
  CreateWalletResponse,
  ListWalletsResponse,
  GetWalletResponse,
  GetWalletBalanceResponse,
  DeleteWalletResponse,
} from '../types/interfaces';

export class Wallets {
  private httpClient: AxiosInstance;

  constructor(httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  async createWallet(options: CreateWalletOptions): Promise<CreateWalletResponse> {
    try {
      validateRequired(options.currency, 'currency');
      validateType(options.currency, 'currency', 'string');
      validateRequired(options.country, 'country');
      validateType(options.country, 'country', 'string');

      const response = await this.httpClient.post('/wallets', options);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async listWallets(params: { start_date?: string, end_date?: string, limit?: number } = {}): Promise<ListWalletsResponse> {
    try {
      if (params.start_date) validateType(params.start_date, 'start_date', 'string');
      if (params.end_date) validateType(params.end_date, 'end_date', 'string');
      if (params.limit) validateType(params.limit, 'limit', 'number');

      const response = await this.httpClient.get('/wallets/list', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getWallet(wallet_id: string): Promise<GetWalletResponse> {
    try {
      validateRequired(wallet_id, 'wallet_id');
      validateType(wallet_id, 'wallet_id', 'string');

      const response = await this.httpClient.get('/wallets/fetch', { params: { wallet_id } });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getWalletBalance(currency?: string): Promise<GetWalletBalanceResponse> {
    try {
      if (currency) validateType(currency, 'currency', 'string');

      const params = currency ? { currency } : {};
      const response = await this.httpClient.get('/wallets/balance', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteWallet(wallet_id: string): Promise<DeleteWalletResponse> {
    try {
      validateRequired(wallet_id, 'wallet_id');
      validateType(wallet_id, 'wallet_id', 'string');

      const response = await this.httpClient.delete('/wallets/delete', { data: { wallet_id } });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
