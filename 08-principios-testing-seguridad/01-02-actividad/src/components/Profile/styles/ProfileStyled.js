import styled from 'styled-components';

const ProfileStyled = styled.div`
  padding: 16px;
  max-width: 300px;
  margin: auto;
  text-align: center;
  figure {
    display: flex;
    justify-content: center;
    img {
      border-radius: 50%;
    }
  }
  h3 {
    font-size: 20px;
    font-weight: bold;
  }
  p {
    font-size: 16px;
  }
`;

export default ProfileStyled;
