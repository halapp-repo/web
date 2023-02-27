import {
  Typography,
  Stack,
  Grid,
  TextField,
  InputAdornment,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Tooltip,
  Box,
  Checkbox
} from '@mui/material';
import { IMaskInput } from 'react-imask';
import { useState, forwardRef, ReactElement } from 'react';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { creditCardType } from '../../utils/credit-card';
import Visa from '../../components/icons/credit-cards/Visa';
import MasterCard from '../../components/icons/credit-cards/MasterCard';
import AmEx from '../../components/icons/credit-cards/AmEx';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  value: string;
}
const YEAR = new Date().getFullYear();
const TextMaskCustom = forwardRef<ReactElement, CustomProps>(function TextMaskCustom(props, ref) {
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
const getCreditCardIcon = (cardNumber: string) => {
  const str = creditCardType(cardNumber.replace(/\s/g, ''));
  if (str === 'VISA') {
    return <Visa Size="x-small" />;
  } else if (str === 'MASTERCARD') {
    return <MasterCard Size="x-small" />;
  } else if (str === 'AMEX') {
    return <AmEx Size="x-small" />;
  }
  return <CreditCardIcon sx={{ display: 'flex', width: '1em', height: '1em', mr: 1 }} />;
};

const CardInformation = () => {
  const [cardNumber, setCardNumber] = useState<string>('');
  const handleChangeCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(e.target.value);
  };
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Stack spacing={1}>
          <Typography variant="body2" fontWeight={'bold'} color="text.secondary">
            {'Kart Numarası'}
          </Typography>
          <TextField
            fullWidth
            value={cardNumber}
            onChange={handleChangeCardNumber}
            InputProps={{
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              inputComponent: TextMaskCustom as any,
              startAdornment: (
                <InputAdornment position="start">{getCreditCardIcon(cardNumber)}</InputAdornment>
              )
            }}
          />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={8}>
            <Stack spacing={1}>
              <Typography variant="body2" fontWeight={'bold'} color="text.secondary">
                {'Son Kullanma Tarihi'}
              </Typography>
              <Stack spacing={1} direction="row">
                <FormControl sx={{ width: '80px' }}>
                  <InputLabel
                    sx={{
                      overflow: 'visible'
                    }}
                    id="month-helper-label">
                    Ay
                  </InputLabel>
                  <Select
                    labelId="month-helper-label"
                    id="month-select"
                    onChange={() => {
                      //
                    }}>
                    {[...Array(12).keys()].map((n) => {
                      const val = n + 1;
                      return (
                        <MenuItem key={n} value={val}>
                          {`${val}`.padStart(2, '0')}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl sx={{ width: '80px' }}>
                  <InputLabel
                    sx={{
                      overflow: 'visible'
                    }}
                    id="year-helper-label">
                    Yıl
                  </InputLabel>
                  <Select
                    labelId="year-helper-label"
                    id="year-select"
                    onChange={() => {
                      //
                    }}>
                    {[...Array(60).keys()].map((n) => {
                      const val = n + YEAR;
                      return (
                        <MenuItem key={n} value={val}>
                          {`${val}`}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Stack spacing={1}>
              <Stack spacing={1} direction="row">
                <Typography variant="body2" fontWeight={'bold'} color="text.secondary">
                  {'CVV'}
                </Typography>
                <Tooltip
                  placement="top"
                  title={
                    <Box>
                      <Typography variant="body1" fontWeight={'bold'}>
                        {'GÜVENLİK KODU (CVV)'}
                      </Typography>
                      <Typography variant="body2">
                        {
                          ' Kartınızın arka yüzündeki son 3 rakam Amex için kartınızın ön yüzündeki 4 rakam'
                        }
                      </Typography>
                    </Box>
                  }>
                  <InfoOutlinedIcon color="info" />
                </Tooltip>
              </Stack>
              <TextField inputProps={{ maxLength: 3 }} sx={{ width: '80px' }} />
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={1} direction="row" textAlign={'center'} alignItems="center">
          <Checkbox />
          <SecurityOutlinedIcon />
          <Typography variant="body1" color="text.secondary">
            <b>3D Secure</b> ile ödemek istiyorum.
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export { CardInformation };
