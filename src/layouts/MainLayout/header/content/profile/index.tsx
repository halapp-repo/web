import {
  Avatar,
  Box,
  ButtonBase,
  ClickAwayListener,
  Paper,
  Popper,
  List,
  ListItem,
  Divider,
  ListItemText,
  Card,
  ListItemButton,
  ListItemIcon
} from '@mui/material';
import { ScheduleOutlined, ShopOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import Transitions from '../../../../../components/Transitions';
import { LogoutOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../../../../store/hooks';
import { signOut } from '../../../../../store/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { stringToHslColor } from '../../../../../utils/avatar';

const iconBackColorOpen = 'grey.300';

interface ProfileProps {
  email: string;
}

const Profile = (props: ProfileProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
      return;
    }
    setOpen(false);
  };

  const handleSignOut = async () => {
    await dispatch(signOut());
    setOpen(false);
  };

  const handleOpenOrganizationList = () => {
    navigate('/organization/list');
    setOpen(false);
  };
  const handleOpenOrderList = () => {
    navigate('/orders');
    setOpen(false);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : 'transparent',
          borderRadius: 1,
          '&:hover': { bgcolor: 'secondary.lighter' }
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}>
        <Avatar
          alt={props.email?.[0]}
          sx={{ width: 32, height: 32, bgcolor: stringToHslColor(props.email, 80, 50) }}>
          {props.email?.[0]}
        </Avatar>
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 15]
              }
            }
          ]
        }}>
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            {open && (
              <Paper
                sx={{
                  width: 290,
                  minWidth: 240,
                  maxWidth: 290
                }}>
                <ClickAwayListener onClickAway={handleClose}>
                  <Card>
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                      <ListItem disablePadding>
                        <ListItemButton onClick={handleOpenOrganizationList}>
                          <ListItemIcon>
                            <ShopOutlined />
                          </ListItemIcon>
                          <ListItemText
                            primary={'Şirketlerim'}
                            primaryTypographyProps={{ fontSize: '15px' }}
                          />
                        </ListItemButton>
                      </ListItem>
                      <Divider component="li" />
                      <ListItem disablePadding>
                        <ListItemButton onClick={handleOpenOrderList}>
                          <ListItemIcon>
                            <ScheduleOutlined />
                          </ListItemIcon>
                          <ListItemText
                            primary={'Siparişlerim'}
                            primaryTypographyProps={{ fontSize: '15px' }}
                          />
                        </ListItemButton>
                      </ListItem>
                      <Divider component="li" />
                      <ListItem disablePadding>
                        <ListItemButton onClick={handleSignOut}>
                          <ListItemIcon>
                            <LogoutOutlined />
                          </ListItemIcon>
                          <ListItemText
                            primary="Çıkış yap"
                            primaryTypographyProps={{ fontSize: '15px' }}
                          />
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </Card>
                </ClickAwayListener>
              </Paper>
            )}
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Profile;
