import React, { useEffect } from "react";
import { useLocation } from "react-router";
import Card from "../components/card/Card";
import { posts } from "../data";

const CategoryPosts = () => {

  const location = useLocation();
  const category = location.pathname.split("/")[3];

  const catPosts = posts.filter((post) => post.cat === category);
  
  useEffect(() => {
    document.title = `Blog APP | ${category.slice(0, 1).toUpperCase() + category.slice(1)}`;
  },[category]);
  
  return (
    <div className="category">
      {catPosts.map((post, index) => (
        <Card key={post.id} post={post} animate={index > 2 ? true : false} />
      ))}
    </div>
  );
};

export default CategoryPosts;
