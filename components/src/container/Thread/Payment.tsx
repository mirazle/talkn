import { css } from '@emotion/react';
import React, { useEffect, useRef } from 'react';

import { animations, colors, layouts } from 'components/styles';

const data = {
  environment: 'TEST',
  apiVersion: 2,
  apiVersionMinor: 0,
  merchantInfo: {
    merchantId: '12345678901234567890',
    merchantName: 'Example Merchant',
  },
  allowedPaymentMethods: [
    {
      type: 'CARD',
      parameters: {
        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
        allowedCardNetworks: ['JCB', 'MASTERCARD', 'VISA'],
      },
      tokenizationSpecification: {
        type: 'PAYMENT_GATEWAY',
        parameters: {
          gateway: 'example',
          gatewayMerchantId: 'exampleGatewayMerchantId',
        },
      },
    },
  ],
};

const paymentMethods = [
  {
    supportedMethods: 'https://google.com/pay',
    data,
  },
];

const details = {
  displayItems: [
    { label: '商品1', amount: { currency: 'JPY', value: '1000' } },
    { label: '商品2', amount: { currency: 'JPY', value: '2000' } },
    { label: '商品3', amount: { currency: 'JPY', value: '3000' } },
  ],
  total: { label: '小計', amount: { currency: 'JPY', value: '6000' } },
};

const options = {
  requestShipping: true, // 配送先住所を要求
  requestPayerEmail: true, // メールアドレスを要求
  requestPayerName: true, // 決済者名を要求
  requestPayerPhone: true, // 決済者の電話番号を要求
};

type Props = {};

const Component: React.FC<Props> = ({}) => {
  useEffect(() => {
    const payment = async () => {
      console.log('@@@ PAYMENT EXE @@@');
      try {
        const request = new PaymentRequest(paymentMethods, details);
        const result = await request.canMakePayment();

        const response = await request
          .show()
          .then((response) => {
            console.log('SUCCESS', response);
          })
          .catch((err) => {
            console.log('ERROR', err);
          });
        console.log(request);
        console.log(result);
        console.log(response);
      } catch (err) {
        console.warn(err);
        /* handle the error; AbortError usually means a user cancellation */
      }
    };
    payment();
  }, []);
  return <>PAYMENT TEST</>;
};

export default Component;

const styles = {
  ol: css``,
  li: css``,
};
