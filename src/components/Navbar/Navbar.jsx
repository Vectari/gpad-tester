import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Theme } from "../../styles/Theme";
import { FaHome } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { FaTools } from "react-icons/fa";
import { GrGamepad } from "react-icons/gr";
// import { RiCrosshair2Line } from "react-icons/ri";

const StyledNav = styled.div`
  display: flex;
  background-color: ${Theme.interface};
  width: 100%;
  max-width: 1100px;
  border-radius: 0 0 0.5rem 0.5rem;
  border-bottom: 1px solid ${Theme.secondary};
  justify-content: space-between;
  padding: 0.5rem 2rem;
  align-items: center;

  @media (max-width: 765px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;

  h2 {
    color: ${Theme.logo};
    /* border-left: 4px solid ${Theme.primary}; */
    /* border-top: 2px solid ${Theme.primary}; */
    border-right: 1px solid ${Theme.primary};
    border-bottom: 2px solid ${Theme.primary};
    border-radius: 1rem;
    padding: 3px 2px 0 5px;
  }

  .logo {
    color: ${Theme.logo};
    font-size: 1.8rem;
    margin-left: 0.5rem;
    /* border-right: 3px solid ${Theme.primary}; */
    /* border-bottom: 1px solid ${Theme.primary}; */
    border-radius: 1rem;
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5rem;

  @media (min-width: 765px) {
    gap: 7rem;
    padding-right: 7rem;
  }

  span {
    color: ${Theme.logo};
    font-size: 1.1rem;
  }

  a {
    border-bottom: 3px solid ${Theme.interface};
  }

  .active {
    color: ${Theme.primary};
    border-bottom: 3px solid ${Theme.primary};
  }
`;

const Spantext = styled.span`
  @media (max-width: 1000px) {
    display: none;
  }

  padding-left: 0.5rem;
  text-align: center;
`;

export function Navbar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return (
    <StyledNav>
      <LogoWrapper>
        <h2>
          GamePad Tester
          <span className="logo">
            <GrGamepad />
          </span>
        </h2>
      </LogoWrapper>
      <MenuWrapper>
        <NavLink
          to="/main"
          className={activeLink === ("/" || "/main") ? "active" : ""}
        >
          <span>
            <FaHome />
            <Spantext>Main</Spantext>
          </span>
        </NavLink>

        {/* <NavLink
          to="/calibration"
          className={activeLink === "/calibration" ? "active" : ""}
        >
          <span>
            <RiCrosshair2Line />
            <Spantext>Calibration</Spantext>
          </span>
        </NavLink> */}

        <NavLink
          to="/guides"
          className={activeLink === "/guides" ? "active" : ""}
        >
          <span>
            <FaTools />
            <Spantext>Guides</Spantext>
          </span>
        </NavLink>

        <NavLink
          to="/about"
          className={activeLink === "/about" ? "active" : ""}
        >
          <span>
            <FaInfoCircle />
            <Spantext>About</Spantext>
          </span>
        </NavLink>
      </MenuWrapper>
    </StyledNav>
  );
}
