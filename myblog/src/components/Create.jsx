import React, { useState, useEffect, useContext } from 'react';
import { FormControl, Button, styled } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from './DataProvider';
import { singlefileuploaded, getSingleFiles } from './data/api';
import axios from 'axios';

const MainBox = styled('img')({
  width: '100%',
  height: '40vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  objectFit: 'cover',
});

const StyledFormContact = styled(FormControl)({
  display: "flex",
});

const StyledInputContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginTop: '20px',
});

const StyledButton = styled(Button)({
  backgroundColor: '#6495Ed',
  color: 'white',
  width: '150px',
  height: '40px',
  marginLeft: '10px',
  '&:hover': {
    color: "red",
  }
});

const StyledTextInput = styled('input')({
  flex: '1',
  width: '80vw',
  fontSize: '20px',
  padding: '10px',
  outline: "none",
  marginLeft: '10px',
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

const initialPost = {
  title: '',
  description: '',
  username: '',
  categories: '',
  createdDate: Date.now()
};

const defaultImageUrl = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const Create = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [post, setPost] = useState(initialPost);
  const { account } = useContext(DataContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showUploadedImages, setShowUploadedImages] = useState(true);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [imageUrl, setImageUrl] = useState(''); // State to store the current image URL
  const [single, setSingle] = useState();
  const [singlefile, setSinglefile] = useState([]);

  useEffect(() => {
    const uploadSingleFile = async () => {
      if (single) {
        try {
          const formData = new FormData();
          formData.append('file', single);
          await singlefileuploaded(formData);
          await getSingleFileRandom();
          setUploadSuccess(true);
          setCurrentImageIndex(0);
        } catch (error) {
          console.error('Error uploading file:', error);
          setShowUploadedImages(true);
        }
      }
    };
    uploadSingleFile();
  }, [single]);

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const response = await getSingleFiles();
        const latestImageUrl = response[currentImageIndex]?.filePath;
        setImageUrl(latestImageUrl);
      } catch (error) {
        console.error("Error fetching image URL:", error);
      }
    };
    fetchImageUrl();
  }, [currentImageIndex]);

  useEffect(() => {
    if (imageUrl) {
      setPost(prevPost => ({
        ...prevPost,
        picture: imageUrl
      }));
    }
  }, [imageUrl]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const singleFileChange = (e) => {
    setSingle(e.target.files[0]);
  };

  useEffect(() => {
    if (uploadSuccess) {
      setShowUploadedImages(true);
    }
  }, [uploadSuccess]);

  useEffect(() => {
    if (account) {
      updatePostState();
    }
  }, [account]);

  const getSingleFileRandom = async () => {
    try {
      const filelist = await getSingleFiles();
      setSinglefile(filelist);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSingleFileRandom();
  }, []);

  const createPost = async () => {
    try {
      updatePostState();
      await axios.post("http://localhost:1025/create", post);
      setPost(initialPost);
      navigate('/home');
    } catch (error) {
      console.error("Error:", error);
      alert("ERROR");
    }
  };

  const updatePostState = () => {
    setPost(prevPost => ({
      ...prevPost,
      categories: location.search?.split('=')[1] || 'All',
      username: account.username,
    }));
  };

  return (
    <div>
      <div>
        <img
          src={`http://localhost:1025/${singlefile[currentImageIndex]?.filePath || defaultImageUrl}`}
          name='pic'
          alt="Loading..."
          style={{ width: '100%', height: '50vh' }}
          onError={(e) => e.target.src = defaultImageUrl} // Fallback to default image
        />
      </div>

      <StyledFormContact>
        <StyledInputContainer>
          <form>
            <label htmlFor="file">
              <input style={{ display: 'none' }} type="file" id="file" name="file" onChange={singleFileChange} />
              <AddCircleIcon color='action' fontSize='large' />
            </label>
          </form>
          <StyledTextInput type="text" placeholder="Title" onChange={handleChange} name='title' />
          <StyledButton onClick={createPost}>Publish</StyledButton>
        </StyledInputContainer>
        <StyledTextArea placeholder="Write Down Your Thoughts" minRows={5} onChange={handleChange} name='description' />
      </StyledFormContact>
    </div>
  );
};

export default Create;
