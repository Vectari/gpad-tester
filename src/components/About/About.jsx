import styled from "styled-components";
import { Theme } from "../../styles/Theme";

const StyledSendMail = styled.a`
  font-size: 1rem;
  color: ${Theme.interface};
  background-color: ${Theme.white};
  border: 2px solid ${Theme.interface};
  padding: 0.8rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  margin: 1rem auto;
  max-width: 350px;
  transition: 0.5s;

  &:hover {
    background-color: ${Theme.interface};
    color: ${Theme.white};
  }
`;

export function About() {
  return (
    <>
      <br />
      <h2>GamePad Tester created by Vectari</h2>
      <br />
      <h3>Any suggestions? Let me know. Thanks!</h3>
      <StyledSendMail href="mailto:gpadtester.info@gmail.com">
        Send an email
      </StyledSendMail>
      <p>gpadtester.info@gmail.com</p>
      <br />
    </>
  );
}
