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
  }, [category]);

  return (
    <div className="category">
      <h1><span>{category.slice(0,1).toUpperCase() + category.slice(1)}</span> Posts</h1>
      <div className="cards-container">
        {catPosts.map((post, index) => (
          <Card key={post.id} post={post} animate={true} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPosts;
