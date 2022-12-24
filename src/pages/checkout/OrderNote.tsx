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
import { selectUICheckoutOrderNote, updateCheckoutOrderNote } from '../../store/ui/uiSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

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
  SetNote: (note: string) => Promise<void>;
}

const OrderNote = ({ SetNote }: OrderNoteProps) => {
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = React.useState(false);
  const [orderNote, setOrderNote] = useState(useAppSelector(selectUICheckoutOrderNote) || '');

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      dispatch(updateCheckoutOrderNote(orderNote));
      SetNote(orderNote);
    }, 1000);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [orderNote]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box sx={{ p: '0px 8px 0px 8px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography fontWeight={'bold'}>{'Sipariş Notunuz'}</Typography>
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
