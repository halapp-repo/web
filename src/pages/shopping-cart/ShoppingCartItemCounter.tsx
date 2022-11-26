import { Stack, Box, useTheme } from '@mui/material';
import { ShoppingOutlined } from '@ant-design/icons';

const ShoppingCartItemCounter = () => {
  const theme = useTheme();
  return (
    <Stack
      direction={'row'}
      spacing={2}
      sx={{ padding: '16px', bgcolor: theme.palette.secondary.dark, color: '#fff' }}>
      <Box>
        <ShoppingOutlined />
      </Box>
      <Box>{`Ürün sayısı ${5}`}</Box>
    </Stack>
  );
};

export default ShoppingCartItemCounter;
