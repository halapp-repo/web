import { IMaskInput } from 'react-imask';
import { forwardRef, ReactElement } from 'react';
import { creditCardType } from '../../utils/credit-card';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  value: string;
}

const CreditCardMask = forwardRef<ReactElement, CustomProps>(function TextMaskCustom(props, ref) {
  const { onChange, value, ...other } = props;
  const type = creditCardType(value.replace(/\s/g, ''));
  return (
    <IMaskInput
      {...other}
      mask={
        typeof type === 'undefined' || type === 'VISA' || type === 'MASTERCARD'
          ? '0000 0000 0000 0000'
          : '0000 000000 00000'
      }
      definitions={{
        '#': /[1-9]/
      }}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      inputRef={ref as any}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

export { CreditCardMask };
