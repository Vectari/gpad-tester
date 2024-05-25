import styled from "styled-components";
// import { Head } from "./components/Head/Head";
// import { Main } from "./components/Main/Main";
import { Outlet } from "react-router-dom";

const StyledH1 = styled.h1`
  color: red;
`;

const Styledback = styled.div`
  background-color: pink;
`;

function App() {
  return (
    <>
      <Styledback>
        <StyledH1>Hello</StyledH1>
        {/* <Head />
        <Main /> */}
        <Outlet />
      </Styledback>
    </>
  );
}

export default App;
