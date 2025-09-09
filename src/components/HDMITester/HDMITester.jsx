import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin: 2rem 0; */
  margin-bottom: 0.5rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const MatrixBox = styled.div`
  display: flex;
  background: black;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  font-family: monospace;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0.5rem;
`;

const PinRow = styled.div`
  display: flex;
  align-items: center;
  width: 70px;
  margin: 2px 0;

  .square {
    width: 20px;
    height: 20px;
    background: ${({ squareColor }) => squareColor};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    font-weight: bold;
    border-radius: 3px;
    flex-shrink: 0;
  }

  .value {
    /* margin-left: 5px; */
    color: ${({ valueColor }) => valueColor};
    /* text-align: left; */
    flex: 1;
  }
`;

export const HDMITester = ({ title, leftPins, rightPins }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <MatrixBox>
        <Column>
          {leftPins.map((pin) => (
            <PinRow
              key={pin.number}
              squareColor={pin.squareColor}
              valueColor={pin.valueColor}
            >
              <div className="value">{pin.value}</div>
              <div className="square">{pin.number}</div>
            </PinRow>
          ))}
        </Column>
        <Column>
          {rightPins.map((pin) => (
            <PinRow
              key={pin.number}
              squareColor={pin.squareColor}
              valueColor={pin.valueColor}
            >
              <div className="square">{pin.number}</div>
              <div className="value">{pin.value}</div>
            </PinRow>
          ))}
        </Column>
      </MatrixBox>
    </Wrapper>
  );
};
