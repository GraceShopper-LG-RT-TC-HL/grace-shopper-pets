import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';
import {
  AppBar,
  Container,
  Toolbar,
  Tooltip,
  Typography,
  Box,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Link,
  Avatar,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

const Nav = () => {
  const { auth, cart } = useSelector((state) => state);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [pages, setPages] = useState([]);
  const [accPages, setAccPages] = useState([]);
  const dispatch = useDispatch();
  let totalQuantity = 0;
  cart.lineItems.forEach((lineItem) => (totalQuantity += lineItem.quantity));

  useEffect(() => {
    if (auth.id && auth.isAdmin) {
      setPages([
        { name: 'Home', link: '/' },
        { name: 'Products', link: '/products' },
      ]);
      setAccPages([{ name: 'Profile', link: '/profile' }]);
    } else if (auth.id && !auth.isAdmin) {
      setPages([
        { name: 'Home', link: '/' },
        { name: 'Products', link: '/products' },
        { name: 'Orders', link: '/orders' },
      ]);
      setAccPages([{ name: 'Profile', link: '/profile' }]);
    } else {
      setPages([
        { name: 'Home', link: '/' },
        { name: 'Products', link: '/products' },
      ]);
      setAccPages([{ name: 'Login', link: '/login' }]);
    }
  }, [auth]);

  const handleOpenNavMenu = (ev) => {
    setAnchorElNav(ev.currentTarget);
  };
  const handleOpenUserMenu = (ev) => {
    setAnchorElUser(ev.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, _idx) => {
                return (
                  <MenuItem
                    key={_idx}
                    onClick={handleCloseNavMenu}
                  >
                    <Link
                      component={RouterLink}
                      underline='none'
                      to={page.link}
                    >
                      {page.name}
                    </Link>
                  </MenuItem>
                );
              })}
              {auth.isAdmin ? (
                ''
              ) : (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link
                    component={RouterLink}
                    underline='none'
                    to={'/cart'}
                  >
                    {`Cart (${totalQuantity})`}
                  </Link>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
            {pages.map((page, _idx) => {
              return (
                <Button
                  key={_idx}
                  component={RouterLink}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  to={page.link}
                >
                  {page.name}
                </Button>
              );
            })}
            {auth.isAdmin ? (
              ''
            ) : (
              <Button
                component={RouterLink}
                sx={{ my: 2, color: 'white', display: 'block' }}
                to={'/cart'}
              >
                {`Cart (${totalQuantity})`}
              </Button>
            )}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Account settings'>
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
              >
                <Avatar
                  src={
                    auth.id
                      ? auth.imgUrl
                      : 'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png'
                  }
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {accPages.map((page, _idx) => (
                <MenuItem
                  key={_idx}
                  onClick={handleCloseUserMenu}
                >
                  <Link
                    component={RouterLink}
                    underline='none'
                    to={page.link}
                  >
                    {page.name}
                  </Link>
                </MenuItem>
              ))}
              {!!auth.id && (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link
                    component='button'
                    underline='none'
                    onClick={() => dispatch(logout())}
                  >
                    Logout
                  </Link>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Nav;
