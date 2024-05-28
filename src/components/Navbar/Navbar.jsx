import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";

const StyledNav = styled.nav`
  ul {
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
  }
`;

export function Navbar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return (
    <StyledNav>
      <ul>
        <li>
          <NavLink
            to="/main"
            className={activeLink === ("/" || "/main") ? "active" : ""}
          >
            Main
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/info"
            className={activeLink === "/info" ? "active" : ""}
          >
            INFO
          </NavLink>
        </li>
      </ul>
    </StyledNav>
  );
}
