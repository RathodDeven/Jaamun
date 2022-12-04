import "./App.css";
// import Wrapper from "./Components/Common/Wrapper";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import HomePage from "./Pages/Home/HomePage";
import SwapPage from "./Pages/Swap/SwapPage";
import ChartsPage from "./Pages/Charts/ChartsPage";
import NewHomePage from "./Pages/Home/NewHomePage";
import Header from "./Components/Header/Header";
import ChartList from "./Pages/Charts/ChartList";
import TradersPage from "./Pages/Traders/TradersPage";
import TraderProfile from "./Pages/Traders/TraderProfile";

function App() {
  return (
    <>
      {/* <Wrapper> */}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<NewHomePage />} />
          <Route path="/swap/*" element={<SwapPage />} />
          <Route path="/traders/" element={<TradersPage />} />
          <Route path="/traders/:id" element={<TraderProfile />} />
          <Route path="/chart" element={<ChartList />} />
          <Route path="/chart/:id" element={<ChartsPage />} />
        </Routes>
      </BrowserRouter>
      {/* </Wrapper> */}
    </>
  );
}

export default App;
