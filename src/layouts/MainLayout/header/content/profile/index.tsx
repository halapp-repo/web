import {
  Avatar,
  Box,
  ButtonBase,
  ClickAwayListener,
  Paper,
  Popper,
  Stack,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Typography,
  Card,
  ListItemButton,
  ListItemIcon
} from '@mui/material';
import { UserOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import Transitions from '../../../../../components/Transitions';
import { LogoutOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../../../../store/hooks';
import { signOut } from '../../../../../store/auth/authSlice';

const iconBackColorOpen = 'grey.300';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name)
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
  };
}

interface ProfileProps {
  email: string;
}

const Profile = (props: ProfileProps) => {
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
        <Avatar alt="profil" sx={{ width: 32, height: 32 }}>
          {props.email?.toUpperCase()[0]}
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
                        <ListItemButton>
                          <ListItemIcon>
                            <UserOutlined />
                          </ListItemIcon>
                          <ListItemText
                            primary={'Kişisel Hesap'}
                            primaryTypographyProps={{ fontSize: '15px' }}
                            secondary={props.email}
                            secondaryTypographyProps={{ fontSize: '10px' }}
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
