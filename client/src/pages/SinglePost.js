import React, { useEffect } from 'react'
import { useLocation } from 'react-router';
import {posts} from '../data';

const SinglePost = () => {
    
    const location = useLocation();
    const path = location.pathname.split('/')[2];

    const post = posts.find(post => post.id.toString() === path);

    useEffect(() => {
        document.title = `Blog APP | ${post.title}`;
    },[]);
    return (
        <div className="post">
            <div className="post-img">
                <img src={post.img} alt=""/>
            </div>
            <div className="post-body">
                <h1 className="post-title">{post.title}</h1> 
                <p className="post-desc">{post.longDesc}</p>
            </div>
        </div>
    )
}

export default SinglePost;
