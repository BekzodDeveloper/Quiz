import styled from 'styled-components';

export const Wrapper = styled.div`

  max-width: 1000px;
  //background: #fff;
  border-radius: 10px;
  //border: 2px solid #0085a3;
  padding: 0px 0 20px;
  //box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
  //box-shadow: 0px 108px 43px rgba(0, 0, 0, 0.01), 0px 61px 36px rgba(0, 0, 0, 0.05), 0px 27px 27px rgba(0, 0, 0, 0.09), 0px 7px 15px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  margin: 0 10px;

  p {
    font-size: 1rem;
    font-weight: 500;
  }
`;

export type ButtonWrapperProps = {
    correct: boolean
    userClicked: boolean
}
export const ButtonWrapper = styled.div<ButtonWrapperProps>`

  transition: all 0.3s ease;

  :hover {
    opacity: 0.8;
  }

  button {
    cursor: pointer;
    user-select: none;
    font-size: 1rem;
    width: 100%;
    height: 100%;
    margin: 5px 0;
    background: ${({correct, userClicked}) =>
            correct ? "#59ba0f"
                    : userClicked && !correct
                            ? "#C82020"
                            : "transparent"};

    border: 2px solid ${({correct, userClicked}) =>
            correct ? "#59ba0f"
                    : userClicked && !correct
                            ? "#C82020"
                            : "#222222"};

    box-shadow: 1px 2px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    color: ${({correct, userClicked}) =>
            correct ? "#fff"
                    : userClicked && !correct
                            ? "#fff"
                            : "#222222"};
    //text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25);
  }

`;

export const AnswerWrapper = styled.div`

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
    
`;