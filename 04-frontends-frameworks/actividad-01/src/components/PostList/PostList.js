import React from 'react';
import Post from '../Post';
import data from './data.json';
import PostListStyled from './styles/PostListStyled';

const PostList = () => {
  return (
    <PostListStyled>
      {data.map(post => (
        <Post
          key={post.img}
          img={post.img}
          user={post.user}
          likes={post.likes}
          time={post.time}
          comments={post.comments}
          description={post.description}
        />
      ))}
    </PostListStyled>
  );
};

export default PostList;
