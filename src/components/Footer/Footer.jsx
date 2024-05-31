import styled from "styled-components";

const StyledFooterWrapper = styled.div`
  width: 100%;
  height: 50px;

  background-color: black;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: 0;
`;

export function Footer() {
  return (
    <StyledFooterWrapper>
      <p>Copyright 2024</p>
    </StyledFooterWrapper>
  );
}
