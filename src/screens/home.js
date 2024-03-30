import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import '../screens/home.css';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [post_home, setPostHome] = useState([]);
  const navigate = useNavigate();
  const [search_text, setsearch_text] = useState("")

  const onChange = (event) => {
    const { name, value } = event.target;
    setsearch_text({ ...search_text, [name]: value });
  };

  const handle_searches = async (e) =>{
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/search_user", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(search_text)
    });
    try {
      const json = await response.json();
      console.log(json)
      navigate('/Search')
    } catch (error) {
      console.error("Error parsing JSON:", error);
      alert("Error parsing JSON response");
    }
  }
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/get_post");
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        setPostHome(data);
        //console.log(data); // Log the fetched data for debugging
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className='main-body'>
        <form onSubmit={handle_searches}>
          <input type="text" className="search-input" name="search" placeholder="Search..." value={search_text.search} onChange={onChange} />
          <button className='search-button' type='submit'>Search</button>
        </form>
        {post_home.map((post, index) => (
          <div key={index}>
            <div className='home-post'>
              <h4>{post.caption}</h4>
              <img src={post.length !== 0 ? post.image : 'No data available'} alt='Post' className='post-image' />
              <div className='post-likes'>
                <button className='home-post-like'>Like</button>
                <button className='home-post-like'>Comment</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
