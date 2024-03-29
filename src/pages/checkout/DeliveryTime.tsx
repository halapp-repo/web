import { ClockCircleOutlined } from '@ant-design/icons';
import { Box, InputAdornment, List, TextField, Typography } from '@mui/material';
import { MobileTimePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { useEffect, useState } from 'react';

import { TimeOfDayIcon } from '../../components/TimeOfDayIcon';
import { useAppSelector } from '../../store/hooks';
import { selectUICheckout } from '../../store/ui/uiSlice';
import { trMoment } from '../../utils/timezone';

const getDeliveryTime = (
  currentTime: moment.Moment,
  settingTime?: moment.Moment
): moment.Moment => {
  const currentHour = currentTime.hour();
  // If there is no time to set
  if (!settingTime) {
    // And time between 7 AM - 12 AM OR today is Saturday
    if ((currentHour > 7 && currentHour < 24) || currentTime.isoWeekday() === 6) {
      // make default time 5 AM next day
      return currentTime.add(1, 'd').set('h', 5).set('m', 0);
      // And time between 12 AM - 7 AM
    } else {
      const setHour = currentHour + 3;
      // make default time (+3) if current time > 5 AM or set to 5 AM
      return currentTime.set('h', setHour > 5 ? setHour : 5).set('m', 0);
    }
  } else {
    if ((currentHour > 7 && currentHour < 24) || currentTime.isoWeekday() === 6) {
      // make default time 5 AM next day
      return currentTime.add(1, 'd').set('h', settingTime.hour()).set('m', 0);
      // And time between 12 AM - 7 AM
    } else {
      return currentTime
        .add(
          currentTime.hour() >= settingTime.hour() || settingTime.hour() - currentTime.hour() < 3
            ? 1
            : 0,
          'd'
        )
        .set('h', settingTime.hour())
        .set('m', 0);
    }
  }
};

const skipSunday = (time: moment.Moment): moment.Moment => {
  if (time.isoWeekday() === 7) {
    return time.add(1, 'd');
  }
  return time;
};

export const shiftPickerDateToTimezoneDate = (pickerDate: string | Date, timezone: string) => {
  const pickerOffset = moment(pickerDate).utcOffset();
  const utcDate = new Date();
  utcDate.setTime(moment(pickerDate).valueOf() + pickerOffset * 60000);

  const tzOffset = moment.tz(pickerDate, timezone).utcOffset();
  const tzDate = new Date();
  tzDate.setTime(utcDate.getTime() - tzOffset * 60000);

  return tzDate;
};

export const shiftTimezoneDateToPickerDate = (tzDate: string | Date, timezone: string) => {
  const tzUtcOffset = moment.tz(tzDate, timezone).utcOffset();
  const utcDate = new Date();
  utcDate.setTime(moment(tzDate).valueOf() + tzUtcOffset * 60000);

  const pickerDate = new Date();
  const pickerOffset = pickerDate.getTimezoneOffset();
  pickerDate.setTime(utcDate.getTime() + pickerOffset * 60000);

  return pickerDate;
};

interface DeliveryTimeProps {
  SetDeliveryTime: (deliveryTime: string) => void;
}

const DeliveryTime = ({ SetDeliveryTime }: DeliveryTimeProps) => {
  const initializeTime = (savedDeliveryTime: string | undefined): string => {
    if (savedDeliveryTime) {
      const savedMoment = trMoment(savedDeliveryTime);
      if (savedMoment.add(-3, 'hours').isAfter(trMoment())) {
        return savedDeliveryTime;
      }
    }
    return skipSunday(getDeliveryTime(trMoment())).format();
  };
  const { deliveryTime: savedDeliveryTime } = useAppSelector(selectUICheckout);
  const [deliveryTime, setDeliveryTime] = useState<string>(initializeTime(savedDeliveryTime));

  useEffect(() => {
    if (savedDeliveryTime) {
      const savedMoment = trMoment(savedDeliveryTime);
      if (savedMoment.add(-3, 'hours').isAfter(trMoment())) {
        SetDeliveryTime(savedDeliveryTime);
      }
    }
  }, []);

  useEffect(() => {
    if (deliveryTime) {
      SetDeliveryTime(deliveryTime);
    }
  }, [deliveryTime]);

  const handleChangeDeliveryDate = (selectedDate: string | Date) => {
    setDeliveryTime(
      skipSunday(
        getDeliveryTime(
          trMoment(),
          trMoment(shiftPickerDateToTimezoneDate(selectedDate, 'Europe/Istanbul'))
        )
      ).format()
    );
  };

  return (
    <List
      subheader={
        <Box
          sx={{
            padding: '4px 8px 4px 8px',
            display: 'flex',
            marginBottom: '10px'
          }}>
          <Typography fontWeight={'bold'}>{'Teslimat Zamanı'}</Typography>
        </Box>
      }
      sx={{ width: '100%' }}>
      <MobileTimePicker
        ampmInClock={false}
        showToolbar={false}
        openTo="hours"
        views={['hours']}
        inputFormat="dd.MM.yyyy ( HH:mm )"
        value={shiftTimezoneDateToPickerDate(deliveryTime, 'Europe/Istanbul')}
        components={{
          OpenPickerIcon: ClockCircleOutlined
        }}
        onChange={(newValue) => {
          if (newValue) {
            handleChangeDeliveryDate(newValue);
          }
        }}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TimeOfDayIcon Time={moment(params?.inputProps?.value, 'dd.MM.yyyy HH:mm')} />
                  </InputAdornment>
                )
              }}
              fullWidth
            />
          );
        }}
      />
      <ul>
        <li>
          <Typography variant="body2" fontWeight={'bold'} color="secondary">
            {'Cumartesi günü veriginiz siparişler, pazartesi teslim edilir.'}
          </Typography>
        </li>
        <li>
          <Typography variant="body2" fontWeight={'bold'} color="secondary">
            {"Sabah 7'ye kadar verdiğiniz siparişler aynı gün teslim edilir."}
          </Typography>
        </li>
      </ul>
    </List>
  );
};

export { DeliveryTime, getDeliveryTime, skipSunday };
