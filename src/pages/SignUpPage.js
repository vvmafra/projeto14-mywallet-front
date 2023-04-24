import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios"
import { useState } from "react"

export default function SignUpPage() {
  const [form, setForm] = useState({name: "", email: "", password: "", passwordConfirmation: "" })
  const navigate = useNavigate()

  function handleForm(e){
    setForm({...form, [e.target.name]: e.target.value})
  }

  function handleSignUp(e){
    e.preventDefault()

    register(form)
    .then(() => {
      navigate("/")
    })
    .catch(() => {
      alert("Error trying to signing up")
    })
    
  }


  function register(body){
    const promise = axios.post(`${process.env.REACT_APP_API_URL}/cadastro`, body)
    return promise
  }

  return (
    <SingUpContainer>
      <form onSubmit={handleSignUp}>
        <MyWalletLogo />
        <input 
          name="name"
          placeholder="Name" 
          type="text"
          required
          value={form.name}
          onChange={handleForm}  
        />

        <input 
          name="email"
          placeholder="E-mail" 
          type="email"
          required
          value={form.email}
          onChange={handleForm} 
        />

        <input
          name="password"
          placeholder="Password" 
          type="password" 
          required
          autocomplete="new-password"
          value={form.password}
          onChange={handleForm} 
        />

        <input 
          name="passwordConfirmation"
          placeholder="Confirm Password" 
          type="password"
          value={form.passwordConfirmation}
          onChange={handleForm}
        />
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
