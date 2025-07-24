import { AxiosInstance } from 'axios';
import { validateRequired, validateType } from '../utils/validation';
import {
  CreateCustomerOptions,
  CreateCustomerResponse,
  ListCustomersResponse,
  GetCustomerResponse,
  UpdateCustomerOptions,
  UpdateCustomerResponse,
} from '../types/interfaces';

export class Customers {
  private httpClient: AxiosInstance;

  constructor(httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  async createCustomer(options: CreateCustomerOptions): Promise<CreateCustomerResponse> {
    try {
      validateRequired(options.first_name, 'first_name');
      validateType(options.first_name, 'first_name', 'string');
      validateRequired(options.last_name, 'last_name');
      validateType(options.last_name, 'last_name', 'string');
      validateRequired(options.street, 'street');
      validateType(options.street, 'street', 'string');
      validateRequired(options.city, 'city');
      validateType(options.city, 'city', 'string');
      validateRequired(options.state, 'state');
      validateType(options.state, 'state', 'string');
      validateRequired(options.country, 'country');
      validateType(options.country, 'country', 'string');
      validateRequired(options.postal_code, 'postal_code');
      validateType(options.postal_code, 'postal_code', 'string');

      if (!options.emails && !options.phones) {
        throw new Error('At least one contact method (email or phone) is required.');
      }

      if (options.emails) {
        options.emails.forEach((email, index) => {
          validateRequired(email.email_address, `emails[${index}].email_address`);
          validateType(email.email_address, `emails[${index}].email_address`, 'string');
          if (email.is_primary !== undefined) validateType(email.is_primary, `emails[${index}].is_primary`, 'boolean');
          if (email.is_verified !== undefined) validateType(email.is_verified, `emails[${index}].is_verified`, 'boolean');
        });
      }

      if (options.phones) {
        options.phones.forEach((phone, index) => {
          validateRequired(phone.phone_number, `phones[${index}].phone_number`);
          validateType(phone.phone_number, `phones[${index}].phone_number`, 'string');
          if (phone.is_primary !== undefined) validateType(phone.is_primary, `phones[${index}].is_primary`, 'boolean');
          if (phone.is_verified !== undefined) validateType(phone.is_verified, `phones[${index}].is_verified`, 'boolean');
        });
      }

      if (options.identification) {
        options.identification.forEach((id, index) => {
          validateRequired(id.id_type, `identification[${index}].id_type`);
          validateType(id.id_type, `identification[${index}].id_type`, 'string');
          validateRequired(id.id_number, `identification[${index}].id_number`);
          validateType(id.id_number, `identification[${index}].id_number`, 'string');
          if (id.issuing_country !== undefined) validateType(id.issuing_country, `identification[${index}].issuing_country`, 'string');
          if (id.expiry_date !== undefined) validateType(id.expiry_date, `identification[${index}].expiry_date`, 'string');
          if (id.document_link !== undefined) validateType(id.document_link, `identification[${index}].document_link`, 'string');
        });
      }

      const response = await this.httpClient.post('/customer', options);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async listCustomers(params: { limit?: number, skip?: number } = {}): Promise<ListCustomersResponse> {
    try {
      if (params.limit) validateType(params.limit, 'limit', 'number');
      if (params.skip) validateType(params.skip, 'skip', 'number');

      const response = await this.httpClient.get('/customer/list', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getCustomer(customerIdOrReference: string): Promise<GetCustomerResponse> {
    try {
      validateRequired(customerIdOrReference, 'customerIdOrReference');
      validateType(customerIdOrReference, 'customerIdOrReference', 'string');

      const response = await this.httpClient.get(`/customer/fetch/${customerIdOrReference}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateCustomer(customerIdOrReference: string, options: UpdateCustomerOptions): Promise<UpdateCustomerResponse> {
    try {
      validateRequired(customerIdOrReference, 'customerIdOrReference');
      validateType(customerIdOrReference, 'customerIdOrReference', 'string');

      if (options.first_name) validateType(options.first_name, 'first_name', 'string');
      if (options.last_name) validateType(options.last_name, 'last_name', 'string');
      if (options.street) validateType(options.street, 'street', 'string');
      if (options.city) validateType(options.city, 'city', 'string');
      if (options.state) validateType(options.state, 'state', 'string');
      if (options.country) validateType(options.country, 'country', 'string');
      if (options.postal_code) validateType(options.postal_code, 'postal_code', 'string');
      if (options.customer_reference) validateType(options.customer_reference, 'customer_reference', 'string');

      if (options.emails) {
        options.emails.forEach((email, index) => {
          validateRequired(email.email_address, `emails[${index}].email_address`);
          validateType(email.email_address, `emails[${index}].email_address`, 'string');
          if (email.is_primary !== undefined) validateType(email.is_primary, `emails[${index}].is_primary`, 'boolean');
        });
      }

      if (options.phones) {
        options.phones.forEach((phone, index) => {
          validateRequired(phone.phone_number, `phones[${index}].phone_number`);
          validateType(phone.phone_number, `phones[${index}].phone_number`, 'string');
          if (phone.is_primary !== undefined) validateType(phone.is_primary, `phones[${index}].is_primary`, 'boolean');
        });
      }

      if (options.identification) {
        options.identification.forEach((id, index) => {
          validateRequired(id.id_type, `identification[${index}].id_type`);
          validateType(id.id_type, `identification[${index}].id_type`, 'string');
          validateRequired(id.id_number, `identification[${index}].id_number`);
          validateType(id.id_number, `identification[${index}].id_number`, 'string');
          if (id.issuing_country !== undefined) validateType(id.issuing_country, `identification[${index}].issuing_country`, 'string');
          if (id.expiry_date !== undefined) validateType(id.expiry_date, `identification[${index}].expiry_date`, 'string');
        });
      }

      const response = await this.httpClient.put(`/customer/update/${customerIdOrReference}`, options);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
