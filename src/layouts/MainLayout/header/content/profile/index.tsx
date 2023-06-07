import { ScheduleFilled, ScheduleOutlined, ShopFilled, ShopOutlined } from '@ant-design/icons';
import { LogoutOutlined } from '@ant-design/icons';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import {
  Avatar,
  Box,
  ButtonBase,
  Card,
  ClickAwayListener,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper
} from '@mui/material';
import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Transitions from '../../../../../components/Transitions';
import { User } from '../../../../../models/user';
import { selectUserAuth, signOut } from '../../../../../store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { selectUserProfile } from '../../../../../store/profile/profileSlice';
import { stringToHslColor } from '../../../../../utils/avatar';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const { isAdmin, email, id } = useAppSelector(selectUserAuth);
  const profile = useAppSelector(selectUserProfile);
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
  const handleOpenProfile = () => {
    navigate(`/profile/${id}`);
    setOpen(false);
  };
  const getAvatarImageContent = ({
    profile,
    email
  }: {
    profile?: User | null;
    email: string;
  }): string => {
    if (profile) {
      if (profile.Preview) {
        return profile.Preview as string;
      } else if (profile.BaseImageUrl) {
        return `${profile.BaseImageUrl}/32.png`;
      }
    }
    return email?.[0];
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? 'grey.300' : 'transparent',
          borderRadius: 1,
          '&:hover': { bgcolor: 'secondary.lighter' }
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}>
        <Avatar
          alt={getAvatarImageContent({
            email: email,
            profile: profile
          })}
          src={getAvatarImageContent({
            email: email,
            profile: profile
          })}
          sx={{ width: 32, height: 32, bgcolor: stringToHslColor(email, 80, 50) }}>
          {email?.[0]}
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
                        <ListItemButton onClick={handleOpenProfile}>
                          <ListItemIcon sx={{ fontSize: '24px' }}>
                            {location.pathname.includes('/profile') ? (
                              <AccountCircleIcon />
                            ) : (
                              <AccountCircleOutlinedIcon />
                            )}
                          </ListItemIcon>
                          <ListItemText
                            primary={'Profilim'}
                            primaryTypographyProps={{
                              fontSize: '15px',
                              paddingLeft: '20px',
                              fontWeight: location.pathname.includes('/profile')
                                ? 'bold'
                                : 'inherit'
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                      <Divider component="li" />

                      <ListItem disablePadding>
                        <ListItemButton onClick={handleOpenOrganizationList}>
                          <ListItemIcon sx={{ fontSize: '24px' }}>
                            {location.pathname.includes('/organization') ? (
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
                              fontWeight: location.pathname.includes('/organization')
                                ? 'bold'
                                : 'inherit'
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                      <Divider component="li" />

                      <ListItem disablePadding>
                        <ListItemButton onClick={handleOpenOrderList}>
                          <ListItemIcon sx={{ fontSize: '24px' }}>
                            {location.pathname.includes('/orders') ? (
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
                              fontWeight: location.pathname.includes('/orders') ? 'bold' : 'inherit'
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
                                {location.pathname.includes('/admin/orders') ? (
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
                                  fontWeight: location.pathname.includes('/admin/orders')
                                    ? 'bold'
                                    : 'inherit'
                                }}
                              />
                            </ListItemButton>
                          </ListItem>
                          <Divider component="li" />
                          <ListItem disablePadding sx={{ color: '#8753de' }}>
                            <ListItemButton onClick={handleOpenAdminOrganizationList}>
                              <ListItemIcon sx={{ fontSize: '24px' }}>
                                {location.pathname.includes('/admin/organizations') ? (
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
                                  fontWeight: location.pathname.includes('/admin/organizations')
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
