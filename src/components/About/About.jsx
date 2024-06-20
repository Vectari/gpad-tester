import styled from "styled-components";

const StyledImgWrapper = styled.div`
  padding: 1rem;

  img {
    padding: 0.5rem;
  }

  h3 {
    margin-top: 2rem;
  }
`;

export function About() {
  return (
    <>
      <br />
      <h2>GamePad Tester created by Vectari</h2>
      
      
      <br />
      <a href="https://github.com/Vectari/gpad-tester" target="_blank">
        Go to Github!
      </a>
      <br />
      <h3>Technologies:</h3>
      <StyledImgWrapper>
        <img
          src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"
          alt="JavaScript"
        />
        <img
          src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"
          alt="React"
        />
        <img
          src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white"
          alt="Vite"
        />
        <img
          src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"
          alt="Styled Components"
        />
        <img
          src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white"
          alt="React Router"
        />
        <p>React Icons</p>
        <h3>Any suggestions? Let me know on Github. Thanks!</h3>
      </StyledImgWrapper>
    </>
  );
}
