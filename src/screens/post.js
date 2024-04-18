import React, { useEffect, useState } from 'react';
import "../screens/post.css"
import Navbar from "../components/navbar"
import Footer from '../components/footer'
import { useNavigate } from 'react-router-dom'
import firebase from "firebase/compat/app"
import "firebase/compat/storage"
import 'firebase/compat/auth';
import firebaseConfig from './firebase';

export default function Post() {

  const navigate = useNavigate();
  const [post_, setpost_] = useState({ caption: "", image: "", likes_count: 0, comments: [], userID: "" });
  firebase.initializeApp(firebaseConfig);

  const handle_fileupload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(file.name);
      fileRef.put(file)
        .then((snapshot) => {
          snapshot.ref.getDownloadURL()
            .then((downloadURL) => {
              setpost_({ ...post_, image: downloadURL });
              console.log("uploaded successfully");
            })
            .catch((error) => {
              console.error("Error getting download URL:", error);
            });
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    } else {
      console.log("No file selected");
    }
  };


  const handleSubmit = async (e) => {
    console.log("Post", post_)
    if (!post_.userID) {
      console.error("UserID is missing.");
    }

    const response = await fetch("http://localhost:5000/api/create_post", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post_)
    });
    try {
      const json = await response.json();
      console.log(json);
      if (!json.success) {
        alert("Enter valid credentials");
      }
      else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
      alert("Error parsing JSON response");
    }
  };

  useEffect(()=>{
    const ID = localStorage.getItem("auth_token");
    setpost_({ ...post_, userID: ID });
  },[])

  const onChange = (event) => {
    const { name, value } = event.target;
    setpost_({ ...post_, [name]: value });
  };


  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <div className='post'>
          <input type='text' className='post-text' placeholder='Write anything about your post' name="caption" value={post_.caption} onChange={onChange}></input>

          <img className='post-pic'></img>
          <form action="/upload" method="POST" enctype="multipart/form-data" className='image-post'>
            <input type="file" onChange={handle_fileupload} id="imageInput" name="image" accept="image/*" className='profile-image'></input>
            <label for="imageInput" class="custom-file-input-label">+</label>
          </form>
          <button className='post-button'>POST</button>
        </div>
      </form>
      <Footer />
    </>
  )
}
