import React from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import '../screens/home.css'

export default function Home() {
  return (
    <>
      <Navbar />
      <div className='main-body'>
        <div>
          <input type="text" className="search-input" name="q" placeholder="Search..."></input>
          <button className='search-button' type='submit'>Search</button>
        </div>
        <div className='home-post'>
          <h4>Hammad Zahoor</h4>
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
