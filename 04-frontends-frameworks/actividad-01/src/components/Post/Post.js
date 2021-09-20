import React from 'react';
import PropTypes from 'prop-types';
import { BsFillHeartFill } from 'react-icons/bs';
import {
  CardStyled,
  CardContent,
  ImageStyled,
  LikeStyled,
} from './styles/PostStyled';
import { ReactComponent as CommentsIcon } from './post.svg';
import { likesParser } from '../helpers';

const Post = ({ img, time, user, likes, description, comments }) => {
  return (
    <CardStyled>
      <ImageStyled img={ img } />
      <CardContent>
        <header>
          <time>{ time }</time>
          <LikeStyled className='bg-danger'>
            <BsFillHeartFill />
            <p>{ likesParser(likes) }</p>
          </LikeStyled>
        </header>
        <div>
          <h5 className='fw-bold'>{ user }</h5>
          <p>{ description }</p>
        </div>
        <footer>
          <CommentsIcon />
          <p>Comments ({ comments })</p>
        </footer>
      </CardContent>
    </CardStyled>
  );
};

Post.propTypes = {
  img: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  comments: PropTypes.number.isRequired,
}

export default Post;
