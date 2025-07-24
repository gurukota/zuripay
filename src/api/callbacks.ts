import { AxiosInstance } from 'axios';
import { validateRequired, validateType } from '../utils/validation';
import {
  CreateCallbackOptions,
  CreateCallbackResponse,
  ListCallbacksResponse,
  GetCallbackResponse,
  UpdateCallbackOptions,
  UpdateCallbackResponse,
  DeleteCallbackResponse,
} from '../types/interfaces';

export class Callbacks {
  private httpClient: AxiosInstance;

  constructor(httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  async createCallback(options: CreateCallbackOptions): Promise<CreateCallbackResponse> {
    try {
      validateRequired(options.url, 'url');
      validateType(options.url, 'url', 'string');
      validateRequired(options.events, 'events');
      validateType(options.events, 'events', 'string');
      if (options.description) validateType(options.description, 'description', 'string');

      const response = await this.httpClient.post('/callback', options);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async listCallbacks(params: { limit?: number, skip?: number } = {}): Promise<ListCallbacksResponse> {
    try {
      if (params.limit) validateType(params.limit, 'limit', 'number');
      if (params.skip) validateType(params.skip, 'skip', 'number');

      const response = await this.httpClient.get('/callback/list', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getCallback(callback_id: string): Promise<GetCallbackResponse> {
    try {
      validateRequired(callback_id, 'callback_id');
      validateType(callback_id, 'callback_id', 'string');

      const response = await this.httpClient.get(`/callback/fetch/${callback_id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateCallback(callback_id: string, options: UpdateCallbackOptions): Promise<UpdateCallbackResponse> {
    try {
      validateRequired(callback_id, 'callback_id');
      validateType(callback_id, 'callback_id', 'string');
      if (options.url) validateType(options.url, 'url', 'string');
      if (options.description) validateType(options.description, 'description', 'string');
      if (options.events) validateType(options.events, 'events', 'string');
      if (options.is_active !== undefined) validateType(options.is_active, 'is_active', 'boolean');

      const response = await this.httpClient.put(`/callback/update/${callback_id}`, options);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteCallback(callback_id: string): Promise<DeleteCallbackResponse> {
    try {
      validateRequired(callback_id, 'callback_id');
      validateType(callback_id, 'callback_id', 'string');

      const response = await this.httpClient.delete(`/callback/delete/${callback_id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
