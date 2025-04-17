import React, { useContext, useState,useCallback } from "react"
import axios from 'axios'

const BASE_URL="http://localhost:5000/api/v1/"

const GlobalContext=React.createContext()

export const GlobalProvider=({children})=>{
const [incomes,setIncomes]=useState([])
const [expenses,setExpenses]=useState([])
const [error,setError]=useState(null)
//incomes

const registerRoute = `${BASE_URL}register`; 
 const loginRoute = `${BASE_URL}login`;
//  const username = JSON.parse(localStorage.getItem('app-user'))


const addIncome = async (income) => {
  const response = await axios.post(`${BASE_URL}add-income`, income)
      .catch((err) =>{
          setError(err.response.data.message)
      })
      getIncomes()
  
}

// const getIncomes = async () => {
//   const response = await axios.get(`${BASE_URL}get-incomes`)
//   setIncomes(response.data)
//   console.log(response.data)
// }

const getIncomes = async () => {
  // const user = localStorage.getItem("username");
  const user = JSON.parse(localStorage.getItem("app-user"));
  if (user) {
    const username = user.username; // Access the username property
    console.log("Username from localStorage:", username); // Log the username for debugging
  
    if (username) {
      try {
        const response = await axios.get(`${BASE_URL}get-incomes`, {
          params: { username }, // Pass the username as a query parameter
        });
        setIncomes(response.data); // Update state with fetched data
        console.log(response.data); // Log the response for debugging
      } catch (error) {
        console.error("Error fetching incomes:", error);
      }
    } else {
      console.log("No username found in user object.");
    }
  } else {
    console.log("No user found in localStorage.");
  }
};


const deleteIncome = async (id) => {
  const res  = await axios.delete(`${BASE_URL}delete-income/${id}`)
  getIncomes()
}

const totalIncome = () => {
  let totalIncome = 0;
  incomes.forEach((income) =>{
      totalIncome = totalIncome + income.amount
  })

  return totalIncome;
}

//expenses
const addExpense = async (income) => {
  const response = await axios.post(`${BASE_URL}add-expense`, income)
      .catch((err) =>{
          setError(err.response.data.message)
      })
      getExpenses()
}

// const getExpenses = async () => {
//   const response = await axios.get(`${BASE_URL}get-expenses`)
//   setExpenses(response.data)
//   console.log(response.data)
// }

const getExpenses = async () => {
  // Retrieve user from localStorage and parse it
  const user = JSON.parse(localStorage.getItem("app-user"));
  
  if (user) {
    const username = user.username; // Access the username property
    console.log("Username from localStorage:", username); // Log the username for debugging
    
    if (username) {
      try {
        // Make the API request with the username as a query parameter
        const response = await axios.get(`${BASE_URL}get-expenses`, {
          params: { username }, // Pass the username as a query parameter
        });
        
        // Update state with the fetched data
        setExpenses(response.data);
        console.log(response.data); // Log the response for debugging
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    } else {
      console.log("No username found in user object.");
    }
  } else {
    console.log("No user found in localStorage.");
  }
};

const deleteExpense = async (id) => {
  const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`)
  getExpenses()
}

const totalExpenses = () => {
  let totalIncome = 0;
  expenses.forEach((income) =>{
      totalIncome = totalIncome + income.amount
  })

  return totalIncome;
}

const totalBalance = () => {
  return totalIncome() - totalExpenses()
}

const transactionHistory = () => {
  const history = [...incomes, ...expenses]
  history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt)
  })

  return history.slice(0, 3)
}
const transactionHistory2 = () => {
  const history2 = [...incomes, ...expenses]
  history2.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt)
  })

  return history2;
}



  return (
    <GlobalContext.Provider value={{
      addIncome,getIncomes,incomes,deleteIncome,totalIncome,addExpense,deleteExpense,totalExpenses,getExpenses,expenses,totalBalance,transactionHistory,transactionHistory2,registerRoute,loginRoute
      }}>
      {children}
    </GlobalContext.Provider>
  )


  
}

export const useGlobalContext=()=>{
  return useContext(GlobalContext)
}