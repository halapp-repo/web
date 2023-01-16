import { Box, List, Radio, RadioGroup, ListItem, ListItemText, Typography } from '@mui/material';
import IconPosMachine from '../../components/icons/IconPosMachine';

const PaymentMethod = () => {
  return (
    <RadioGroup value={'pos'}>
      <List
        subheader={
          <Box
            sx={{
              padding: '4px 8px 4px 8px',
              display: 'flex',
              marginBottom: '10px'
            }}>
            <Typography fontWeight={'bold'}>{'Ödeme Yöntemi'}</Typography>
          </Box>
        }>
        <ListItem
          selected={true}
          button
          key={'pos'}
          sx={{
            margin: '5px 0px 5px 0px',
            padding: '3px 10px',
            boxShadow: 'sm',
            bgcolor: 'background.body',
            '&.Mui-selected': {
              backgroundColor: 'inherit',
              border: '1px solid #ffc423',
              borderRadius: '8px'
            },
            '&.Mui-selected:hover': {
              backgroundColor: 'inherit'
            }
          }}
          secondaryAction={<Radio value={'pos'} />}>
          <ListItemText
            primary={
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <IconPosMachine />
                <Typography fontWeight={'bold'}>{'Teslimatta Ödeme'}</Typography>
              </Box>
            }
          />
        </ListItem>
      </List>
    </RadioGroup>
  );
};

export { PaymentMethod };
