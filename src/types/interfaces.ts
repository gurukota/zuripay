

export interface InitiatePaymentOptions {
  amount: number;
  email: string;
  currency: string;
  mobile_money_number?: string;
  transaction_reference?: string;
  success_url?: string;
  failure_url?: string;
  payment_method_type?: string;
  payment_method_code?: string;
  requested_response?: string;
}

export interface ZuriPayErrorResponse {
  result: string;
  message: string;
  error?: { // Optional error object for more detailed errors
    type: string;
    message: string;
  };
}

export interface Email {
  email_address: string;
  is_primary?: boolean;
  is_verified?: boolean;
}

export interface Phone {
  phone_number: string;
  is_primary?: boolean;
  is_verified?: boolean;
}

export interface Identification {
  id_type: string;
  id_number: string;
  issuing_country?: string;
  expiry_date?: string;
  document_link?: string;
}

export interface CreateCustomerOptions {
  first_name: string;
  last_name: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  emails?: Email[];
  phones?: Phone[];
  customer_reference?: string;
  identification?: Identification[];
}

export interface UpdateCustomerOptions {
  first_name?: string;
  last_name?: string;
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  emails?: Email[];
  phones?: Phone[];
  customer_reference?: string;
  identification?: Identification[];
}

export interface CreateCallbackOptions {
  url: string;
  events: string;
  description?: string;
}

export interface UpdateCallbackOptions {
  url?: string;
  description?: string;
  events?: string;
  is_active?: boolean;
}

export interface CreatePaymentLinkOptions {
  amount: number;
  currency: string;
}

export interface UpdatePaymentLinkOptions {
  payment_link_id: string;
  amount?: number;
  currency?: string;
  status?: string;
}

export interface CreateWalletOptions {
  currency: string;
  country: string;
}

// Response Interfaces
export interface InitiatePaymentResponse {
  result: string;
  transaction_id: string;
  transaction_reference: string;
  message: string;
  hosted_url?: string;
  checkout_id?: string;
  amount?: string;
  currency?: string;
  status?: string;
  text_message?: string;
  qr_code?: string;
  code?: string;
}

export interface VerifyPaymentResponse {
  result: string;
  transaction_id: string;
  transaction_reference: string;
  amount: string;
  charges: string;
  total: string;
  currency: string;
  payment_method_name: string;
  payment_method_code: string;
  payment_method_type: string;
  message: string;
  details: any;
  account_number?: string;
}

export interface ListTransactionsResponse {
  result: string;
  transactions: any[]; // Define a more specific interface for Transaction object if needed
  message: string;
}

export interface GetTransactionResponse {
  result: string;
  transaction: any; // Define a more specific interface for Transaction object if needed
  message: string;
}

export interface CreateCustomerResponse {
  result: string;
  customer_id: string;
  customer_reference: string;
  message: string;
}

export interface ListCustomersResponse {
  result: string;
  customers: any[]; // Define a more specific interface for Customer object if needed
  total_count: number;
  message: string;
}

export interface GetCustomerResponse {
  result: string;
  customer: any; // Define a more specific interface for Customer object if needed
}

export interface UpdateCustomerResponse {
  result: string;
  customer_id: string;
  customer_reference: string;
  message: string;
}

export interface InitiatePayoutResponse {
  result: string;
  payout_request_id: string;
  message: string;
}

export interface GetPayoutResponse {
  result: string;
  payout_request: any; // Define a more specific interface for PayoutRequest object if needed
}

export interface ListPayoutsResponse {
  result: string;
  payout_requests: any[]; // Define a more specific interface for PayoutRequest object if needed
  total_count: number;
  message: string;
}

export interface UpdatePayoutResponse {
  result: string;
  payout_request_id: string;
  status: string;
  message: string;
}

export interface DeletePayoutResponse {
  result: string;
  payout_request_id: string;
  message: string;
}

export interface CreateCallbackResponse {
  result: string;
  id: string;
  url: string;
  description: string;
  events: string;
  is_active: boolean;
  message: string;
}

export interface ListCallbacksResponse {
  result: string;
  callbacks: any[]; // Define a more specific interface for Callback object if needed
  total_count: number;
  message: string;
}

export interface GetCallbackResponse {
  result: string;
  callback: any; // Define a more specific interface for Callback object if needed
}

export interface UpdateCallbackResponse {
  result: string;
  id: string;
  message: string;
}

export interface DeleteCallbackResponse {
  result: string;
  id: string;
  message: string;
}

export interface CreatePaymentLinkResponse {
  result: string;
  payment_link_id: string;
  hosted_payment_link: string;
  message: string;
}

export interface ListPaymentLinksResponse {
  result: string;
  payment_links: any[]; // Define a more specific interface for PaymentLink object if needed
  message: string;
}

export interface GetPaymentLinkResponse {
  result: string;
  payment_link: any; // Define a more specific interface for PaymentLink object if needed
}

export interface UpdatePaymentLinkResponse {
  result: string;
  payment_link_id: string;
  amount: string;
  currency: string;
  status: string;
  message: string;
}

export interface DeletePaymentLinkResponse {
  result: string;
  payment_link_id: string;
  message: string;
}

export interface CreateWalletResponse {
  result: string;
  wallet_id: string;
  message: string;
}

export interface ListWalletsResponse {
  result: string;
  wallets: any[]; // Define a more specific interface for Wallet object if needed
  message: string;
}

export interface GetWalletResponse {
  result: string;
  wallet: any; // Define a more specific interface for Wallet object if needed
}

export interface GetWalletBalanceResponse {
  result: string;
  balance: string;
  currency: string;
  message: string;
}

export interface DeleteWalletResponse {
  result: string;
  wallet_id: string;
  message: string;
}
