import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment-timezone';

import {
  Box,
  useMediaQuery,
  Theme,
  Card,
  CardActions,
  IconButton,
  styled,
  IconButtonProps,
  Collapse,
  CardContent,
  TextField,
  Divider,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
//import { selectCategories } from '../../store/inventories/inventoriesSlice';
import { selectUIListingSelectedDate } from '../../store/ui/uiSlice';
import {
  updateListingSelectedDate,
  updateListingProductNameFilter,
  selectUIListingSelectedCity,
  selectUIListingProductNameFilter
} from '../../store/ui/uiSlice';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => {
  return {
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  };
});

const PriceFilter = () => {
  const dispatch = useAppDispatch();
  // const categories = useAppSelector(selectCategories);
  const selectedDate = useAppSelector(selectUIListingSelectedDate);
  const selectedCity = useAppSelector(selectUIListingSelectedCity);
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
        <FormControl>
          <InputLabel id="demo-simple-select-label">Sehir</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCity}
            label="Sehir">
            <MenuItem value={'istanbul'}>Istanbul</MenuItem>
          </Select>
        </FormControl>
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
                label="Urun adi"
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
