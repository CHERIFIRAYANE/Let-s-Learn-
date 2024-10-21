import { GoogleLogin } from '@react-oauth/google';
import React from 'react';
import { jwtDecode } from "jwt-decode";
import { useState,useEffect } from 'react';
import axios from 'axios';


 

function HandleSuccess(credentialResponse) {

    const [user,setuser]=useState({ email: '', family_name: '', image_url: '', name: '' ,profile_image: ''});
    console.log('Encoded JWT ID token', credentialResponse);
    var userobject = jwtDecode(credentialResponse.credential);

    console.log('user userobject',userobject);

   
    
    axios.get(`http://127.0.0.1:8000/api/user/`+userobject.email)
      .then(response => {
          
          // User already exists, set the user data
          console.log('response.data get',response.data.user)
          
          setuser(response.data.user);
      })
      
      .catch(error => {
        if (error.response && error.response.status === 404) {
    axios.post("http://127.0.0.1:8000/api/users/", {
      email: userobject.email,
      name: userobject.given_name,
      family_name: userobject.family_name,
      image_url:userobject.picture ,

    })
    .then(response => {

      console.log('response.data post',response.data.user)
      setuser(response.data.user);
    })
    .catch(error => {
      console.error('Error creating user:', error);
    });
  }
});
  
  useEffect(() => {
    // Trigger fetchData when user.email changes
    console.log('user data',user)
  }, [user]);

  }
  export default HandleSuccess