import { useEffect, useState } from "react";
import styled from "styled-components";
import { Theme } from "../../styles/Theme";

const AxesSVGWrapper = styled.div``;

const StyledButton = styled.button`
  background-color: ${Theme.secondary};
  border-radius: 1rem;
  padding: 0.5rem;
  margin-top: 0.5rem;
  margin-left: -2rem;
  border-style: none;
  font-size: 1.3rem;
  font-family: Roboto;
  color: ${Theme.white};
  border: 2px solid ${Theme.white};

  &:hover {
    -webkit-box-shadow: 0px 0px 7px 0px rgba(66, 68, 90, 1);
    -moz-box-shadow: 0px 0px 7px 0px rgba(66, 68, 90, 1);
    box-shadow: 0px 0px 7px 0px rgba(66, 68, 90, 1);
    background-color: ${Theme.white};
    color: ${Theme.secondary};
    border: 2px solid ${Theme.secondary};
  }
`;

export function AxesSVG({
  leftX,
  leftY,
  l3Pressed,
  rightX,
  rightY,
  r3Pressed,
}) {
  const maxPoints = 300;

  const [leftPath, setLeftPath] = useState([]);
  const [rightPath, setRightPath] = useState([]);

  useEffect(() => {
    setLeftPath((prev) => {
      const updated = [...prev, [leftX * 78.5, leftY * 78.5]];
      return updated.length > maxPoints ? updated.slice(-maxPoints) : updated;
    });

    setRightPath((prev) => {
      const updated = [...prev, [rightX * 78.5, rightY * 78.5]];
      return updated.length > maxPoints ? updated.slice(-maxPoints) : updated;
    });
  }, [leftX, leftY, rightX, rightY]);

  const renderPath = (points) =>
    points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");

  const clearPaths = () => {
    setLeftPath([]);
    setRightPath([]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "p" || e.key === "P") {
        clearPaths();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <AxesSVGWrapper>
      <svg height="157" width="335">
        {/* Left stick */}
        <g
          className="circle"
          transform="translate(78.5 78.5) scale(0.95, 0.95)"
        >
          <circle
            cx="0"
            cy="0"
            r="78.5"
            fill="none"
            stroke="grey"
            strokeWidth={l3Pressed ? "4" : "1"}
          />
          <line x1="0" y1="-78.5" x2="0" y2="78.5" stroke="grey" />
          <line x1="-78.5" y1="0" x2="78.5" y2="0" stroke="grey" />

          {/* path for circularity test */}
          <path
            d={renderPath(leftPath)}
            fill="none"
            stroke="rgb(253, 165, 33)"
            strokeWidth="2"
          />

          <line
            x1="0"
            y1="0"
            x2={leftX * 78.5}
            y2={leftY * 78.5}
            stroke="black"
          />
          <circle cx={leftX * 78.5} cy={leftY * 78.5} r="4" fill="black" />
        </g>

        {/* Right stick */}
        <g
          className="circle"
          transform="translate(258.5 78.5) scale(0.95, 0.95)"
        >
          <circle
            cx="0"
            cy="0"
            r="78.5"
            fill="none"
            stroke="grey"
            strokeWidth={r3Pressed ? "4" : "1"}
          />
          <line x1="0" y1="-78.5" x2="0" y2="78.5" stroke="grey" />
          <line x1="-78.5" y1="0" x2="78.5" y2="0" stroke="grey" />

          <path
            d={renderPath(rightPath)}
            fill="none"
            stroke="rgb(253, 165, 33)"
            strokeWidth="2"
          />

          <line
            x1="0"
            y1="0"
            x2={rightX * 78.5}
            y2={rightY * 78.5}
            stroke="black"
          />
          <circle cx={rightX * 78.5} cy={rightY * 78.5} r="4" fill="black" />
        </g>
      </svg>

      {/* Clear Button */}
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <StyledButton onClick={clearPaths}>
          Clear Paths History (p)
        </StyledButton>
      </div>
    </AxesSVGWrapper>
  );
}
