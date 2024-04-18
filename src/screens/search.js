import React, { useEffect, useState } from 'react';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../screens/search.css";
import { Link } from 'react-router-dom';

const Search = () => {
    const [search_result, setSearchResult] = useState([]);

    useEffect(() => {
        const fetchSearch = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/get_search");
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
    
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error('Invalid content type. Expected JSON.');
                }
    
                const data = await response.json();
                setSearchResult(data);
                console.log(data); // Log the fetched data for debugging
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchSearch();
    }, []);
    

    return (
        <>
            <Navbar />
            {search_result.map((search, index) => (
          <div key={index}>
            <div className='search-page'>
                <h1 className=''>Searches</h1>
                <div className='profile_search'>
                    <img src={search.image} alt='Search Image' className='search-image' />
                    <Link to={`/Search_Profile/${search._id}`} className='search-name'>{search.name}</Link>
                </div>
            </div>
            </div>
            ))}
            <Footer />
        </>
    );
};


export default Search;
