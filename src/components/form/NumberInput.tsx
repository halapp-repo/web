import { useState } from 'react';
import { ButtonGroup, Button } from '@mui/material';

interface NumberInputProps {
  MinNumber: number;
  MaxNumber?: number;
  Counter?: number;
}

const NumberInput = ({ Counter, MinNumber, MaxNumber }: NumberInputProps) => {
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
      <Button onClick={handleDecrement} color="blackNWhite">
        -
      </Button>
      <Button variant="contained">{counter}</Button>
      <Button onClick={handleIncrement} color="blackNWhite">
        +
      </Button>
    </ButtonGroup>
  );
};

export { NumberInput };
