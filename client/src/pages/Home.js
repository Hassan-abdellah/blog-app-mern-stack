import React, { useEffect } from 'react'
import Card from '../components/card/Card';

import { posts } from '../data';
const Home = () => {

    useEffect(() => {
        document.title = 'Blog APP | Home';
    }, []);
    return (
        <div className="home">
            <div className="cards-container">
                {posts.map((post, index) => (
                    <Card key={post.id} post={post} animate={true} />
                ))}
            </div>
        </div>
    )
}

export default Home;
