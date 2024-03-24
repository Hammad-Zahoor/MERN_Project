import React from 'react'
import "../screens/post.css"
import Navbar from "../components/navbar"
import Footer from '../components/footer'

export default function Post() {
  return (
    <>
      <Navbar />
      <div className='post'>
        <input type='text' className='post-text' placeholder='Write anything about your post'></input>
        <img className='post-pic'></img>
        <form action="/upload" method="POST" enctype="multipart/form-data" className='image-post'>
          <input type="file" id="imageInput" name="image" accept="image/*" className='profile-image'></input>
          <label for="imageInput" class="custom-file-input-label">+</label>
        </form>
        <button className='post-button'>POST</button>
      </div>
      <Footer />
    </>
  )
}
