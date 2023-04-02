import { CalendarOutlined } from '@ant-design/icons';
import { Box, TextField, Typography } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';

import { trMoment } from '../../../utils/timezone';

interface MonthFilterProps {
  Filter: moment.Moment | null;
  SetMonth: (filter: moment.Moment) => void;
}

const MonthFilter = ({ SetMonth, Filter }: MonthFilterProps) => {
  const onKeyDown = (e: React.KeyboardEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <Box sx={{ padding: '0px 10px' }}>
        <Typography variant="body2" fontWeight={'bold'}>
          <CalendarOutlined /> {'Tarihe göre'}
        </Typography>
      </Box>
      <MobileDatePicker
        value={Filter ? Filter.toDate() : null}
        onChange={() => {
          //
        }}
        renderInput={(params) => (
          <TextField sx={{ p: '0px 10px' }} onKeyDown={onKeyDown} {...params} />
        )}
        views={['year', 'month']}
        openTo="month"
        minDate={new Date(2022, 12, 1)}
        maxDate={trMoment().endOf('M').toDate()}
        showToolbar={false}
        onMonthChange={(month) => {
          SetMonth(trMoment(month));
        }}
      />
    </>
  );
};

export default MonthFilter;
