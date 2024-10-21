// UserProfile.js

import React, { useState, useEffect,useRef } from 'react';
import './profile.css'; // Import your CSS file
import { Scrollbar } from 'smooth-scrollbar-react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
const Profile = () => {
  const location = useLocation();
  const UserEmail = location.state
  const fileInputRef = useRef(null);
  const [userInfo, setUserInfo] = useState({});
  const [isloading, setIsLoading] = useState(false);
  useEffect(() => {
  axios.get(`http://127.0.0.1:8000/api/user/`+UserEmail)
  .then(response => {
      // User already exists, set the user data
      setUserInfo(response.data.user);
      
  })
  .catch(error => {
    console.error('Error creating user:', error);
  });
}, [UserEmail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setIsLoading(true)
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'zyypfdhc');
  
      axios.post('https://api.cloudinary.com/v1_1/dvs9xxwxh/image/upload', formData)
        .then(response => {
          const cloudinaryUrl = response.data.secure_url;
          setUserInfo({
            ...userInfo,
            profile_image:cloudinaryUrl.substring(0, cloudinaryUrl.lastIndexOf('.')),
          });
          setIsLoading(false)
          console.log('Image added to cloudinary') 
        })
        
        .catch(error => {
          console.error('Error uploading image to Cloudinary:', error);
        });
    }
  };


  const updateUser = () => {
    axios.patch(`http://127.0.0.1:8000/api/user/${UserEmail}`, {
      email: userInfo.email,
      name: userInfo.given_name,
      family_name: userInfo.family_name,
      profile_image:userInfo.profile_image ,
    })
      .then(response => {
        // Handle successful update
        console.log('User info updated:');
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
      
      {userInfo.profile_image ? (
              <img
                src={userInfo.profile_image}
                alt="Profile"
                className="profile-image"
                style={{ width: '150px', height: '110px', borderRadius: '50%' }}
              />
            ) : (
              <img
                src={userInfo.image_url}
                alt="Profile"
                className="profile-image"
                style={{ width: '100px', height: '90px', borderRadius: '50%' }}
              />
            )}
            <div className="file-input-container">
              
               <input
               type="file"
               id="profileImage"
               name="profileImage"
               accept="image/*"
               className="hidden-input"
               onChange={handleImageChange}
               />
               
            <label htmlFor="profileImage" className="file-label">
             Select Image
             </label>
             {isloading && <p>Please wait while the image is loading...</p>}
              
            
            </div>
      </div>
      
      <div className="profile-info">
      <div className="user-name">{userInfo.name} {userInfo.familyname}</div>
      
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={userInfo.email}
          onChange={handleChange}
        />

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={userInfo.name}
          onChange={handleChange}
        />

        <label htmlFor="familyname">Family Name:</label>
        <input
          type="text"
          id="family_name"
          name="family_name"
          value={userInfo.family_name}
          onChange={handleChange}
        />

<div className="additional-info">
{userInfo.description && userInfo.description !== '' && (
          <div className="additional-info">
            <label>Teacher's description </label>
            <textarea
              id="description"
              name="description"
              value={userInfo.description}
              onChange={handleChange}
              placeholder="Write a brief description about yourself..."
            ></textarea>
          </div>
        )}

        </div>
        <button
        onClick={updateUser}
        style={{
          padding: '10px 20px',
          borderRadius: '5px',
          border: 'none',
          backgroundColor: '#4CAF50',
          color: 'white',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          transition: 'background-color 0.3s',
        }}
      >
        Update
      </button>
      </div>
     
    </div>
  );
};

export default Profile;
