import {
  Box,
  Typography,
  CardActions,
  TextField,
  IconButton,
  Collapse,
  styled,
  IconButtonProps
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useEffect, useState } from 'react';
import { selectUICheckout, updateCheckout } from '../../store/ui/uiSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { debounce } from 'lodash';

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

interface OrderNoteProps {
  SetNoteField: (note: string) => Promise<void>;
}

const OrderNote = ({ SetNoteField }: OrderNoteProps) => {
  const dispatch = useAppDispatch();
  const { orderNote: note } = useAppSelector(selectUICheckout);
  const [expanded, setExpanded] = React.useState(note ? true : false);
  const [orderNote, setOrderNote] = useState('');
  const debouncedSetNoteField = debounce(SetNoteField, 300);
  const debouncedDispatch = debounce(dispatch, 300);

  useEffect(() => {
    if (note) {
      setOrderNote(note);
      SetNoteField(orderNote);
    }
  }, []);

  useEffect(() => {
    debouncedDispatch(updateCheckout({ note: orderNote }));
    debouncedSetNoteField(orderNote);
  }, [orderNote]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box sx={{ p: '0px 8px 0px 8px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography fontWeight={'bold'}>{'Sipariş Notu'}</Typography>
        <CardActions disableSpacing>
          <ExpandMore expand={expanded} onClick={handleExpandClick}>
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {
          <TextField
            label="Sipariş Notu"
            onChange={(event) => setOrderNote(event.target.value)}
            multiline
            rows={4}
            maxRows={10}
            value={orderNote}
            sx={{ width: '100%' }}
          />
        }
      </Collapse>
    </Box>
  );
};

export { OrderNote };
