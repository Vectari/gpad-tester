import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";

const StyledUl = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;

  li {
    margin-right: 10px;
  }

  .active {
    color: red;
  }
`;

export function Main() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return (
    <>
      <StyledUl>
        <li>
          <NavLink
            to="/main/one"
            className={
              activeLink === "/" || activeLink === "/main" ? "active" : ""
            }
          >
            #1
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/main/two"
            className={activeLink === "/main/two" ? "active" : ""}
          >
            #2
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/main/three"
            className={activeLink === "/main/three" ? "active" : ""}
          >
            #3
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/main/four"
            className={activeLink === "/main/four" ? "active" : ""}
          >
            #4
          </NavLink>
        </li>
      </StyledUl>
      <Outlet />
    </>
  );
}
