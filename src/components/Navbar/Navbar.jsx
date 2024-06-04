import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Theme } from "../../styles/Theme";

const StyledNav = styled.nav`
  ul {
    display: flex;
    background-color: ${Theme.greyOne};
    padding: 1rem 15rem;
    border-radius: 0 0 1rem 1rem;
    gap: 5rem;

    li {
      font-size: 1.2rem;
    }

    .active {
      padding: 1rem;
      background-color: ${Theme.greyTwo};
      border-radius: 1rem;
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
            Home
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
