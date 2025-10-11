import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Theme } from "../../styles/Theme";
import { FaHome, FaInfoCircle, FaTools } from "react-icons/fa";
import { GrGamepad } from "react-icons/gr";
import { RiCrosshair2Line } from "react-icons/ri";

const StyledNav = styled.nav`
  display: flex;
  justify-content: center;
  background-color: ${Theme.interface};
  border-bottom: 1px solid ${Theme.secondary};
  width: 100%;
`;

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1100px;
  padding: 0.6rem 2rem;

  @media (max-width: 765px) {
    flex-direction: column;
    gap: 0.8rem;
    padding: 1rem;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 1.3rem;
  font-weight: 600;
  color: ${Theme.logo};
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;

  @media (max-width: 765px) {
    gap: 1.2rem;
  }

  a {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: ${Theme.white};
    text-decoration: none;
    font-size: 1.1rem;
    border-bottom: 3px solid transparent;
    transition: all 0.2s ease-in-out;

    &.active {
      border-bottom-color: ${Theme.primary};
    }
  }
`;

const SpanText = styled.span`
  @media (max-width: 900px) {
    display: none;
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
      <MenuWrapper>
        <Logo>
          <GrGamepad />
          <span>GamePad Tester</span>
        </Logo>

        <NavLinks>
          <NavLink
            to="/main"
            className={
              activeLink === "/" || activeLink === "/main" ? "active" : ""
            }
          >
            <FaHome />
            <SpanText>Main</SpanText>
          </NavLink>

          <NavLink
            to="/calibration"
            className={activeLink === "/calibration" ? "active" : ""}
          >
            <RiCrosshair2Line />
            <SpanText>Calibration</SpanText>
          </NavLink>

          <NavLink
            to="/guides"
            className={activeLink === "/guides" ? "active" : ""}
          >
            <FaTools />
            <SpanText>Guides</SpanText>
          </NavLink>

          <NavLink
            to="/about"
            className={activeLink === "/about" ? "active" : ""}
          >
            <FaInfoCircle />
            <SpanText>About</SpanText>
          </NavLink>
        </NavLinks>
      </MenuWrapper>
    </StyledNav>
  );
}
