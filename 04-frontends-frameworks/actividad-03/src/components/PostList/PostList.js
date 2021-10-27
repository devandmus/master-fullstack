import React, { useState, useEffect } from 'react';
import Post from '../Post';
import PropTypes from 'prop-types';
import PostListStyled from './styles/PostListStyled';

// incorporo search basado en sugerencia de la actividad anterior
const PostList = ({ posts, search }) => {
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    if (loading) {
      const timer = () => setTimeout(() => setLoading(false), 3000);
      const timerId = timer();
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [loading, posts]);

  useEffect(() => {
    setLoading(true);
  }, [posts]);

  return (
    <PostListStyled>
      {loading ? <h3>Loading...</h3> : (
        posts
          .filter(post => post.text
            .toLowerCase()
            .includes(search.toLowerCase())
          )
          .map(post => (
            <Post
              key={post.id}
              id={post.id}
              image={post.img}
              author={post.user}
              createdAt={new Date(post.time)}
              comments={post.comments}
              text={post.text}
            />
          ))
      )}
    </PostListStyled>
  );
};

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
}

export default PostList;
