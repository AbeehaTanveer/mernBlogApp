import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Post.css'; // Import the CSS file

const Post = () => {
  const [getres, setGetres] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the server
        const response = await axios.get('http://localhost:1025/create');
        // Set the fetched data to the state
        setGetres(response.data);
      } catch (error) {
        console.error("Error:", error);
        alert("No Data Found!");
      }
    };
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const defaultImageUrl = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  return (
    <div className="post-inline-container">
      {getres.length > 0 ? (
        // Map through the fetched data and display each post
        getres.map((get, index) => (
          <div className="post-container" key={get._id}>
            {/* Display the image using the URL from the fetched data */}
            <img 
              src={`http://localhost:1025/${get.picture}`} 
              alt="Post Image" 
              onError={(e) => e.target.src = defaultImageUrl} // Fallback to default image
            />
            <p className="post-title">Title: {get.title}</p>
            <p className="post-description">Description: {get.description}</p>
            <p className="post-category">Categories: {get.categories}</p>
            <p className="post-created-date">Date: {new Date(get.createdDate).toLocaleDateString()}</p>
            <Link style={{ textDecoration: 'none' }} to={`/display/${get._id}`}>
              <p className="post-created-date">View</p>
            </Link>
          </div>
        ))
      ) : (
        // Display a message if no data is available
        <div>NO DATA AVAILABLE</div>
      )}
    </div>
  );
};

export default Post;
