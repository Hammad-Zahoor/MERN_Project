import React, { useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import "../screens/profile.css"
import { Link } from 'react-router-dom'

export default function Profile() {

  const [profile, setprofile] = useState([])
  const [post_profile, setpost_profile] = useState([]);

  const load_data = async () => {
    let response = await fetch("http://localhost:5000/api/profile_data", {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      }
    })

    response = await response.json()
    setprofile(response)
    //console.log("data:",response)
    //console.log("profile", profile)
  }

  const fetchData = async () => {
    try {
      const authToken = localStorage.getItem("auth_token");
      //console.log(authToken)
      const response = await fetch("http://localhost:5000/api/get_profile_post", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "Content-Type": "application/json"
        }
      })
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      setpost_profile(data);
      //console.log(data); // Log the fetched data for debugging
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  }

  useEffect(() => {
    load_data()
    fetchData()
  }, [])

  return (
    <>
      <Navbar />
      <div className='profile-body'>

        <img className='profile-pic' src={profile.length !== 0 ? profile[0][0].image : 'No data available'}></img>
        <form action="/upload" method="POST" enctype="multipart/form-data" className='image-post'>
          <input type="file" id="imageInput" name="image" accept="image/*" className='profile-image'></input>
          <label for="imageInput" class="custom-file-input-label">+</label>
        </form>
        <h3>{profile.length !== 0 ? profile[0][0].name : 'No data available'} - {profile.length !== 0 ? profile[0][0].role : 'No data available'}</h3>
        <h3>{profile.length !== 0 ? profile[0][0].education : 'No data available'} - {profile.length !== 0 ? profile[0][0].major : 'No data available'}</h3>
        <div className='follow-body'>
          <div>
            <h3>20</h3>
            <h4>Followers</h4>
          </div>
          <div>
            <h3>20</h3>
            <h4>Following</h4>
          </div>
          <div>
            <h3>20</h3>
            <h4>Likes</h4>
          </div>
        </div>
        <Link className='create-post1' to="/Post">Create Post</Link>
        <button className='create-post'>Follow</button>
        <h1>
          POSTS
        </h1>

        {post_profile.map((post, index) => (
          <div key={index}>
            <div className='profile-post'>
              <h4 className='profile-caption'>"{post.caption}"</h4>
              <img src={post.length !== 0 ? post.image : 'No data available'} alt='Post' className='post-image' />
              <div className='post-likes'>
                <h4>{post.length !== 0 ? post.likes : 'No data available'}</h4>
                <button>Like</button>
                <h4>Comment</h4>
                <button>Comment</button>
              </div>
            </div>
          </div>
        ))}

      </div>
      <Footer />


    </>
  )
}