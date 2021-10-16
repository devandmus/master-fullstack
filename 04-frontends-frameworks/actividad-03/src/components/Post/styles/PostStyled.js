import styled from 'styled-components';

const CardStyled = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 5px lightslategrey;
  padding: 0;
`;

const CardContent = styled.div`
  padding: 16px;
  & > *:not(:last-child) {
    margin-bottom: 16px;
  }
  header {
    display: flex;
    justify-content: space-between;
    time {
      color: grey;
    }
  }
  
  footer {
    color: grey;
    display: flex;
    align-items: center;
    p {
      margin: auto 0 0 8px;
    }
    svg {
      fill: grey;
    }
  }
`;

const ImageStyled = styled.div`
  width: 100%;
  height: 0;
  padding-top: 100%;
  position: relative;
  background-size: cover;
  background-image: url('${({ img }) => img}');
`;

const LikeStyled = styled.button`
  color: white;
  border-radius: 8px;
  display: flex;
  padding: 12px;
  align-items: center;
  justify-content: center;
  border: none;
  margin: 0;
  p {
    margin-bottom: 0;
    margin-left: 8px;
  }
  svg {
    fill: white;
  }
  &:hover {
    cursor: pointer;
  }
`;

export {
  CardStyled,
  CardContent,
  ImageStyled,
  LikeStyled,
};
