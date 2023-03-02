import * as Yup from 'yup';
import { creditCardType } from '../../utils/credit-card';
import '../../utils/yup';

const cardValidationSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .creditCardType('Kart tipi uymuyor')
    .creditCardLength('Kart karakteri uymuyor')
    .required(),
  approvedContract: Yup.bool().oneOf([true], `Sözleşme onaylanmalı`).required(),
  monthExpiry: Yup.string().required(),
  yearExpiry: Yup.string().required(),
  cvv: Yup.string()
    .required()
    .when('cardNumber', {
      is: (cardNumber: string) => {
        const value = (cardNumber || '').replace(/\s/g, '');
        return creditCardType(value) === 'AMEX';
      },
      then: Yup.string().max(4).min(4),
      otherwise: Yup.string().max(3).min(3)
    }),
  securePaymentEnabled: Yup.bool().optional()
});

export { cardValidationSchema };
