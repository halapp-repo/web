import * as Yup from 'yup';

import { creditCardType } from './credit-card';

Yup.addMethod(Yup.string, 'creditCardType', function (errorMessage) {
  return this.test(`test-card-type`, errorMessage, function (value) {
    const { path, createError } = this;
    value = value ? value.replace(/\s/g, '') : value;
    return (
      (value && typeof creditCardType(value) !== 'undefined') ||
      createError({ path, message: errorMessage })
    );
  });
});

Yup.addMethod(Yup.string, 'creditCardLength', function (errorMessage) {
  return this.test(`test-card-length`, errorMessage, function (value) {
    const { path, createError } = this;
    value = (value || '').replace(/\s/g, '');
    const creditCard = creditCardType(value);
    return (
      (creditCard === 'MASTERCARD' && value.length === 16) ||
      (creditCard === 'VISA' && (value.length === 16 || value.length === 13)) ||
      (creditCard === 'AMEX' && value.length === 15) ||
      createError({ path, message: errorMessage })
    );
  });
});
