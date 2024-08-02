import React, { useContext, useState } from 'react';
import { Box, Button, Typography, styled } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { DataContext } from './DataProvider'; 
const MainComponent = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
`;

const Container = styled(Box)`
  width: 360px;
  padding: 32px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled('img')`
  width: 180px;
  height: 170px;
  border-radius: 50%;
  margin-bottom: 24px;
`;

const MyButton = styled(Button)`
  background-color: #1976d2;
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
    background-color: #1565c0;
  }
`;

const SignupButton = styled(Button)`
  text-transform: none;
  font-size: 14px;
  color: #1976d2;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Login = ({ setAuthenticate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAccount } = useContext(DataContext)
  const Navigate = useNavigate();
  const ImagBlog = 'https://tse4.mm.bing.net/th?id=OIP.5K2wemUdHod-za8MCzEkYgAAAA&pid=Api&P=0&h=220';

  const GoToSignup = () => {
    Navigate('/Signup');
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:1025/Login", {
        email,
        password
      });
      console.log(response.data); // Handle successful login
      setAuthenticate(true)
      setAccount({ username: response.data.username, name: response.data.name })
      Navigate('/Home');
    } catch (error) {
      console.error("Error while logging in:", error);
      alert("Failed to login. Please try again.");
    }
  };

  return (
    <MainComponent>
      <Container>
        <Image src={ImagBlog} alt="Blog image" />
        <Typography variant="h5" gutterBottom style={{ color: '#1976d2', textAlign: 'center' }}>
          Login
        </Typography>
        <TextField id="outlined-email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} variant="outlined" fullWidth style={{ marginBottom: '20px', borderRadius: '25px' }} />
        <TextField id="outlined-password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} variant="outlined" fullWidth style={{ marginBottom: '20px', borderRadius: '25px' }} />
        <MyButton onClick={handleLogin} variant="contained">Login</MyButton>
        <Typography style={{ marginTop: '20px', textAlign: 'center' }}>
          Don't have an account? <SignupButton onClick={GoToSignup}>Signup here</SignupButton>
        </Typography>
      </Container>
    </MainComponent>
  );
};

export default Login;
