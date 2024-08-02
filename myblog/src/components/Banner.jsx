import React from 'react';
import { Typography, styled, Box } from '@mui/material';
import BannerImage from './images/Bannerimg.png'; // Adjust the path based on your project structure

const MainBox = styled(Box)`
  width: 100%;
  background: url(${BannerImage}) no-repeat center fixed; 
  background-size: cover; 
  height: 65vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;



const Banner = () => {
  return (
    <div>
      <MainBox>
       
      </MainBox>
    </div>
  );
};

export default Banner;
