import 'moment-timezone';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Divider,
  Stack,
  TextField,
  Theme,
  useMediaQuery
} from '@mui/material';
import { debounce } from '@mui/material/utils';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

import { ExpandMore } from '../../components/ExpandMoreButton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUIListingSelectedDate } from '../../store/ui/uiSlice';
import {
  selectUIListingProductNameFilter,
  updateListingProductNameFilter,
  updateListingSelectedDate
} from '../../store/ui/uiSlice';

const PriceFilter = () => {
  const dispatch = useAppDispatch();
  const selectedDate = useAppSelector(selectUIListingSelectedDate);
  const filteringProductName = useAppSelector(selectUIListingProductNameFilter);
  const debouncedDispatch = debounce(dispatch, 300);

  const matchesSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const [expanded, setExpanded] = React.useState(false);

  const [query, setQuery] = useState('');
  useEffect(() => {
    if (filteringProductName) {
      setQuery(filteringProductName);
    }
  }, []);
  useEffect(() => {
    debouncedDispatch(updateListingProductNameFilter(query));
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
              InputLabelProps={{
                sx: {
                  overflow: 'visible'
                }
              }}
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
                InputLabelProps={{
                  sx: {
                    overflow: 'visible'
                  }
                }}
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
