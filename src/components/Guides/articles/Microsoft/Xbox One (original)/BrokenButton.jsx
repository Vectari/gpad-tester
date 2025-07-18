import styled from "styled-components";

const Wrapper = styled.div`
  p {
    font-size: 1rem;
    line-height: 1.6;
  }

  img {
    width: 100%;
    max-width: 400px;
    border-radius: 8px;
  }
`;

export function BrokenButtonGuide() {
  return (
    <Wrapper>
      <h1>AAA</h1>
      <p>BBB</p>
      <p>CCC</p>
    </Wrapper>
  );
}
