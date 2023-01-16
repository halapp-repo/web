import { Box, Typography } from '@mui/material';

const ShoppingCartEmptyListContent = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '80%',
        justifyContent: 'center',
        margin: '20px',
        alignItems: 'center'
      }}>
      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
        {'Sepetinizde ürün bulunmamaktadır, eklemek için listedeki ürünleri üzerini tıklayınız.'}
      </Typography>
    </Box>
  );
};

export default ShoppingCartEmptyListContent;
