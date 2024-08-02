import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FormControl, Button, styled } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Display = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);

  const MainBox = styled('img')({
    width: '100%',
    height: '40vh',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  });

  const StyledFormContact = styled(FormControl)({
    display: 'flex',
    flexDirection: 'column',
  });

  const StyledInputContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between', // Align items horizontally
    marginTop: '20px',
  });

  const StyledButton = styled(Button)({
    marginTop: '20px',
    backgroundColor: '#6495Ed',
    color: 'white',
    width: '150px',
    height: '40px',
    '&:hover': {
      backgroundColor: '#F08080', // Change button color on hover
    },
  });

  const StyledTextInput = styled('input')({
    flex: '1',
    width: '80vw',
    fontSize: '20px',
    padding: '10px',
    outline: 'none',
    border: 'none',
    borderRadius: '5px',
  });

  const StyledTextArea = styled('textarea')({
    width: '100%',
    height: 'auto',
    padding: '10px',
    marginTop: '20px',
    border: 'none',
    outline: 'none',
    borderRadius: '5px',
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:1025/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to fetch post');
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1025/${id}`);
      console.log("User deleted successfully");
      navigate('/home');
    } catch (error) {
      console.log("Error deleting user:", error);
      alert('Error deleting post');
    }
  };

  const defaultImageUrl = 'https://images.unsplash.com/photo-1496167117681-944f702be1f4?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  return (
    <div>
      <MainBox 
        src={post ? `http://localhost:1025/${post.picture}` : defaultImageUrl} 
        alt="Post Image" 
        onError={(e) => e.target.src = defaultImageUrl} 
      />
      <DeleteIcon onClick={() => handleDelete(post._id)} style={{ color: '#F08080', float: 'right', width: "50px" }} />
      {post ? (
        <StyledFormContact>
          <StyledInputContainer>
            <form>
              <label htmlFor="file">
                <input style={{ display: 'none' }} type="file" id="file" name="file" />
                <AddCircleIcon color="action" fontSize="large" />
              </label>
            </form>
            <StyledTextInput type="text" placeholder="Title" name="title" value={post.title} readOnly />
            {/* <StyledButton>Publish</StyledButton> */}
          </StyledInputContainer>

          <p style={{ textAlign: 'right', color: '#D3D3D3' }}>{new Date(post.createdDate).toLocaleDateString()}</p>
          <StyledTextArea placeholder="Write Down Your Thoughts" minRows={5} name="description" value={post.description} readOnly />
        </StyledFormContact>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Display;
