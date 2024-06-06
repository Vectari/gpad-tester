import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Theme } from "../../styles/Theme";

const StyledNav = styled.nav`
  ul {
    display: flex;
    background-color: ${Theme.interface};
    padding: 1rem 15rem;
    border-radius: 0 0 1rem 1rem;
    gap: 5rem;
    border-bottom: 1px solid ${Theme.secondary};

    li {
      font-size: 1.2rem;
    }
    span {
      color: white;
    }

    .active {
      color: ${Theme.primary};
      border-bottom: 3px solid ${Theme.primary};
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
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/info"
            className={activeLink === "/info" ? "active" : ""}
          >
            <span>INFO</span>
          </NavLink>
        </li>
      </ul>
    </StyledNav>
  );
}
