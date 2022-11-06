/********************
 *
 * MEMO
 *
 * new window.PaymentRequest(methodData, details, options);
 * の第三引数がtypescriptだと存在しないため、.jsとしています
 ********************/

const allowedCardNetworks = ['AMEX', 'DISCOVER', 'INTERAC', 'JCB', 'MASTERCARD', 'VISA'];
const allowedCardAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];

const handleOnPayment = (callback) => {
  if (window.PaymentRequest) {
    const request = createPaymentRequest();
    request.canMakePayment().then((result) => {
      if (result) {
        createPaymentRequest()
          .show()
          .then((response) => {
            // Dismiss payment dialog.
            response.complete('success');
            callback && callback();
            console.log(response.toJSON());
          })
          .catch((err) => {
            console.warn('show() error! ' + err.name + ' error: ' + err.message);
          });
      }
    });
  }
};

export default handleOnPayment;

const googlePayData = {
  environment: 'TEST',
  apiVersion: 2,
  apiVersionMinor: 0,
  merchantInfo: {
    // A merchant ID is available after approval by Google.
    // 'merchantId':'12345678901234567890',
    merchantName: 'Example Merchant',
  },
  allowedPaymentMethods: [
    {
      type: 'CARD',
      parameters: {
        allowedAuthMethods: allowedCardAuthMethods,
        allowedCardNetworks: allowedCardNetworks,
      },
      tokenizationSpecification: {
        type: 'PAYMENT_GATEWAY',
        // Check with your payment gateway on the parameters to pass.
        // @see {@link https://developers.google.com/pay/api/web/reference/request-objects#gateway}
        parameters: {
          gateway: 'example',
          gatewayMerchantId: 'exampleGatewayMerchantId',
        },
      },
    },
  ],
};

const applePayData = {
  version: 3,
  merchantIdentifier: 'merchant.com.example',
  merchantCapabilities: ['supports3DS'],
  supportedNetworks: ['amex', 'discover', 'masterCard', 'visa'],
  countryCode: 'US',
};

const createPaymentRequest = () => {
  // Add support for the Google Pay API.
  const methodData = [
    {
      supportedMethods: 'https://google.com/pay',
      data: googlePayData,
    },
    {
      supportedMethods: 'https://apple.com/apple-pay',
      data: applePayData,
    },
    {
      supportedMethods: 'basic-card',
      data: Array.from(allowedCardNetworks, (network) => network.toLowerCase()),
    },
  ];

  const details = {
    displayItems: [
      {
        label: '通常商品',
        amount: { currency: 'YEN', value: '10' },
      },
      {
        label: 'クーポン',
        amount: { currency: 'YEN', value: '-5' },
      },
    ],
    total: {
      label: '合計',
      amount: { currency: 'YEN', value: '5' },
    },
  };

  const options = {
    // shippingType: 'delivery',
    // requestShipping: true,
    requestPayerEmail: true,
    requestPayerPhone: true,
    requestPayerName: true,
  };

  return new window.PaymentRequest(methodData, details, options);
};
