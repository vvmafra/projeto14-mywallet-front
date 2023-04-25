import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"
import { useState } from "react"
import UserProvider from "./contexts/UserContext"

export default function App() {
  const [user, setUser] = useState({})
  const [typeTransaction, setTypeTransaction] = useState("entrada")

  return (
    <PagesContainer>
      <BrowserRouter>
      <UserProvider>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/cadastro" element={<SignUpPage />} />
            <Route path="/home" element={<HomePage typeTransaction={typeTransaction} setTypeTransaction={setTypeTransaction}/>} />
            <Route path="/nova-transacao/:tipo" element={<TransactionsPage typeTransaction={typeTransaction} setTypeTransaction={setTypeTransaction}/>} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`
