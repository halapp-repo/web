import { styled } from '@mui/material/styles';
import { Tab as MuiTab } from '@mui/material';

const Tab = styled(MuiTab)({
  alignItems: 'self-start',
  justifyContent: 'flex-start',
  padding: '20px 10px',
  fontSize: '15px',
  fontWeight: 'normal',
  '&.MuiTab-labelIcon': {
    alignItems: 'center'
  },
  '&.Mui-selected': {
    fontWeight: 'bold',
    color: 'inherit'
  },
  '&.tab-admin': {
    color: '#8753de'
  }
});

export { Tab };
