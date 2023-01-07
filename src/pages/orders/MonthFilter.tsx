import TextField from '@mui/material/TextField';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { trMoment } from '../../utils/timezone';

interface MonthFilterProps {
  Filter: moment.Moment | null;
  SetMonth: (filter: moment.Moment) => void;
}

const MonthFilter = ({ SetMonth, Filter }: MonthFilterProps) => {
  const onKeyDown = (e: React.KeyboardEvent) => {
    e.preventDefault();
  };

  return (
    <MobileDatePicker
      value={Filter?.toDate()}
      onChange={(date) => {
        console.log(trMoment(date).format());
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
  );
};

export default MonthFilter;
