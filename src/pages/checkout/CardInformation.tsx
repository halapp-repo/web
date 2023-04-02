import CreditCardIcon from '@mui/icons-material/CreditCard';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { debounce } from '@mui/material/utils';
import { useEffect, useState } from 'react';

import { CreditCardMask } from '../../components/form/CreditCardMask';
import AmEx from '../../components/icons/credit-cards/AmEx';
import MasterCard from '../../components/icons/credit-cards/MasterCard';
import Visa from '../../components/icons/credit-cards/Visa';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUICheckout, updateCheckout } from '../../store/ui/uiSlice';
import { creditCardType } from '../../utils/credit-card';

const YEAR = new Date().getFullYear();

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

interface CardInformationProps {
  SetCardNumberField: (cardNumber: string) => Promise<void>;
  SetMonthField: (month: string) => Promise<void>;
  SetYearField: (year: string) => Promise<void>;
  SetCVVField: (cvv: string) => Promise<void>;
  SetSecurePaymentEnabledField: (securePayment?: boolean) => Promise<void>;
}

const CardInformation = ({
  SetCardNumberField,
  SetMonthField,
  SetYearField,
  SetCVVField,
  SetSecurePaymentEnabledField
}: CardInformationProps) => {
  const dispatch = useAppDispatch();
  const { cardNumber, monthExpiry, yearExpiry, securePaymentEnable } =
    useAppSelector(selectUICheckout);

  const [cvv, setCVV] = useState<string>('');
  const debouncedSetCardNumberField = debounce(SetCardNumberField, 300);
  const debouncedCVVField = debounce(SetCVVField, 300);

  useEffect(() => {
    SetCardNumberField('');
    SetMonthField('');
    SetYearField('');
    SetSecurePaymentEnabledField(false);
    SetCVVField('');
  }, []);

  useEffect(() => {
    debouncedSetCardNumberField(cardNumber);
  }, [cardNumber]);
  useEffect(() => {
    SetMonthField(monthExpiry);
  }, [monthExpiry]);
  useEffect(() => {
    SetYearField(yearExpiry);
  }, [yearExpiry]);
  useEffect(() => {
    SetSecurePaymentEnabledField(securePaymentEnable);
  }, [securePaymentEnable]);
  useEffect(() => {
    debouncedCVVField(cvv);
  }, [cvv]);

  const handleChangeCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(
      updateCheckout({
        cardNumber: value
      })
    );
  };
  const handleChangeCVV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCVV(value);
  };
  const handleChangeMonth = (e: SelectChangeEvent) => {
    const value = e.target.value;
    dispatch(
      updateCheckout({
        monthExpiry: value
      })
    );
  };
  const handleChangeYear = (e: SelectChangeEvent) => {
    const value = e.target.value;
    dispatch(
      updateCheckout({
        yearExpiry: value
      })
    );
  };
  const handleChangePaySecure = (e: React.SyntheticEvent<Element, Event>, checked: boolean) => {
    dispatch(
      updateCheckout({
        securePaymentEnable: checked
      })
    );
  };
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Box sx={{ m: '20px 0px' }}>
          <Typography variant="h5" fontWeight={'bold'} color="text.secondary">
            {'Kart Bilgileri'}
          </Typography>
        </Box>
        <Stack spacing={1}>
          <Typography variant="body2" fontWeight={'bold'} color="text.secondary">
            {'Kart Numarası'}
          </Typography>
          <TextField
            name="cardNumber"
            fullWidth
            value={cardNumber}
            onChange={handleChangeCardNumber}
            InputProps={{
              autoComplete: 'cc-number',
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              inputComponent: CreditCardMask as any,
              startAdornment: (
                <InputAdornment position="start">{getCreditCardIcon(cardNumber)}</InputAdornment>
              )
            }}
          />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item xs={8}>
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
                    value={monthExpiry}
                    inputProps={{
                      autoComplete: 'cc-exp-month'
                    }}
                    onChange={handleChangeMonth}>
                    {[...Array(12).keys()].map((n) => {
                      const val = n + 1;
                      const valKey = `${val}`.padStart(2, '0');
                      return (
                        <MenuItem key={n} value={valKey}>
                          {valKey}
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
                    value={yearExpiry}
                    inputProps={{
                      autoComplete: 'cc-exp-year'
                    }}
                    onChange={handleChangeYear}>
                    {[...Array(60).keys()].map((n) => {
                      const valStr = `${n + YEAR}`;
                      return (
                        <MenuItem key={n} value={valStr}>
                          {valStr}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack spacing={1}>
              <Stack spacing={1} direction="row" textAlign={'center'} alignItems="center">
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
                          'Kartınızın arka yüzündeki son 3 rakam Amex için kartınızın ön yüzündeki 4 rakam'
                        }
                      </Typography>
                    </Box>
                  }>
                  <InfoOutlinedIcon color="info" sx={{ fontSize: '1em' }} />
                </Tooltip>
              </Stack>
              <TextField
                value={cvv}
                inputProps={{
                  autoComplete: 'cc-csc',
                  maxLength: creditCardType(cardNumber.replace(/\s/g, '')) === 'AMEX' ? 4 : 3
                }}
                sx={{ width: '80px' }}
                onChange={handleChangeCVV}
              />
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={1} direction="row" textAlign={'center'} alignItems="center">
          <FormControlLabel
            checked={securePaymentEnable}
            onChange={handleChangePaySecure}
            label={
              <Stack spacing={1} direction="row">
                <SecurityOutlinedIcon fontSize="small" />
                <Typography variant="body1" color="text.secondary">
                  <b>3D Secure</b> ile ödemek istiyorum.
                </Typography>
              </Stack>
            }
            control={<Checkbox />}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export { CardInformation };
