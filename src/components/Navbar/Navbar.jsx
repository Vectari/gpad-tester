import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Theme } from "../../styles/Theme";
import { FaHome } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { FaTools } from "react-icons/fa";
import { GrGamepad } from "react-icons/gr";

const StyledNav = styled.nav`
  h2 {
    color: ${Theme.secondary};
    position: absolute;
    margin-left: -17rem;
    border-left: 3px solid ${Theme.primary};
    border-top: 1px solid ${Theme.primary};
    border-radius: 1rem;
    padding: 3px 2px 0 5px;
  }

  .logo {
    color: ${Theme.secondary};
    font-size: 1.8rem;
    position: absolute;
    border-right: 3px solid ${Theme.primary};
    border-bottom: 1px solid ${Theme.primary};
    border-radius: 1rem;
  }

  ul {
    display: flex;
    background-color: ${Theme.interface};
    padding: 1rem 18rem;
    border-radius: 0 0 1rem 1rem;
    gap: 5rem;
    border-bottom: 1px solid ${Theme.secondary};

    li {
      font-size: 1.2rem;
    }
    span {
      color: ${Theme.white};
      font-size: 1.5rem;
      padding: 0 10px;
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
        <h2>
          GamePad Tester
          <span className="logo">
            <GrGamepad />
          </span>
        </h2>
        <li>
          <NavLink
            to="/main"
            className={activeLink === ("/" || "/main") ? "active" : ""}
          >
            <span>
              <FaHome />
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/info"
            className={activeLink === "/info" ? "active" : ""}
          >
            <span>
              <FaTools />
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={activeLink === "/about" ? "active" : ""}
          >
            <span>
              <FaInfoCircle />
            </span>
          </NavLink>
        </li>
      </ul>
    </StyledNav>
  );
}
