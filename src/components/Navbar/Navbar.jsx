import { NavLink } from "react-router-dom";
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

export function Navbar() {
  return (
    <nav>
      <StyledUl>
        <li>
          <NavLink to="/main">Main</NavLink>
        </li>
        <li>
          <NavLink to="/info">INFO</NavLink>
        </li>
      </StyledUl>
    </nav>
  );
}
