import * as Yup from 'yup';

const cardValidationSchema = Yup.object().shape({
  cardNumber: Yup.string().required()
});

export { cardValidationSchema };
