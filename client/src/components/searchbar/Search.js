import React, { useEffect, useState } from 'react';
import './search.css';
import { posts } from '../../data';
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from 'react-router-dom';
import Magnifier from './search.svg';
const Search = ({setActive}) => {
    const [query, setQuery] = useState('');
    const [filteredList, setFilteredList] = useState([]);
    const searchPost = (e) => {
        setQuery(e.target.value);
        const matchedPosts = posts.filter(post => post.title.toLocaleLowerCase().includes(query.trim()));
        // if (matchedPosts.length > 0) {
        setFilteredList(matchedPosts);
        // }
    }
    useEffect(() => {
        const getClickOutside = (e) => {
            if (query && !e.target.classList.contains(".filtered-list") && e.target.id !== 'search') {
                setQuery('');
            }
        };
        document.addEventListener("click", getClickOutside);
        return () => {
            document.removeEventListener("click", getClickOutside);
        };
    }, [query]);
    return (
        <div className='search-input-container'>
            {/* <input type="search" placeholder='Search Posts...' value={query} onChange={searchPost} /> */}
            <input type="search" value={query} onChange={searchPost} id="search" required/>
            <label htmlFor="search" className='search-label'>
                <img src={Magnifier} alt="search-magnifier" />
                <span>Search Posts...</span>
            </label>
            <AnimatePresence>
                {query && (
                    <motion.div
                        initial={{opacity: 0 }}
                        animate={{opacity: 1 }}
                        exit={{opacity: 0 }}
                        transition={{ type: "spring", ease: "easeInOut", stiffness: "100", duration: 0.75 }}
                        className="filtered-list">
                        <ul className="filtered-list-items">
                            {filteredList.length > 0 ? filteredList.map(post => (
                                <li key={post.id} className='filtered-list-item'>
                                    <NavLink to={`/post/${post.id}`} onClick={() => {setQuery(''); setActive(false)}}>{post.title.slice(0, 30) + '...'}</NavLink>
                                </li>
                            )) : <h3>No Articles Found</h3>}
                        </ul>
                    </motion.div>

                )}
            </AnimatePresence>
        </div>
    );
};

export default Search;
