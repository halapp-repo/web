import { Button, ButtonGroup } from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';

import useLongPress from '../../hooks/useLongPress';

interface NumberInputProps {
  MinNumber: number;
  MaxNumber?: number;
  Counter?: number;
  Disabled?: boolean;
  CounterText?: (counter: number) => string | ReactElement;
  OnUpdateCounter: (counter: number) => void;
}

const NumberInput = ({
  Counter,
  MinNumber,
  MaxNumber,
  Disabled,
  CounterText,
  OnUpdateCounter
}: NumberInputProps) => {
  const [counter, setCounter] = useState(Counter || MinNumber);

  useEffect(() => {
    OnUpdateCounter(counter);
  }, [counter]);

  const handleIncrement = () => {
    setCounter((prev) => {
      if (MaxNumber && prev === MaxNumber) {
        return prev;
      } else {
        return prev + 1;
      }
    });
  };

  const handleDecrement = () => {
    setCounter((prev) => {
      if (prev === MinNumber) {
        return prev;
      } else {
        return prev - 1;
      }
    });
  };

  const longDecreasePressEvent = useLongPress(handleDecrement, handleDecrement);
  const longIncreasePressEvent = useLongPress(handleIncrement, handleIncrement);

  return (
    <ButtonGroup disableElevation size="small" aria-label="small outlined button group">
      <Button disabled={Disabled} {...longDecreasePressEvent} color="blackNWhite">
        -
      </Button>
      <Button disabled={Disabled} variant="contained">
        {CounterText ? CounterText(counter) : counter}
      </Button>
      <Button disabled={Disabled} {...longIncreasePressEvent} color="blackNWhite">
        +
      </Button>
    </ButtonGroup>
  );
};

export { NumberInput };
