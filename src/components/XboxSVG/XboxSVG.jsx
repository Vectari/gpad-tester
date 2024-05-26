"use client";

import { Theme } from "@/app/Theme";
import { useAtom } from "jotai";
import {
  atomAPressed,
  atomBPressed,
  atomConnectionStatus,
  atomDownPressed,
  atomGamepadName,
  atomL3Pressed,
  atomLbPressed,
  atomLeftPressed,
  atomLeftX,
  atomLeftY,
  atomLt,
  atomOptionsPressed,
  atomR3Pressed,
  atomRbPressed,
  atomRightPressed,
  atomRightX,
  atomRightY,
  atomRt,
  atomSharePressed,
  atomUpPressed,
  atomXPressed,
  atomYPressed,
} from "@/GamepadAPI/GamepadAPI";

export function XboxSVG() {
  const [leftX] = useAtom(atomLeftX);
  const [leftY] = useAtom(atomLeftY);
  const [rightX] = useAtom(atomRightX);
  const [rightY] = useAtom(atomRightY);
  const [l3Pressed] = useAtom(atomL3Pressed);
  const [r3Pressed] = useAtom(atomR3Pressed);
  const [lt] = useAtom(atomLt);
  const [rt] = useAtom(atomRt);
  const [lbPressed] = useAtom(atomLbPressed);
  const [rbPressed] = useAtom(atomRbPressed);
  const [aPressed] = useAtom(atomAPressed);
  const [bPressed] = useAtom(atomBPressed);
  const [xPressed] = useAtom(atomXPressed);
  const [yPressed] = useAtom(atomYPressed);
  const [upPressed] = useAtom(atomUpPressed);
  const [downPressed] = useAtom(atomDownPressed);
  const [leftPressed] = useAtom(atomLeftPressed);
  const [rightPressed] = useAtom(atomRightPressed);
  const [sharePressed] = useAtom(atomSharePressed);
  const [optionsPressed] = useAtom(atomOptionsPressed);
  const [connectionStatus] = useAtom(atomConnectionStatus);
  const [gamepadName] = useAtom(atomGamepadName);

  return (
    <>
      <svg
        fill={Theme.SVGColors.white}
        stroke="black"
        stroke-width="2"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        // xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 580.032 580.032"
        // xml:space="preserve"
        height="370"
        width="370"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <g>
            {" "}
            <g>
              {" "}
              <rect
                // LB
                x="122"
                y="60"
                width="60"
                height="27"
                rx="6.5"
                fill={lbPressed ? "black" : "white"}
                stroke={Theme.SVGColors.black}
                stroke-width="2"
              ></rect>
              <rect
                // RB
                x="400"
                y="60"
                width="60"
                height="27"
                rx="6.5"
                fill={rbPressed ? "black" : "white"}
                stroke={Theme.SVGColors.black}
                stroke-width="2"
              ></rect>
              <rect
                // LT
                x="150"
                y="1"
                width="27"
                height="55"
                rx="8"
                fill={lt ? `rgba(0,0,0,${lt})` : "rgb(255, 255, 255)"}
                stroke={Theme.SVGColors.black}
                stroke-width="2"
              ></rect>
              <rect
                // LT
                x="406"
                y="1"
                width="27"
                height="55"
                rx="8"
                fill={rt ? `rgba(0,0,0,${rt})` : "rgb(255, 255, 255)"}
                stroke={Theme.SVGColors.black}
                stroke-width="2"
              ></rect>
              <path d="M305.053,130c-3.182,1.512-8.127,3.941-8.616,6.634c0,0,13.488,13.14,12.895,25.251c2.754-3.874,4.412-8.58,4.412-13.684 C313.743,140.851,310.316,134.358,305.053,130z"></path>{" "}
              <circle
                // L AXES AND L3
                cx={142 + leftX * 8}
                cy={210.8 + leftY * 8}
                r="40"
                stroke-width={l3Pressed ? "5" : "2"}
                fill={
                  Math.abs(leftX) > 0.1 || Math.abs(leftY) > 0.1
                    ? `rgba(0,0,0,${Math.abs(leftX) + Math.abs(leftY)})`
                    : "rgb(255, 255, 255)"
                }
              ></circle>
              <circle
                // X BUTTON
                cx="399.932"
                cy="212.094"
                r="18.77"
                fill={xPressed ? "black" : "white"}
              ></circle>{" "}
              <circle
                // SHARE
                cx="249.019"
                cy="212.094"
                r="9.804"
                fill={sharePressed ? "black" : "white"}
              ></circle>{" "}
              <path d="M289.796,142.626c-12.007,9.272-15.973,17.062-17.283,21.445c4.345,4.786,10.551,7.852,17.509,7.852 c6.769,0,12.846-2.882,17.173-7.448C306.014,160.184,302.183,152.192,289.796,142.626z"></path>{" "}
              <path
                // BODY
                d="M505.765,151.733c-16.255-10.392-4.528-16.329-21.353-29.193c-16.824-12.864-85.104-34.639-96.983-24.743 s-25.233,11.873-25.233,11.873h-72.112h-0.122h-72.118c0,0-13.36-1.977-25.233-11.873c-11.873-9.896-80.16,11.873-96.983,24.743 c-16.824,12.864-5.098,18.801-21.353,29.193C58.02,162.125,15.467,305.619,15.467,305.619s-55.417,159.824,43.544,179.12 c0,0,24.248-15.336,45.025-40.079c20.784-24.743,61.353-59.872,83.128-60.368c21.298-0.483,99.389-0.019,102.792,0l0,0 c0,0,0.024,0,0.061,0c0.043,0,0.062,0,0.062,0l0,0c3.403-0.019,81.494-0.483,102.792,0c21.769,0.496,62.345,35.625,83.128,60.368 s45.024,40.079,45.024,40.079c98.961-19.296,43.544-179.12,43.544-179.12S522.02,162.125,505.765,151.733z M438.047,149.107 c13.728,0,24.89,11.169,24.89,24.89c0,13.721-11.169,24.89-24.89,24.89s-24.89-11.163-24.89-24.89 S424.319,149.107,438.047,149.107z M399.932,187.204c13.727,0,24.89,11.163,24.89,24.89s-11.169,24.89-24.89,24.89 c-13.722,0-24.891-11.169-24.891-24.89S386.204,187.204,399.932,187.204z M332.146,196.17c8.782,0,15.924,7.148,15.924,15.93 s-7.142,15.924-15.924,15.924s-15.925-7.142-15.925-15.924S323.364,196.17,332.146,196.17z M93.062,211.103 c0-27.062,22.02-49.076,49.083-49.076c27.062,0,49.076,22.014,49.076,49.076c0,27.063-22.014,49.083-49.076,49.083 C115.082,260.185,93.062,238.166,93.062,211.103z M256.399,317.578c0,1.689-1.371,3.06-3.06,3.06h-22.448v22.455 c0,1.688-1.371,3.06-3.06,3.06h-24.235c-1.689,0-3.06-1.371-3.06-3.06v-22.455h-22.448c-1.689,0-3.06-1.37-3.06-3.06v-24.235 c0-1.689,1.371-3.059,3.06-3.059h22.448v-22.455c0-1.689,1.371-3.06,3.06-3.06h24.235c1.689,0,3.06,1.371,3.06,3.06v22.455h22.448 c1.689,0,3.06,1.37,3.06,3.059V317.578z M249.019,228.019c-8.782,0-15.924-7.142-15.924-15.924s7.142-15.931,15.924-15.931 s15.924,7.148,15.924,15.931S257.794,228.019,249.019,228.019z M290.022,178.049c-16.457,0-29.841-13.391-29.841-29.847 c0-16.451,13.391-29.841,29.841-29.841c16.45,0,29.841,13.391,29.841,29.841C319.863,164.664,306.479,178.049,290.022,178.049z M365.299,349.745c-27.063,0-49.077-22.021-49.077-49.083c0-27.062,22.014-49.076,49.077-49.076 c27.062,0,49.076,22.014,49.076,49.076C414.375,327.725,392.361,349.745,365.299,349.745z M438.047,277.083 c-13.728,0-24.89-11.163-24.89-24.89s11.169-24.89,24.89-24.89s24.89,11.169,24.89,24.89S451.774,277.083,438.047,277.083z M479.1,236.99c-13.727,0-24.89-11.169-24.89-24.89c0-13.721,11.163-24.89,24.89-24.89c13.728,0,24.891,11.163,24.891,24.89 C503.99,225.828,492.827,236.99,479.1,236.99z"
              ></path>{" "}
              <path d="M299.992,126.751c-3.042-1.42-6.396-2.271-9.97-2.271c-3.604,0-6.989,0.869-10.049,2.313 c5.397,0.417,8.959,2.705,9.822,3.33C290.689,129.486,294.38,127.087,299.992,126.751z"></path>{" "}
              <circle
                // A BUTTON
                cx="438.047"
                cy="252.192"
                r="18.77"
                fill={aPressed ? "black" : "white"}
              ></circle>{" "}
              <path d="M274.827,130.141c-5.171,4.352-8.525,10.79-8.525,18.066c0,4.829,1.469,9.314,3.954,13.066 c-0.11-11.934,12.907-24.627,12.907-24.627C282.685,134.034,278.009,131.659,274.827,130.141z"></path>{" "}
              <circle
                // B BUTTON
                cx="479.1"
                cy="212.094"
                r="18.77"
                fill={bPressed ? "black" : "white"}
              ></circle>{" "}
              <circle
                // OPTION
                cx="332.146"
                cy="212.094"
                r="9.804"
                fill={optionsPressed ? "black" : "white"}
              ></circle>{" "}
              <circle
                // Y BUTTON
                cx="438.047"
                cy="173.997"
                r="18.77"
                fill={yPressed ? "black" : "white"}
              ></circle>{" "}
              <circle
                // R AXES AND R3
                cx={365.2 + rightX * 8}
                cy={300.8 + rightY * 8}
                r="40"
                stroke-width={r3Pressed ? "5" : "2"}
                fill={
                  Math.abs(rightX) > 0.1 || Math.abs(rightY) > 0.1
                    ? `rgba(0,0,0,${Math.abs(rightX) + Math.abs(rightY)})`
                    : "rgb(255, 255, 255)"
                }
              ></circle>
              <path
                // D-PAD
                d="M224.771,293.343v-22.454h-18.115v22.454c0,1.689-1.371,3.061-3.06,3.061h-22.448v18.114h22.448 c1.689,0,3.06,1.371,3.06,3.061v22.454h18.115v-22.454c0-1.689,1.371-3.061,3.06-3.061h22.448v-18.114h-22.448 C226.142,296.403,224.771,295.032,224.771,293.343z"
              ></path>{" "}
              <rect
                // RIGHT D-PAD
                x="225"
                y="296.3"
                width="25.2"
                height="18.4"
                fill={rightPressed ? "black" : "white"}
              ></rect>
              <rect
                // LEFT D-PAD
                x="181.2"
                y="296.3"
                width="25.2"
                height="18.4"
                fill={leftPressed ? "black" : "white"}
              ></rect>
              <rect
                // UP D-PAD
                x="206.5"
                y="270.9"
                width="18.4"
                height="25.2"
                fill={upPressed ? "black" : "white"}
              ></rect>
              <rect
                // DOWN D-PAD
                x="206.5"
                y="314.6"
                width="18.4"
                height="25.2"
                fill={downPressed ? "black" : "white"}
              ></rect>
            </g>{" "}
          </g>{" "}
        </g>
      </svg>
    </>
  );
}
