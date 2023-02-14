import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment-timezone';
import {
  Box,
  useMediaQuery,
  Theme,
  Card,
  CardActions,
  Collapse,
  CardContent,
  TextField,
  Divider,
  Stack,
  Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUIListingSelectedDate } from '../../store/ui/uiSlice';
import {
  updateListingSelectedDate,
  updateListingProductNameFilter,
  selectUIListingProductNameFilter
} from '../../store/ui/uiSlice';
import { ExpandMore } from '../../components/ExpandMoreButton';

const PriceFilter = () => {
  const dispatch = useAppDispatch();
  const selectedDate = useAppSelector(selectUIListingSelectedDate);
  const filteringProductName = useAppSelector(selectUIListingProductNameFilter);

  const matchesSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const [expanded, setExpanded] = React.useState(false);

  const [query, setQuery] = useState(filteringProductName || '');
  useEffect(() => {
    const timeOutId = setTimeout(() => dispatch(updateListingProductNameFilter(query)), 500);
    return () => clearTimeout(timeOutId);
  }, [query]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleUpdateSelectedDate = (value: string | null | undefined) => {
    if (value) {
      const valuex = moment(value).format('YYYY-MM-DD');
      dispatch(updateListingSelectedDate(valuex));
    }
  };
  const handleClearFilter = () => {
    setQuery('');
    dispatch(updateListingSelectedDate());
    if (expanded) {
      setExpanded(!expanded);
    }
  };

  const Content = () => {
    return (
      <Stack spacing={2}>
        {!matchesSM && (
          <>
            <TextField
              fullWidth={true}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              id="outlined-basic"
              label="Ürün adı"
              variant="outlined"
            />
            <Divider variant="middle" />
          </>
        )}
        <MobileDatePicker
          closeOnSelect
          disableFuture
          showToolbar={false}
          label="Fiyat Tarihi"
          value={selectedDate}
          onChange={handleUpdateSelectedDate}
          minDate="2020-01-01"
          maxDate={moment().format('YYYY-MM-DD')}
          renderInput={(params) => <TextField {...params} />}
        />
        <Divider variant="middle" />
        <Button variant="outlined" onClick={handleClearFilter} color="blackNWhite">
          Temizle
        </Button>
      </Stack>
    );
  };
  return (
    <Box>
      <Card>
        {matchesSM && (
          <>
            <CardActions disableSpacing>
              <TextField
                fullWidth={true}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                id="outlined-basic"
                label="Ürün adı"
                variant="outlined"
              />
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more">
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>{Content()}</CardContent>
            </Collapse>
          </>
        )}
        {!matchesSM && <CardContent>{Content()}</CardContent>}
      </Card>
    </Box>
  );
};

export default PriceFilter;
