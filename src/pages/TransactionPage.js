import styled from "styled-components"
import axios from "axios"
import { useContext, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import { useNavigate } from "react-router-dom";

export default function TransactionsPage(props) {
  const navigate = useNavigate();
  const {user} = useContext(UserContext)
  const [valueAmount, setValueAmount] = useState("")
  const [valueDescription, setValueDescription] = useState("")

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`
      } }

  function handleCreate(e){
    e.preventDefault()
    if (Number(valueAmount) === isNaN) {
      return alert("Invalid Number")
    }
    const body = {amount: valueAmount, description: valueDescription, typeTransaction: props.typeTransaction}
    const promise = axios.post(`${process.env.REACT_APP_API_URL}/transactions`,body, config)
    
    promise
    .then(() => navigate("/home"))
    .catch((err) => alert(err.response.data))
  }

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={handleCreate}>
        <input
        placeholder="Valor"
        type="text"
        value={valueAmount}
        onChange={(e) => setValueAmount(e.target.value)}
        required
        />

        <input
        placeholder="Descrição"
         type="text"
         value={valueDescription}
         onChange={(e) => setValueDescription(e.target.value)}
         required
         />

        <button
          type="submit">
          Salvar TRANSAÇÃO
          </button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
