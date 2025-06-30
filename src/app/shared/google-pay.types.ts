
// created this file to define types and interfaces for Google Pay integration in an Angular application.
export interface PaymentDataRequest {
  apiVersion: number;
  apiVersionMinor: number;
  allowedPaymentMethods: any[];
  merchantInfo: any;
  transactionInfo: any;
}

export enum PaymentMethodType {
  Card = 'CARD'
}

export enum ButtonColor {
  Default = 'default',
  Black = 'black',
  White = 'white'
}

export enum ButtonType {
  Buy = 'buy',
  Donate = 'donate',
  Book = 'book',
  Checkout = 'checkout',
  Order = 'order',
  Pay = 'pay',
  Subscribe = 'subscribe'
}
