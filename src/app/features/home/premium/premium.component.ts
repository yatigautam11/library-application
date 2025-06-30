import { Component } from '@angular/core';
import {
  PaymentDataRequest,
  PaymentMethodType,
  ButtonColor,
  ButtonType
} from '../../../shared/google-pay.types';
import { MatSnackBar } from '@angular/material/snack-bar';

// PremiumComponent provides the interface for users to purchase premium features.
// It uses Google Pay for payment processing and displays a success message upon successful payment.

@Component({
  selector: 'app-premium',
  standalone: false,
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.scss']
})
export class PremiumComponent {
  buttonColor: ButtonColor = ButtonColor.Black;
  buttonType: ButtonType = ButtonType.Buy;
  isCustomSize = false;
  buttonWidth = 240;
  buttonHeight = 40;
  isPaymentSuccess = false;

  constructor( private snackBar: MatSnackBar){}

  // paymentRequest defines the configuration for the Google Pay payment request.
  // It includes allowed payment methods, merchant information, and transaction details.
  paymentRequest: PaymentDataRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: PaymentMethodType.Card,
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD']
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId'
          }
        }
      }
    ],
    merchantInfo: {
      merchantId: '12345678901234567890',
      merchantName: 'Demo Merchant'
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: '199.00',
      currencyCode: 'INR',
      countryCode: 'IN'
    }
  };

  // onLoadPaymentData is called when the payment data is successfully loaded.
  // It displays a success message using MatSnackBar and sets isPaymentSuccess to true.
  onLoadPaymentData(event: any) {
    this.snackBar.open('Payment is successful!, Enjoy Premium Features!', 'Close', {
      duration: 3000,
      panelClass: ['snackbar-success']
    }
    )
    this.isPaymentSuccess = true;
    
  }
}