import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";

const StyledUl = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;

  li {
    width: 130px;
    background-color: pink;
    margin: 10px;
    padding: 10px;
    border-radius: 20px;
  }

  p {
    color: green;
  }

  .active {
    color: red;
  }
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
        setConnectionStatusOne(false)
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
        setConnectionStatusTwo(false)
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
        setConnectionStatusThree(false)
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
        setConnectionStatusFour(false)
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
            #1
            <p>{connectionStatusOne ? "Connected" : ""}</p>
          </li>
        </NavLink>
        <NavLink
          to="/main/two"
          className={activeLink === "/main/two" ? "active" : ""}
        >
          <li>
            #2
            <p>{connectionStatusTwo ? "Connected" : ""}</p>
          </li>
        </NavLink>

        <NavLink
          to="/main/three"
          className={activeLink === "/main/three" ? "active" : ""}
        >
          <li>
            #3
            <p>{connectionStatusThree ? "Connected" : ""}</p>
          </li>
        </NavLink>
        <NavLink
          to="/main/four"
          className={activeLink === "/main/four" ? "active" : ""}
        >
          <li>
            #4
            <p>{connectionStatusFour ? "Connected" : ""}</p>
          </li>
        </NavLink>
      </StyledUl>
      <Outlet />
    </>
  );
}
