import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BsFillHeartFill } from 'react-icons/bs';
import {
  CardStyled,
  CardContent,
  ImageStyled,
  LikeStyled,
} from './styles/PostStyled';
import { ReactComponent as CommentsIcon } from './post.svg';
import { likesParser, cooldownParser } from '../../helpers/Parsers';

const Post = ({ createdAt, author, text, comments, image, likes: dbLikes}) => {
  const [likes, setLikes] = useState(dbLikes);

  const handlerLike = () => setLikes(likes + 1);

  return (
    <CardStyled>
      <ImageStyled img={ image } />
      <CardContent>
        <header>
          <time>{ cooldownParser(createdAt) } ago</time>
          <LikeStyled className='bg-danger' onClick={handlerLike}>
            <BsFillHeartFill />
            <p>{ likesParser(likes) }</p>
          </LikeStyled>
        </header>
        <div>
          <h5 className='fw-bold'>@{ author.toLowerCase() }</h5>
          <p>{ text }</p>
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
  image: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  author: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  comments: PropTypes.number.isRequired,
  likes: PropTypes.number.isRequired,
}

Post.defaultProps = {
  image: '/img/image-not-found.png'
}
export default Post;
