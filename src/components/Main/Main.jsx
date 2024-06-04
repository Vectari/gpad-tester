import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Theme } from "../../styles/Theme";

const StyledUl = styled.ul`
  display: flex;

  li {
    width: 8rem;
    background-color: ${Theme.greyOne};
    padding: 1rem;
    border-radius: 0 0 1rem 1rem;
  }

  .active {
    border-color: 1px solid ${Theme.greyTwo};
    color: red;
  }
`;

const StyledConnected = styled.p`
  color: green;
`;

const StyledNotFound = styled.p`
  color: blue;
`;

export function Main() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");
  const [connectionStatusOne, setConnectionStatusOne] = useState(false);
  const [connectionStatusTwo, setConnectionStatusTwo] = useState(false);
  const [connectionStatusThree, setConnectionStatusThree] = useState(false);
  const [connectionStatusFour, setConnectionStatusFour] = useState(false);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const interval = setInterval(() => {
      const gpad = navigator.getGamepads()[0];
      if (gpad) {
        setConnectionStatusOne(gpad.connected);
      }

      if (navigator.getGamepads()[0] === null) {
        setConnectionStatusOne(false);
      }
    }, 100);
  });

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const interval = setInterval(() => {
      const gpad = navigator.getGamepads()[1];
      if (gpad) {
        setConnectionStatusTwo(gpad.connected);
      }

      if (navigator.getGamepads()[1] === null) {
        setConnectionStatusTwo(false);
      }
    }, 100);
  });

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const interval = setInterval(() => {
      const gpad = navigator.getGamepads()[2];
      if (gpad) {
        setConnectionStatusThree(gpad.connected);
      }

      if (navigator.getGamepads()[2] === null) {
        setConnectionStatusThree(false);
      }
    }, 100);
  });

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const interval = setInterval(() => {
      const gpad = navigator.getGamepads()[3];
      if (gpad) {
        setConnectionStatusFour(gpad.connected);
      }

      if (navigator.getGamepads()[3] === null) {
        setConnectionStatusFour(false);
      }
    }, 100);
  });

  return (
    <>
      <StyledUl>
        <NavLink
          to="/main/one"
          className={
            activeLink === "/" || activeLink === "/main" ? "active" : ""
          }
        >
          <li>
            Gamepad #1
            <StyledConnected>
              {connectionStatusOne ? "Connected" : ""}
            </StyledConnected>
            <StyledNotFound>
              {!connectionStatusOne ? "Not found" : ""}
            </StyledNotFound>
          </li>
        </NavLink>
        <NavLink
          to="/main/two"
          className={activeLink === "/main/two" ? "active" : ""}
        >
          <li>
            Gamepad #2
            <StyledConnected>
              {connectionStatusTwo ? "Connected" : ""}
            </StyledConnected>
            <StyledNotFound>
              {!connectionStatusTwo ? "Not found" : ""}
            </StyledNotFound>
          </li>
        </NavLink>

        <NavLink
          to="/main/three"
          className={activeLink === "/main/three" ? "active" : ""}
        >
          <li>
            Gamepad #3
            <StyledConnected>
              {connectionStatusThree ? "Connected" : ""}
            </StyledConnected>
            <StyledNotFound>
              {!connectionStatusThree ? "Not found" : ""}
            </StyledNotFound>
          </li>
        </NavLink>
        <NavLink
          to="/main/four"
          className={activeLink === "/main/four" ? "active" : ""}
        >
          <li>
            Gamepad #4
            <StyledConnected>
              {connectionStatusFour ? "Connected" : ""}
            </StyledConnected>
            <StyledNotFound>
              {!connectionStatusFour ? "Not found" : ""}
            </StyledNotFound>
          </li>
        </NavLink>
      </StyledUl>
      <Outlet />
    </>
  );
}
