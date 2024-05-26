import { Link, Outlet } from "react-router-dom";
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

export function Main() {
  return (
    <>
      <StyledUl>
        <li>
          <Link to="/main/one">#1</Link>
        </li>
        <li>
          <Link to="/main/two">#2</Link>
        </li>
        <li>
          <Link to="/main/three">#3</Link>
        </li>
        <li>
          <Link to="/main/four">#4</Link>
        </li>
      </StyledUl>
      <Outlet />
    </>
  );
}
