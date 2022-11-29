import { useState } from 'react';
import { ButtonGroup, Button } from '@mui/material';

interface NumberInputProps {
  MinNumber: number;
  MaxNumber?: number;
  Counter?: number;
  Disabled?: boolean;
}

const NumberInput = ({ Counter, MinNumber, MaxNumber, Disabled }: NumberInputProps) => {
  const [counter, setCounter] = useState(Counter || MinNumber);

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

  return (
    <ButtonGroup disableElevation size="small" aria-label="small outlined button group">
      <Button disabled={Disabled} onClick={handleDecrement} color="blackNWhite">
        -
      </Button>
      <Button disabled={Disabled} variant="contained">
        {counter}
      </Button>
      <Button disabled={Disabled} onClick={handleIncrement} color="blackNWhite">
        +
      </Button>
    </ButtonGroup>
  );
};

export { NumberInput };
