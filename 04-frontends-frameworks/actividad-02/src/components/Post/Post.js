import React, { useLayoutEffect, useState } from 'react';
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
import * as LikeDatabase from '../../helpers/LikeDatabase';

const Post = ({ createdAt, author, text, comments, image, id }) => {
  const [likes, setLikes] = useState(0);

  // decidí crear una lógica para guardar los likes aún cuando los componentes se desmontan
  useLayoutEffect(() => {
    const dbLikes = LikeDatabase.getLikes(id);
    setLikes(dbLikes);
  }, [id]);

  const handlerLike = () => {
    const current = likes + 1;
    setLikes(current);
    LikeDatabase.setLikes(id, current);
  }

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
          <h5 className='fw-bold'>{ author }</h5>
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
  id: PropTypes.number,
}

export default Post;
