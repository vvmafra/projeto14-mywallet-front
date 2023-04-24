import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios"

export default function SignUpPage() {
  
  const navigate = useNavigate()

  function handleSignUp(e){
    e.preventDefault()
    navigate("/")
  }


  function register(body){
    const promise = axios.post(`${process.env.REACT_APP_API_URL}/cadastro`, body)
    return promise
  }

  return (
    <SingUpContainer>
      <form onSubmit={handleSignUp}>
        <MyWalletLogo />
        <input placeholder="Nome" type="text" />
        <input placeholder="E-mail" type="email" />
        <input placeholder="Senha" type="password" autocomplete="new-password" />
        <input placeholder="Confirme a senha" type="password" autocomplete="new-password" />
        <button>Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
