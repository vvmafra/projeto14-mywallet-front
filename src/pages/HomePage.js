import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import axios from "axios"

export default function HomePage(props) {
  const {user} = useContext(UserContext)
  const [trasactions, setTransactions] = useState([])
  let totalAmount = 0
  const navigate = useNavigate()

  trasactions.map((a) => {
    let typeTransaction = a.typeTransaction
    if (typeTransaction === "entrada") {
      totalAmount += Number(a.amount)
    } else {
      totalAmount -= Number(a.amount)
    }
    return totalAmount
  })

  useEffect(showTransactions, [])

  function exit(e){
    e.preventDefault()
    localStorage.setItem("user", JSON.stringify({}))
    navigate("/")
  }

  function showTransactions(){
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`
      } }

    const promise = axios.get(`${process.env.REACT_APP_API_URL}/transactions`,config)
    promise.then(res => {
      setTransactions(res.data)
    })
    .catch(err => {
      alert(err.response.data)
    })
  }

  function changeTypeIncome(){
    props.setTypeTransaction("entrada")
    navigate("/nova-transacao/entrada")
    return props.typeTransaction
  }

  function changeTypeOutcome(){
    props.setTypeTransaction("saida")
    navigate("/nova-transacao/saida")
    return props.typeTransaction
  }

  function check(){
    if (totalAmount >= 0) {
      return "entrada"
    } return "saida"
  }


  return (
    <HomeContainer>
      <Header>
        <h1>{`Olá, ${user.name}`}</h1>
        <BiExit onClick={exit}/>
      </Header>

      <TransactionsContainer>
        <ScrollContainer>
          <ul>
            {trasactions.length === 0 ? (
              <p>Não há registros de entrada ou saída</p>
            ) : (
              trasactions.map(t => (
                <ListItemContainer key={t._id}>
                  <div>
                    <span>{t.data}</span>
                    <strong>{t.description}</strong>
                  </div>
                  <Value 
                  typeTransaction={t.typeTransaction}>{t.amount}</Value>
                </ListItemContainer>)
            )).reverse()}
            
          
          </ul>
        </ScrollContainer>

        <article>
          <strong>Saldo</strong>
          <Value typeTransaction={check()}>{parseFloat(totalAmount).toFixed(2)}</Value>
        </article>
      </TransactionsContainer>

    
      <ButtonsContainer>
          <button onClick={changeTypeIncome}>
              <AiOutlinePlusCircle />
              <p>Nova <br /> entrada</p>
          </button>
        
        
          <button onClick={changeTypeOutcome}>
              <AiOutlineMinusCircle />
              <p>Nova <br />saída</p>
          </button>
        
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  article {
    display: flex;
    justify-content: space-between;
    position: relative;
    bottom: 0;
    right: 0;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`

const ScrollContainer = styled.div`
  position: relative;
  overflow: scroll;
  height: 70vh;
  p {
    text-align: center;
    color: #868686;
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.typeTransaction === "entrada" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`