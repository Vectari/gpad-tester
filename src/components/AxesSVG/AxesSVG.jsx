"use client";

import { Theme } from "@/app/Theme";
import { useAtom } from "jotai/react";
import {
  atomL3Pressed,
  atomLeftX,
  atomLeftY,
  atomR3Pressed,
  atomRightX,
  atomRightY,
} from "@/GamepadAPI/GamepadAPI";

export function AxesSVG() {
  const [leftX] = useAtom(atomLeftX);
  const [leftY] = useAtom(atomLeftY);
  const [rightX] = useAtom(atomRightX);
  const [rightY] = useAtom(atomRightY);
  const [l3Pressed] = useAtom(atomL3Pressed);
  const [r3Pressed] = useAtom(atomR3Pressed);

  return (
    <>
      <svg height="157" width="335">
        <g transform="translate(78.5 78.5) scale(0.95, 0.95)">
          <circle
            cx="0"
            cy="0"
            r="78.5"
            fill="none"
            stroke={Theme.SVGColors.black}
            stroke-width={l3Pressed ? "5" : "1"}
          ></circle>
          <line
            x1="0"
            y1="-78.5"
            x2="0"
            y2="78.5"
            stroke={Theme.SVGColors.black}
          ></line>
          <line
            x1="-78.5"
            y1="0"
            x2="78.5"
            y2="0"
            stroke={Theme.SVGColors.black}
          ></line>
          <line
            x1={leftX * 78.5}
            y1={leftY * 78.5}
            stroke={Theme.SVGColors.black}
            stroke-width="1"
          ></line>
          <circle
            cx={leftX * 78.5}
            cy={leftY * 78.5}
            r="4"
            fill={Theme.SVGColors.black}
          ></circle>
        </g>
        <g transform="translate(258.5 78.5) scale(0.95, 0.95)">
          <circle
            cx="0"
            cy="0"
            r="78.5"
            fill="none"
            stroke={Theme.SVGColors.black}
            stroke-width={r3Pressed ? "5" : "1"}
          ></circle>
          <line
            x1="0"
            y1="-78.5"
            x2="0"
            y2="78.5"
            stroke={Theme.SVGColors.black}
          ></line>
          <line
            x1="-78.5"
            y1="0"
            x2="78.5"
            y2="0"
            stroke={Theme.SVGColors.black}
          ></line>
          <line
            x1={rightX * 78.5}
            y1={rightY * 78.5}
            stroke={Theme.SVGColors.black}
            stroke-width="1"
          ></line>
          <circle
            cx={rightX * 78.5}
            cy={rightY * 78.5}
            r="4"
            fill={Theme.SVGColors.black}
          ></circle>
        </g>
      </svg>
    </>
  );
}
