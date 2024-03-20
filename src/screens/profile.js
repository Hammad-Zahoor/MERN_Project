import React, { useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import "../screens/profile.css"

export default function Profile() {

  const [profile, setprofile] = useState([])
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
    //console.log("profile",profile)
  }

  useEffect(() => {
    load_data()
  }, [])

  return (
    <>
      <Navbar />
      <div className='profile-body'>
      {
      profile !== [] ? (
          profile.map((item, index) => (
            <div key={index}>{item[0].name}</div>
          ))
        ) : (
          <div>No data available</div>
        )}

        <img className='profile-pic'></img>
        <form action="/upload" method="POST" enctype="multipart/form-data" className='image-post'>
          <input type="file" id="imageInput" name="image" accept="image/*" className='profile-image'></input>
          <label for="imageInput" class="custom-file-input-label">+</label>
        </form>
        <h3>{profile.length !== 0 ? profile[0][0].name : 'No data available'}</h3>
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
        <button className='create-post'>Create Post</button>
        <button className='create-post'>Follow</button>
        <h1>
          POSTS
        </h1>

        <div className='profile-post'>
          <image className='post-image'></image>
          <div className='post-likes'>
            <button>Like</button>
            <button>Comment</button>
          </div>
        </div>

      </div>
      <Footer />
    </>
  )
}