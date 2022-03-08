import React from 'react';
import Post from '../Post';
import PropTypes from 'prop-types';
import PostListStyled from './styles/PostListStyled';

const PostList = ({ posts }) => (
  <PostListStyled>
    {(
      posts
        .map(post => (
          <Post
            key={post.id}
            image={post.image}
            author={post.author.username}
            createdAt={new Date(post.createdAt)}
            comments={post.comments.length}
            likes={post.likes}
            text={post.text}
          />
        ))
    )}
  </PostListStyled>
)

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
}

export default PostList;
