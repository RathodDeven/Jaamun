import "./App.css";
// import Wrapper from "./Components/Common/Wrapper";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import HomePage from "./Pages/Home/HomePage";
import SwapPage from "./Pages/Swap/SwapPage";
import ChartsPage from "./Pages/Charts/ChartsPage";
import NewHomePage from "./Pages/Home/NewHomePage";
import Header from "./Components/Header/Header";

function App() {
  return (
    <>
      {/* <Wrapper> */}
      <BrowserRouter>
        <Header />

        <Routes>
          <Route index element={<NewHomePage />} />
          <Route path="/swap/*" element={<SwapPage />} />
          <Route path="/charts" element={<ChartsPage />} />
        </Routes>
      </BrowserRouter>
      {/* </Wrapper> */}
    </>
  );
}

export default App;
