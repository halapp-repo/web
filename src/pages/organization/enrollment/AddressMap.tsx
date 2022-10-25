import { Box } from '@mui/material';

interface AddressMapProps {
  long?: string;
  lat?: string;
}

const AddressMap = (props: AddressMapProps = {}) => {
  const { lat = '41.0797814', long = '29.008172' } = props;
  const src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDunADvBNBfepVIioODBP3Cq-MjIHKE268&q=${lat},${long}`;
  return (
    <Box className="google-map-code" sx={{ width: '100%', overflow: 'hidden', height: '600' }}>
      <iframe
        src={src}
        height="600"
        width="100%"
        style={{
          border: 0,
          marginTop: '-150px'
        }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </Box>
  );
};
export { AddressMap };
