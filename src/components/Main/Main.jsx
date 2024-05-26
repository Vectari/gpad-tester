import { NavLink, Outlet } from "react-router-dom";
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
  return (
    <>
      <StyledUl>
        <li>
          <NavLink to="/main/one">#1</NavLink>
        </li>
        <li>
          <NavLink to="/main/two">#2</NavLink>
        </li>
        <li>
          <NavLink to="/main/three">#3</NavLink>
        </li>
        <li>
          <NavLink to="/main/four">#4</NavLink>
        </li>
      </StyledUl>
      <Outlet />
    </>
  );
}
