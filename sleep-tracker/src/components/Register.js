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
  }
`;
const Mission = styled.div`
   {
    display: flex;
    flex-direction: column;
    width: 40%;
    position: relative;
    left: 50px;
    text-align: center;
    font-size: 2rem;
  }
`;
const FormContainer = styled.div`
   {
    width: 50%;
    display: flex;
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
