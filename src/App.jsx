import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";
// import { MainPageInfo } from "./components/MainPageInfo/MainPageInfo";
// import { Footer } from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <ScrollToTopButton />
      {/* <MainPageInfo /> */}
      {/* <Footer /> */}
    </>
  );
}

export default App;
