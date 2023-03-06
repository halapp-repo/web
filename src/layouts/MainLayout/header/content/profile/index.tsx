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
import { ScheduleFilled, ScheduleOutlined, ShopFilled, ShopOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import Transitions from '../../../../../components/Transitions';
import { LogoutOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { selectUserAuth, signOut } from '../../../../../store/auth/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { stringToHslColor } from '../../../../../utils/avatar';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
const iconBackColorOpen = 'grey.300';

interface ProfileProps {
  email: string;
}

const Profile = (props: ProfileProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const { isAdmin } = useAppSelector(selectUserAuth);
  const location = useLocation();

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
    navigate('/');
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
  const handleOpenAdminOrderList = () => {
    navigate('/admin/orders');
    setOpen(false);
  };
  const handleOpenAdminOrganizationList = () => {
    navigate('/admin/organizations');
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
                          <ListItemIcon sx={{ fontSize: '24px' }}>
                            {location.pathname === '/organization/list' ? (
                              <ShopFilled />
                            ) : (
                              <ShopOutlined />
                            )}
                          </ListItemIcon>
                          <ListItemText
                            primary={'Şirketlerim'}
                            primaryTypographyProps={{
                              fontSize: '15px',
                              paddingLeft: '20px',
                              fontWeight:
                                location.pathname === '/organization/list' ? 'bold' : 'inherit'
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                      <Divider component="li" />

                      <ListItem disablePadding>
                        <ListItemButton onClick={handleOpenOrderList}>
                          <ListItemIcon sx={{ fontSize: '24px' }}>
                            {location.pathname === '/orders' ? (
                              <ScheduleFilled />
                            ) : (
                              <ScheduleOutlined />
                            )}
                          </ListItemIcon>
                          <ListItemText
                            primary={'Siparişlerim'}
                            primaryTypographyProps={{
                              paddingLeft: '20px',
                              fontSize: '15px',
                              fontWeight: location.pathname === '/orders' ? 'bold' : 'inherit'
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                      <Divider component="li" />
                      {isAdmin && (
                        <>
                          <ListItem disablePadding sx={{ color: '#8753de' }}>
                            <ListItemButton onClick={handleOpenAdminOrderList}>
                              <ListItemIcon sx={{ fontSize: '24px' }}>
                                {location.pathname === '/admin/orders' ? (
                                  <AdminPanelSettingsIcon sx={{ color: '#8753de' }} />
                                ) : (
                                  <AdminPanelSettingsOutlinedIcon sx={{ color: '#8753de' }} />
                                )}
                              </ListItemIcon>
                              <ListItemText
                                primary={'Orders (admin)'}
                                primaryTypographyProps={{
                                  paddingLeft: '20px',
                                  fontSize: '15px',
                                  fontWeight:
                                    location.pathname === '/admin/orders' ? 'bold' : 'inherit'
                                }}
                              />
                            </ListItemButton>
                          </ListItem>
                          <Divider component="li" />
                          <ListItem disablePadding sx={{ color: '#8753de' }}>
                            <ListItemButton onClick={handleOpenAdminOrganizationList}>
                              <ListItemIcon sx={{ fontSize: '24px' }}>
                                {location.pathname === '/admin/organizations' ? (
                                  <AdminPanelSettingsIcon sx={{ color: '#8753de' }} />
                                ) : (
                                  <AdminPanelSettingsOutlinedIcon sx={{ color: '#8753de' }} />
                                )}
                              </ListItemIcon>
                              <ListItemText
                                primary={'Organizations (admin)'}
                                primaryTypographyProps={{
                                  paddingLeft: '20px',
                                  fontSize: '15px',
                                  fontWeight:
                                    location.pathname === '/admin/organizations'
                                      ? 'bold'
                                      : 'inherit'
                                }}
                              />
                            </ListItemButton>
                          </ListItem>
                          <Divider component="li" />
                        </>
                      )}
                      <ListItem disablePadding>
                        <ListItemButton onClick={handleSignOut}>
                          <ListItemIcon sx={{ fontSize: '24px' }}>
                            <LogoutOutlined />
                          </ListItemIcon>
                          <ListItemText
                            primary="Çıkış yap"
                            primaryTypographyProps={{ fontSize: '15px', paddingLeft: '20px' }}
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
