import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import './card.css';
import { Link } from 'react-router-dom';

const Card = ({post, animate}) => {

    useEffect(() => {
        AOS.init({
            duration: 2000
        });
    },[]);
    return (
        <div className="card" data-aos={animate ? "fade-up" : ""}>
            <Link className="nav-link" to={`/post/${post.id}`}>
            <div className="card-img">
                <img src={post.img} alt=""/>
            </div>
            <h2 className="card-title">{post.title.length > 32 ? post.title.slice(0,32) : post.title}</h2> 
            <p className="card-desc">{post.desc.slice(0,50)}...</p>
            <div className="card-button">
                <button className="btn">
                    <span>Read More</span>
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>
            </Link>
        </div>
    )
}

export default Card;
