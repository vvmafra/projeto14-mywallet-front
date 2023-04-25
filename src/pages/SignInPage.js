import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useState } from "react"
import axios from 'axios';
import { UserContext } from "../contexts/UserContext";

export default function SignInPage() {
  const [form, setForm] = useState({email: "", password: ""})
  const navigate = useNavigate()
  const {user, setUser} = useContext(UserContext)

  console.log(form)

  function handleForm(e){
    setForm({...form, [e.target.name]: e.target.value})
  }

  function handleLogin(e){
    e.preventDefault()

    const promise = axios.post(`${process.env.REACT_APP_API_URL}/`,form)

    promise.then((res) => {
      const {idUser, name, token} = res.data
      setUser({idUser, name, token})
      localStorage.setItem("user", JSON.stringify({idUser, name, token}))
      navigate("/home")
    })
    .catch(err => {
      alert(err.response.data.message)
    }) 
  }

 

  return (
    <SingInContainer>
      <form onSubmit={handleLogin}>
        <MyWalletLogo />
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

        <button type="submit">Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
