import './App.css'
import { WalletProvider } from '@lifi/widget/providers'
import Wrapper from './Components/Common/Wrapper'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/Home/HomePage'
import SwapPage from './Pages/Swap/SwapPage'
import ChartsPage from './Pages/Charts/ChartsPage'

function App () {
  return (
    <>
      <WalletProvider>
        <Wrapper>
          <BrowserRouter>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="/swap/*" element={<SwapPage />} />
              <Route path="/charts" element={<ChartsPage />} />
            </Routes>
          </BrowserRouter>
        </Wrapper>
      </WalletProvider>
    </>
  )
}

export default App
