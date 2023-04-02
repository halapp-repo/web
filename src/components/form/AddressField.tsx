import { TextField, TextFieldProps } from '@mui/material';
import { FieldProps, getIn } from 'formik';
import React, { MutableRefObject, useEffect, useRef } from 'react';

interface AddressOutput {
  formattedAddress: string | undefined;
  county: string | undefined;
  city: string | undefined;
  country: string | undefined;
  zipCode: string | undefined;
  phoneNumber: string | undefined;
  lng: number | undefined;
  lat: number | undefined;
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
    'name',
    'geometry'
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
  const lat = place.geometry?.location?.lat();
  const lng = place.geometry?.location?.lng();
  return {
    formattedAddress: place.formatted_address,
    county: addressComponent['administrative_area_level_2'],
    city: addressComponent['administrative_area_level_1'],
    country: addressComponent['country'],
    zipCode: addressComponent['postal_code'],
    name: place.name,
    lat,
    lng,
    phoneNumber: place['international_phone_number']
  };
};

const AddressField: React.FC<
  FieldProps &
    TextFieldProps & { onPlaceChanged: (addressProps: AddressOutput) => void; placeholder?: string }
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
