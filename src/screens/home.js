import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Comment from '../screens/comment';
import '../screens/home.css';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [post_home, setPostHome] = useState([]);
  const [search_text, setSearchText] = useState('');
  const navigate = useNavigate();

  // State to track whether each post's modal should be open
  const [openModals, setOpenModals] = useState({});

  const handleOpenModal = (postId) => {
    setOpenModals((prev) => ({ ...prev, [postId]: true }));
  };

  const handleCloseModal = (postId) => {
    setOpenModals((prev) => ({ ...prev, [postId]: false }));
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setSearchText({ ...search_text, [name]: value });
  };

  const handle_searches = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/search_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(search_text),
    });
    try {
      const json = await response.json();
      console.log(json);
      navigate('/Search');
    } catch (error) {
      console.error('Error parsing JSON:', error);
      alert('Error parsing JSON response');
    }
  };

  const handle_like = async (postId) => {
    const authToken = localStorage.getItem('auth_token');
    try {
      const response = await fetch(`http://localhost:5000/api//likes_count/${postId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log('error liking post', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/get_post');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        setPostHome(data);
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
          <input
            type='text'
            className='search-input'
            name='search'
            placeholder='Search...'
            value={search_text.search}
            onChange={onChange}
          />
          <button className='search-button' type='submit'>
            Search
          </button>
        </form>
        {post_home.map((post, index) => (
          <div key={index}>
            <div className='home-post'>
              <h4>{post.caption}</h4>
              <img src={post.length !== 0 ? post.image : 'No data available'} alt='Post' className='post-image' />
              <div className='post-likes'>
                <button className='home-post-like' onClick={() => handle_like(post._id)}>
                  Like
                </button>
                <button className='home-post-like' onClick={() => handleOpenModal(post._id)}>
                  Comment
                </button>
                {openModals[post._id] && <Comment postId={post._id} onClose={() => handleCloseModal(post._id)} />}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
