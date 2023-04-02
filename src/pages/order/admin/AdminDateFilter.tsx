import { CalendarOutlined } from '@ant-design/icons';
import { MenuItem, Select, Stack, Typography } from '@mui/material';

import { DateRangeType } from '../../../models/types/date-range.type';
import { DateRange } from './date-range.type';

interface AdminDateFilterProps {
  Filter: DateRangeType;
  SetRange: (range: DateRangeType) => void;
  Range: DateRange;
}

const AdminDateFilter = ({ Filter, SetRange, Range }: AdminDateFilterProps) => {
  return (
    <Stack sx={{ padding: '0px 10px' }} spacing={2}>
      <Typography variant="body2" fontWeight={'bold'}>
        <CalendarOutlined /> {'Time'}
      </Typography>
      <Select
        value={Filter}
        onChange={(e) => {
          const value = e.target.value;
          const newRange = DateRangeType[value as keyof typeof DateRangeType];
          if (newRange) {
            SetRange(newRange);
          }
        }}>
        {Object.entries(Range).map(([k, v]) => {
          return (
            <MenuItem key={k} value={k}>
              <Typography>
                <b>{k}</b>{' '}
                {(k === DateRangeType.Today || k === DateRangeType.Yesterday) &&
                  `${v.from.format('MMM DD HH:mm')} - ${v.to.format('MMM DD HH:mm')}`}
                {(k === DateRangeType['This Year'] || k === DateRangeType['Last Year']) &&
                  `${v.from.format('MMM DD YYYY')} - ${v.to.format('MMM DD YYYY')}`}
                {k !== DateRangeType.Today &&
                  k !== DateRangeType.Yesterday &&
                  k !== DateRangeType['This Year'] &&
                  k !== DateRangeType['Last Year'] &&
                  `${v.from.format('MMM DD')} - ${v.to.format('MMM DD')}`}
              </Typography>
            </MenuItem>
          );
        })}
      </Select>
    </Stack>
  );
};

export { AdminDateFilter };
