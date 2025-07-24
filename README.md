# ZuriPay Node.js SDK

This is the official **TypeScript** Node.js SDK for the ZuriPay payment gateway.

  ## Table of Contents

  - [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
  - [Transactions](#transactions)
  - [Customers](#customers)
  - [Payouts](#payouts)
  - [Callbacks](#callbacks)
  - [Payment Links](#payment-links)
  - [Wallets](#wallets)
- [Contributing](#contributing)
- [License](#license)

## Installation

```bash
npm install zuripay
```

## Usage

```javascript
import { ZuriPay } from 'zuripay';

const zuriPay = new ZuriPay('YOUR_API_KEY');
```

## API Reference

### Transactions

#### Initiate a payment

```javascript
const paymentResponse = await zuriPay.transactions.initiatePayment({
  amount: 1000,
  email: 'customer@example.com',
  currency: 'USD',
  transaction_reference: 'ZURIPAY1234567890',
  success_url: 'https://yourwebsite.com/success',
  failure_url: 'https://yourwebsite.com/failure'
});
```

#### Verify a payment

```javascript
const verifyResponse = await zuriPay.transactions.verifyPayment({ transaction_reference: 'TRANSACTION_REFERENCE' });
```

### Customers

#### Create a customer

```javascript
const customerResponse = await zuriPay.customers.createCustomer({
  first_name: 'John',
  last_name: 'Doe',
  street: '123 Main St',
  city: 'Harare',
  state: 'Harare',
  country: 'Zimbabwe',
  postal_code: '00263',
  emails: [{ email_address: 'john.doe@example.com', is_primary: true }],
  phones: [{ phone_number: '+263771234567', is_primary: true }]
});
```

#### List customers

```javascript
const listCustomersResponse = await zuriPay.customers.listCustomers({ limit: 10, skip: 0 });
```

#### Get a customer

```javascript
const getCustomerResponse = await zuriPay.customers.getCustomer('CUSTOMER_ID_OR_REFERENCE');
```

#### Update a customer

```javascript
const updateCustomerResponse = await zuriPay.customers.updateCustomer('CUSTOMER_ID_OR_REFERENCE', {
  first_name: 'Jane',
  emails: [{ email_address: 'jane.doe@example.com', is_primary: true }]
});
```

### Payouts

#### Initiate a payout

```javascript
const initiatePayoutResponse = await zuriPay.payouts.initiatePayout('CUSTOMER_ID', 'bank_transfer', 1000, 'USD');
```

#### List payouts

```javascript
const listPayoutsResponse = await zuriPay.payouts.listPayouts();
```

#### Get a payout

```javascript
const getPayoutResponse = await zuriPay.payouts.getPayout('PAYOUT_REQUEST_ID');
```

#### Update a payout

```javascript
const updatePayoutResponse = await zuriPay.payouts.updatePayout('PAYOUT_REQUEST_ID', 'approved');
```

#### Delete a payout

```javascript
const deletePayoutResponse = await zuriPay.payouts.deletePayout('PAYOUT_REQUEST_ID');
```

### Callbacks

#### Create a callback

```javascript
const createCallbackResponse = await zuriPay.callbacks.createCallback({
  url: 'https://example.com/webhooks/payments',
  description: 'Payment notification endpoint',
  events: 'payment.created,payment.updated,payment.completed'
});
```

#### List callbacks

```javascript
const listCallbacksResponse = await zuriPay.callbacks.listCallbacks({ limit: 10, skip: 0 });
```

#### Get a callback

```javascript
const getCallbackResponse = await zuriPay.callbacks.getCallback('CALLBACK_ID');
```

#### Update a callback

```javascript
const updateCallbackResponse = await zuriPay.callbacks.updateCallback('CALLBACK_ID', {
  url: 'https://example.com/webhooks/payments/v2',
  events: 'payment.created,payment.updated,payment.completed,payment.failed',
  is_active: true
});
```

#### Delete a callback

```javascript
const deleteCallbackResponse = await zuriPay.callbacks.deleteCallback('CALLBACK_ID');
```

### Payment Links

#### Create a payment link

```javascript
const createPaymentLinkResponse = await zuriPay.paymentLinks.createPaymentLink({
  amount: 100.00,
  currency: 'USD'
});
```

#### List payment links

```javascript
const listPaymentLinksResponse = await zuriPay.paymentLinks.listPaymentLinks({ limit: 10, start_date: '2023-01-01' });
```

#### Get a payment link

```javascript
const getPaymentLinkResponse = await zuriPay.paymentLinks.getPaymentLink('PAYMENT_LINK_ID');
```

#### Update a payment link

```javascript
const updatePaymentLinkResponse = await zuriPay.paymentLinks.updatePaymentLink({
  payment_link_id: 'PAYMENT_LINK_ID',
  amount: 150.00,
  status: 'inactive'
});
```

#### Delete a payment link

```javascript
const deletePaymentLinkResponse = await zuriPay.paymentLinks.deletePaymentLink('PAYMENT_LINK_ID');
```

### Wallets

#### Create a wallet

```javascript
const createWalletResponse = await zuriPay.wallets.createWallet({
  currency: 'USD',
  country: 'ZW'
});
```

#### List wallets

```javascript
const listWalletsResponse = await zuriPay.wallets.listWallets({ limit: 10, start_date: '2023-01-01' });
```

#### Get a wallet

```javascript
const getWalletResponse = await zuriPay.wallets.getWallet('WALLET_ID');
```

#### Get wallet balance

```javascript
const getWalletBalanceResponse = await zuriPay.wallets.getWalletBalance('USD');
```

#### Delete a wallet

```javascript
const deleteWalletResponse = await zuriPay.wallets.deleteWallet('WALLET_ID');
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.