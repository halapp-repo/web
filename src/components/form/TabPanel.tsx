import { Box } from '@mui/material';

interface TabPanelProps {
  children: JSX.Element;
  value: number | string;
  index: number | string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export { TabPanel };
