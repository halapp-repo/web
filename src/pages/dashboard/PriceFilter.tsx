import React, { useEffect, useState } from 'react';
import moment from 'moment';
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
  //ToggleButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
//import { selectCategories } from '../../store/inventories/inventoriesSlice';
import { selectUIListingSelectedDate } from '../../store/ui/uiSlice';
import {
  updateListingSelectedDate,
  updateListingProductNameFilter,
  selectUIListingSelectedCity
} from '../../store/ui/uiSlice';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

// const CustomToggleButton = styled(ToggleButton)({
//   '&.Mui-selected, &.Mui-selected:hover': {
//     color: 'white',
//     backgroundColor: '#ffffff',
//     border: '2px solid rgb(255, 196, 35)'
//   }
// });

const PriceFilter = () => {
  const dispatch = useAppDispatch();
  // const categories = useAppSelector(selectCategories);
  const selectedDate = useAppSelector(selectUIListingSelectedDate);
  const selectedCity = useAppSelector(selectUIListingSelectedCity);

  const matchesSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const [expanded, setExpanded] = React.useState(false);

  const [query, setQuery] = useState('');
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

  const Content = () => {
    return (
      <Stack spacing={2}>
        {/* <ToggleButtonGroup size="small" exclusive>
          <CustomToggleButton value="left" selected={true} sx={{ height: '10vh', width: '10vh' }}>
            <img src="/img/apple.png" alt="apple" width="100%" height="100%" />
          </CustomToggleButton>
        </ToggleButtonGroup>
        <Divider variant="middle" /> */}
        {!matchesSM && (
          <>
            <TextField
              fullWidth={true}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              id="outlined-basic"
              label="Urun adi"
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
