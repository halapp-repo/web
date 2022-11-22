import React, { useRef, useEffect, MutableRefObject, FocusEvent } from 'react';
import { FieldProps, getIn } from 'formik';
import { TextFieldProps, TextField } from '@mui/material';

interface AddressOutput {
  formattedAddress: string | undefined;
  county: string | undefined;
  city: string | undefined;
  country: string | undefined;
  zipCode: string | undefined;
}

const AddressFieldWithPlaceFromQuery: React.FC<
  FieldProps &
    TextFieldProps & {
      onPlaceChanged: (result: (AddressOutput | null)[]) => void;
      placeholder?: string;
    }
> = (props) => {
  const placesServiceRef = useRef() as MutableRefObject<google.maps.places.PlacesService>;
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  const isTouched = getIn(props.form.touched, props.field.name);
  const errorMessage = getIn(props.form.errors, props.field.name);

  const { error, helperText, field, onPlaceChanged, ...rest } = props;

  useEffect(() => {
    placesServiceRef.current = new window.google.maps.places.PlacesService(inputRef.current);
  }, []);

  const parseAddress = (address?: string): AddressOutput | null => {
    if (!address) {
      return null;
    }
    const splittedAddress = address.split(',');
    if (!splittedAddress || splittedAddress.length < 2) {
      return null;
    }
    const country = splittedAddress[splittedAddress.length - 1];
    const zipCountyAndCity = splittedAddress[splittedAddress.length - 2];
    const regex = /(\d{5})\s*((\S*)\/(\S*))/;
    const parsedAddress = regex.exec(zipCountyAndCity);
    if (!parseAddress) {
      return null;
    }
    return {
      country: country.trim(),
      formattedAddress: address,
      zipCode: parsedAddress?.[1]?.trim() || '',
      county: parsedAddress?.[3]?.trim() || '',
      city: parsedAddress?.[4]?.trim() || ''
    } as AddressOutput;
  };

  const placeQueryCallback = (
    results: google.maps.places.PlaceResult[] | null,
    status: google.maps.places.PlacesServiceStatus
  ): void => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      const places: (AddressOutput | null)[] = results
        .map((r) => parseAddress(r.formatted_address))
        .filter(Boolean);
      onPlaceChanged(places);
    }
  };

  const fieldWithOnBlurExtended = {
    ...field,
    onBlur: (e: FocusEvent<HTMLInputElement>) => {
      const onB = field.onBlur;
      if (onB) {
        onB(e);
      }
      placesServiceRef.current.findPlaceFromQuery(
        {
          fields: ['formatted_address'],
          query: e.currentTarget.value
        },
        placeQueryCallback
      );
    }
  };

  return (
    <TextField
      inputRef={inputRef}
      error={error ?? Boolean(isTouched && errorMessage)}
      helperText={helperText ?? (isTouched && errorMessage ? errorMessage : undefined)}
      {...rest} // includes any Material-UI specific props
      {...fieldWithOnBlurExtended} // includes all props contributed by the Formik Field/FastField
    />
  );
};

export { AddressFieldWithPlaceFromQuery };
export type { AddressOutput };
