import React from 'react';
import { AppBar, Toolbar, Typography, styled } from '@mui/material';
import { Link } from 'react-router-dom';

// Define styled components
const StyledAppBar = styled(AppBar)({
  // backgroundColor: '#007bff', 
  // background: '#C9D6FF',  /* fallback for old browsers */
  // background: '-webkit-linear-gradient(to right, #E2E2E2, #C9D6FF)',  /* Chrome 10-25, Safari 5.1-6 */
  // background: 'linear-gradient(to right, #E2E2E2, #C9D6FF)', 
  background:'none',
  boxShadow:' rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset',
})

const StyledToolbar = styled(Toolbar)({
  justifyContent: 'center', 
});

const StyledTypography = styled(Typography)({
  margin: '0 20px', 
  color: 'Black', 
  cursor: 'pointer', 
  textDecoration: 'none', 
  '&:hover': {
    color: 'gray', 
  },
});

const Header = () => {
  return (
    <div>
      <StyledAppBar position="static">
        <StyledToolbar>
          <StyledTypography component={Link} to='/home'>Home</StyledTypography>
          <StyledTypography component={Link} to="/about">About</StyledTypography>
          <StyledTypography component={Link} to='/contact'>Contact</StyledTypography>
          <StyledTypography component={Link} to="/login">Logout</StyledTypography>
        </StyledToolbar>
      </StyledAppBar>
    </div>
  );
};

export default Header;
