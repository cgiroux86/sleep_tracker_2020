import React from "react";
import styled from "styled-components";
import RegForm from "./RegForm";

const Container = styled.div`
   {
    display: flex;
    color: #e0e0e0;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
    @media (max-width: 800px) {
      flex-direction: column;
      height: auto;
    }
  }
`;
const Mission = styled.div`
   {
    display: flex;
    flex-direction: column;
    width: 50%;
    position: relative;
    left: 100px;
    text-align: center;
    font-size: 2rem;
    @media (max-width: 768px) {
      font-size: 1.5rem;
      position: relative;
      left: 0px;
    }
  }
`;
const FormContainer = styled.div`
   {
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 800px) {
      justify-content: center;
      align-content: center;
      height: auto;
    }
  }
`;

const Register = () => {
  return (
    <Container>
      <Mission>
        <h2>Let's get started!</h2>
        <p>Let Sleep Tracker help you discover your ideal sleep schedule.</p>
      </Mission>
      <FormContainer>
        <RegForm />
      </FormContainer>
    </Container>
  );
};

export default Register;
