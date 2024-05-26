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
          <Link to="/main/#1">#1</Link>
        </li>
        <li>
          <Link to="/main/#2">#2</Link>
        </li>
        <li>
          <Link to="/main/#3">#3</Link>
        </li>
        <li>
          <Link to="/main/#4">#4</Link>
        </li>
      </StyledUl>
      <Outlet />
    </>
  );
}
