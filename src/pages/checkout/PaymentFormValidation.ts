import * as Yup from 'yup';
import '../../utils/yup';

const cardValidationSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .creditCardType('Kart tipi uymuyor')
    .creditCardLength('Kart karakteri uymuyor')
    .required(),
  approvedContract: Yup.bool().oneOf([true], `Sözleşme onaylanmalı`).required()
});

export { cardValidationSchema };
