import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledUl = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;

  li {
    margin-right: 10px;
  }
`;

export function Navbar() {
  return (
    <nav>
      <StyledUl>
        <li>
          <Link to="/main">Main</Link>
        </li>
        <li>
          <Link to="/info">INFO</Link>
        </li>
      </StyledUl>
    </nav>
  );
}
