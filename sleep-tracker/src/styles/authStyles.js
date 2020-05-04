import styled from "styled-components";
import { Modal } from "@material-ui/core";
import { Link } from "react-router-dom";
export const Container = styled.div`
   {
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80vh;
  }
`;

export const FormContainer = styled.div`
   {
    padding: 50px;
  }
`;

export const FContainer = styled.section`
   {
  }
`;

export const NamesContainer = styled.div`
   {
    display: flex;
    flex-drection: row-reverse;
    width: 100%;
    justify-content: center;
  }
`;

export const ButtonContainer = styled.div`
   {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    right: 150px;
    margin: 3%;
  }
`;

export const LoginContainer = styled.div`
   {
    display: flex;
    width: 80%;
    justify-content: space-evenly;
    color: #e0e0e0;
  }
`;
export const LoginForm = styled.div`
   {
    display: flex;
    flex-direction: column;
    position: relative;
    top: 350px;
    left: 150px;
  }
`;
export const InputContainer = styled.div`
   {
    padding: 5%;
  }
`;

export const TextContainer = styled.div`
   {
    width: 40%;
    position: relative;
    text-align: center;
    top: 250px;
    left: 150px;
    font-size: 1.5rem;
  }
`;

export const Button = styled.button`
   {
    height: 30px;
    width: 200px;
    margin-top: 100px;
    background-color: #39869d;
    color: #e0e0e0;
    border-radius: 10px;
    @media (max-width: 768px) {
      width: 150px;
      margin-top: 0;
      position: relative;
     top: 5px;
     left: 60px;
  }
`;

export const LoginButtonContainer = styled.div`
   {
    position: relative;
    left: 40px;
    height: 100px;
  }
`;

export const HomeContainer = styled.div`
   {
    display: flex;
  }
`;

export const PaperContainer = styled.div`
   {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    width: 50%;
    justify-content: center;
  }
`;

export const Paper = styled.div`
   {
    background: #121212;
    width: auto;
    margin: 2%;
  }
`;

export const Holder = styled.div`
   {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    width: 90%;
    margin: 0 auto;
  }
`;

export const GraphContainer = styled.div`
   {
    width: auto;
  }
`;

export const TimeContainer = styled.div`
   {
    display: flex;
    justify-content: space-between;
  }
`;

export const TitleWrapper = styled.div`
   {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #e0e0e0;
    width: 80%;
    height: 50px;
    background: #121212;
    margin: 3% auto;
  }
`;

export const ButtonHolder = styled.div`
   {
    display: flex;
    justify-content: center;
    aligh-items: center;
    position: relative;
    bottom: 75px;
  }
`;

export const StyledModal = styled(Modal)`
   {
        &:active: {
      outline: none,
},
    border: 5px solid lime;
  
  }
`;

export const StyledButton = styled(Button)`
   {
    background: black;
    border: 1px solid #39869d;
    color: #39869d;
  }
`;

export const StyledLink = styled(Link)`
   {
    text-decoration: none;
  }
`;

export const RFContainer = styled(Container)`
   {
    display: flex;
    flex-direction: column;
  }
`;

export const LoginButton = styled(Button)`
   {
    margin-top: 30px;
  }
`;
