export function AxesSVG({
  leftX,
  leftY,
  l3Pressed,
  rightX,
  rightY,
  r3Pressed,
}) {
  return (
    <>
      <svg height="157" width="335">
        <g transform="translate(78.5 78.5) scale(0.95, 0.95)">
          <circle
            cx="0"
            cy="0"
            r="78.5"
            fill="none"
            stroke="black"
            strokeWidth={l3Pressed ? "5" : "1"}
          ></circle>
          <line x1="0" y1="-78.5" x2="0" y2="78.5" stroke="black"></line>
          <line x1="-78.5" y1="0" x2="78.5" y2="0" stroke="black"></line>
          <line
            x1={leftX * 78.5}
            y1={leftY * 78.5}
            stroke="black"
            strokeWidth="1"
          ></line>
          <circle
            cx={leftX * 78.5}
            cy={leftY * 78.5}
            r="4"
            fill="black"
          ></circle>
        </g>
        <g transform="translate(258.5 78.5) scale(0.95, 0.95)">
          <circle
            cx="0"
            cy="0"
            r="78.5"
            fill="none"
            stroke="black"
            strokeWidth={r3Pressed ? "5" : "1"}
          ></circle>
          <line x1="0" y1="-78.5" x2="0" y2="78.5" stroke="black"></line>
          <line x1="-78.5" y1="0" x2="78.5" y2="0" stroke="black"></line>
          <line
            x1={rightX * 78.5}
            y1={rightY * 78.5}
            stroke="black"
            strokeWidth="1"
          ></line>
          <circle
            cx={rightX * 78.5}
            cy={rightY * 78.5}
            r="4"
            fill="black"
          ></circle>
        </g>
      </svg>
    </>
  );
}
