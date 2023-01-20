import { trMoment } from '../../utils/timezone';
import moment from 'moment';
import { getDeliveryTime } from './DeliveryTime';

moment.tz.setDefault('Europe/Istanbul'); // Whatever timezone you want
it('Delivery Time between 7 - 24  8AM Monday', () => {
  const currentTime = trMoment('2023.01.16 08:00', 'YYYY.MM.DD HH:mm'); // Monday
  const deliveryTime = getDeliveryTime(currentTime);
  expect(deliveryTime.format('YYYY.MM.DD HH:mm')).toBe(
    moment('2023.01.17 05:00', 'YYYY.MM.DD HH:mm').format('YYYY.MM.DD HH:mm')
  );
});
it('Delivery Time between 7 - 24 11:59PM Monday', () => {
  const currentTime = trMoment('2023.01.16 23:59', 'YYYY.MM.DD HH:mm'); // Monday
  const deliveryTime = getDeliveryTime(currentTime);
  expect(deliveryTime.format('YYYY.MM.DD HH:mm')).toBe(
    moment('2023.01.17 05:00', 'YYYY.MM.DD HH:mm').format('YYYY.MM.DD HH:mm')
  );
});

it('Delivery Time between 7 - 24 08:00AM Friday', () => {
  const currentTime = trMoment('2023.01.20 08:00', 'YYYY.MM.DD HH:mm'); // Friday
  const deliveryTime = getDeliveryTime(currentTime);
  expect(deliveryTime.format('YYYY.MM.DD HH:mm')).toBe(
    moment('2023.01.21 05:00', 'YYYY.MM.DD HH:mm').format('YYYY.MM.DD HH:mm')
  );
});

it('Delivery Time between 7 - 24 08:00AM Saturday', () => {
  const currentTime = trMoment('2023.01.21 08:00', 'YYYY.MM.DD HH:mm'); // Saturday
  const deliveryTime = getDeliveryTime(currentTime);
  expect(deliveryTime.format('YYYY.MM.DD HH:mm')).toBe(
    moment('2023.01.22 05:00', 'YYYY.MM.DD HH:mm').format('YYYY.MM.DD HH:mm')
  );
});

it('Delivery Time between 00 - 07 01:00AM Monday', () => {
  const currentTime = trMoment('2023.01.16 01:00', 'YYYY.MM.DD HH:mm'); // Monday
  const deliveryTime = getDeliveryTime(currentTime);
  expect(deliveryTime.format('YYYY.MM.DD HH:mm')).toBe(
    moment('2023.01.16 05:00', 'YYYY.MM.DD HH:mm').format('YYYY.MM.DD HH:mm')
  );
});

it('Delivery Time between 00 - 07 04:00AM Monday', () => {
  const currentTime = trMoment('2023.01.16 04:00', 'YYYY.MM.DD HH:mm'); // Monday
  const deliveryTime = getDeliveryTime(currentTime);
  expect(deliveryTime.format('YYYY.MM.DD HH:mm')).toBe(
    moment('2023.01.16 07:00', 'YYYY.MM.DD HH:mm').format('YYYY.MM.DD HH:mm')
  );
});

it('Delivery Time between 00 - 07 04:00AM Saturday', () => {
  const currentTime = trMoment('2023.01.21 04:00', 'YYYY.MM.DD HH:mm'); // Saturday
  const deliveryTime = getDeliveryTime(currentTime);
  expect(deliveryTime.format('YYYY.MM.DD HH:mm')).toBe(
    moment('2023.01.22 05:00', 'YYYY.MM.DD HH:mm').format('YYYY.MM.DD HH:mm')
  );
});

it('Delivery Time between 07 - 24 08:00AM Monday - Setting', () => {
  const currentTime = trMoment('2023.01.16 08:00', 'YYYY.MM.DD HH:mm'); // Monday
  const settingTime = trMoment('2023.01.01 04:00', 'YYYY.MM.DD HH:mm'); // Date does not matter
  const deliveryTime = getDeliveryTime(currentTime, settingTime);
  expect(deliveryTime.format('YYYY.MM.DD HH:mm')).toBe(
    moment('2023.01.17 04:00', 'YYYY.MM.DD HH:mm').format('YYYY.MM.DD HH:mm')
  );
});

it('Delivery Time between 00 - 07 02:00AM Monday 1 - Setting', () => {
  const currentTime = trMoment('2023.01.16 02:00', 'YYYY.MM.DD HH:mm'); // Monday
  const settingTime = trMoment('2023.01.01 04:00', 'YYYY.MM.DD HH:mm'); // Date does not matter
  const deliveryTime = getDeliveryTime(currentTime, settingTime);
  expect(deliveryTime.format('YYYY.MM.DD HH:mm')).toBe(
    moment('2023.01.17 04:00', 'YYYY.MM.DD HH:mm').format('YYYY.MM.DD HH:mm')
  );
});

it('Delivery Time between 00 - 07 02:00AM Monday 2- Setting', () => {
  const currentTime = trMoment('2023.01.16 02:00', 'YYYY.MM.DD HH:mm'); // Monday
  const settingTime = trMoment('2023.01.01 05:00', 'YYYY.MM.DD HH:mm'); // Date does not matter
  const deliveryTime = getDeliveryTime(currentTime, settingTime);
  expect(deliveryTime.format('YYYY.MM.DD HH:mm')).toBe(
    moment('2023.01.16 05:00', 'YYYY.MM.DD HH:mm').format('YYYY.MM.DD HH:mm')
  );
});

it('Delivery Time between 00 - 07 02:00AM Monday 3- Setting', () => {
  const currentTime = trMoment('2023.01.16 02:00', 'YYYY.MM.DD HH:mm'); // Monday
  const settingTime = trMoment('2023.01.01 16:00', 'YYYY.MM.DD HH:mm'); // Date does not matter
  const deliveryTime = getDeliveryTime(currentTime, settingTime);
  expect(deliveryTime.format('YYYY.MM.DD HH:mm')).toBe(
    moment('2023.01.16 16:00', 'YYYY.MM.DD HH:mm').format('YYYY.MM.DD HH:mm')
  );
});

it('Delivery Time between 00 - 07 02:00AM Monday 4- Setting', () => {
  const currentTime = trMoment('2023.01.16 02:00', 'YYYY.MM.DD HH:mm'); // Monday
  const settingTime = trMoment('2023.01.01 01:00', 'YYYY.MM.DD HH:mm'); // Date does not matter
  const deliveryTime = getDeliveryTime(currentTime, settingTime);
  expect(deliveryTime.format('YYYY.MM.DD HH:mm')).toBe(
    moment('2023.01.17 01:00', 'YYYY.MM.DD HH:mm').format('YYYY.MM.DD HH:mm')
  );
});
