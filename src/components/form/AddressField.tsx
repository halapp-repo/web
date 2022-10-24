import React, { useRef, useEffect, MutableRefObject } from 'react';
import { FieldProps, getIn } from 'formik';
import { TextFieldProps, TextField } from '@mui/material';

interface AddressOutput {
  formattedAddress: string | undefined;
  county: string | undefined;
  city: string | undefined;
  country: string | undefined;
  zipCode: string | undefined;
  phoneNumber: string | undefined;
  url: string | undefined;
  name: string | undefined;
  businessStatus?: string | undefined;
}

const options = {
  componentRestrictions: { country: 'tr' },
  fields: [
    'address_components',
    'formatted_address',
    'business_status',
    'international_phone_number',
    'url',
    'name'
  ]
} as google.maps.places.AutocompleteOptions;

const parsePlace = (place: google.maps.places.PlaceResult): AddressOutput | undefined => {
  if (!place) {
    return undefined;
  }
  const addressComponent = (place.address_components || []).reduce(
    (acc: { [key: string]: string }, curr: google.maps.GeocoderAddressComponent) => {
      for (const type of curr.types) {
        acc[type] = curr.long_name;
      }
      return acc;
    },
    {} as { [key: string]: string }
  );
  return {
    formattedAddress: place.formatted_address,
    county: addressComponent['administrative_area_level_2'],
    city: addressComponent['administrative_area_level_1'],
    country: addressComponent['country'],
    zipCode: addressComponent['postal_code'],
    name: place.name,
    url: place.url,
    phoneNumber: place['international_phone_number'],
    businessStatus: place['business_status']
  };
};

const AddressField: React.FC<
  FieldProps & TextFieldProps & { onPlaceChanged: (addressProps: AddressOutput) => void }
> = (props) => {
  const autoCompleteRef = useRef() as MutableRefObject<google.maps.places.Autocomplete>;
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  const isTouched = getIn(props.form.touched, props.field.name);
  const errorMessage = getIn(props.form.errors, props.field.name);

  const { error, helperText, field, form, onPlaceChanged, ...rest } = props;

  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, options);
    autoCompleteRef.current.addListener('place_changed', async function () {
      const place = await autoCompleteRef.current.getPlace();
      console.log({ place });
      form.setFieldValue(field.name, place.formatted_address);
      const parsedAddress = parsePlace(place);
      if (parsedAddress && onPlaceChanged) {
        onPlaceChanged(parsedAddress);
      }
    });
  }, []);

  return (
    <TextField
      inputRef={inputRef}
      error={error ?? Boolean(isTouched && errorMessage)}
      helperText={helperText ?? (isTouched && errorMessage ? errorMessage : undefined)}
      {...rest} // includes any Material-UI specific props
      {...field} // includes all props contributed by the Formik Field/FastField
    />
  );
};

export { AddressField };
export type { AddressOutput };