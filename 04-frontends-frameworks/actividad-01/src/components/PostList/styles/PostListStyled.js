import styled from 'styled-components';

const PostListStyled = styled.div`
  padding: 16px 0;
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    gap: 32px;
    padding: 32px 0;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }
`;

export default PostListStyled;
