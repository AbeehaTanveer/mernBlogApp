import React, { useState } from 'react';
import { Box, Button, Typography, styled } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const MainComponent = styled('div')`

  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
`;

const Container = styled(Box)`
  width: 420px;
  padding: 30px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageContainer = styled(Box)`
  text-align: center;
  margin-bottom: 20px;
`;

const Image = styled('img')`
  width: 180px;
  height: 180px;
  border-radius: 50%;
`;

const MyButton = styled(Button)`
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 25px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const SignupButton = styled(Button)`
  text-transform: none;
  font-size: 14px;
  color: #007bff;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const Navigate = useNavigate();
  const ImagBlog = 'https://tse4.mm.bing.net/th?id=OIP.5K2wemUdHod-za8MCzEkYgAAAA&pid=Api&P=0&h=220';

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const GoToLogin = () => {
    Navigate('/Login');
  };

  const postapi = async () => {
    try {
      const res = await axios.post("http://localhost:1025/Signup", {
        name,
        email,
        password
      });
      Navigate('/Home');
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainComponent>
      <Container>
        <ImageContainer>
          <Image src={ImagBlog} alt="Blog image" />
        </ImageContainer>
        <Typography variant="h5" gutterBottom style={{ color: '#007bff', textAlign: 'center', marginBottom: '20px' }}>
          Signup
        </Typography>
        <TextField id="outlined-basic-name" label="Name" value={name} onChange={handleNameChange} variant="outlined" fullWidth style={{ marginBottom: '10px', borderRadius: '25px' }} />
        <TextField id="outlined-basic-email" label="Email" value={email} onChange={handleEmailChange} variant="outlined" fullWidth style={{ marginBottom: '10px', borderRadius: '25px' }} />
        <TextField id="outlined-basic-password" label="Password" value={password} onChange={handlePasswordChange} variant="outlined" fullWidth style={{ marginBottom: '20px', borderRadius: '25px' }} />
        <MyButton onClick={postapi} variant="contained">Signup</MyButton>
        <Typography style={{ marginTop: '20px', textAlign: 'center' }}>
          Already have an account? <SignupButton onClick={GoToLogin}>Login here</SignupButton>
        </Typography>
      </Container>
    </MainComponent>
  );
};

export default Signup;
