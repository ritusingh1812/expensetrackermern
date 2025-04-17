import React from 'react'
import { useState } from 'react';
import styled from 'styled-components'
import { Link,useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalContext } from '../../context/globalContext';

function Register() {
const navigate=useNavigate()
  const { registerRoute } = useGlobalContext();
const handleChange=(event)=>{
  setValues({ ...values, [event.target.name]: event.target.value });
}


const handleSubmit = async (event) => {
  event.preventDefault();
  if (handleValidation()) {
    console.log("in validation", registerRoute);
    const { password, username, email } = values;
    const { data } = await axios.post(registerRoute, {
      username,
      email,
      password,
    });
    if (data.status === false) {
      toast.error(data.msg, toastOptions);
    }
    if (data.status === true) {
      localStorage.setItem("app-user", JSON.stringify(data.user));
      navigate("/");
    }
  }
};



const [values, setValues] = useState({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const toastOptions = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};
const handleValidation = () => {
  const { password, confirmPassword, username, email } = values;
  if (password !== confirmPassword) {
    toast.error(
      "Password and confirm password should be same.",
      toastOptions
    );
    return false;
  } else if (username.length < 3) {
    toast.error(
      "Username should be greater than 3 characters.",
      toastOptions
    );
    return false;
  } else if (password.length < 8) {
    toast.error(
      "Password should be equal or greater than 8 characters.",
      toastOptions
    );
    return false;
  } else if (email === "") {
    toast.error("Email is required.", toastOptions);
    return false;
  }
  return true;
};

  return (
    <div>
      <ToastContainer/>
     <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
      
            <h1>Register</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account?
            <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      
    </div>
  )
}



export default Register

const FormContainer = styled.div`
  height: 100vh;
 
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color:rgb(192, 97, 138);
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color:rgb(165, 59, 109); /* Darker shade of pink for the heading */
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #f8bbd0;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #e91e63;
    border-radius: 0.4rem;
    color: #880e4f; /* Darker shade of pink for input text */
    width: 100%;
    font-size: 1rem;
    placeholder: {
      color: #880e4f;
    }
    &:focus {
      border: 0.1rem solid #ad1457;
      outline: none;
    }
    &::placeholder {
      color: #880e4f;
      opacity: 1;
    }
  }
  button {
    background-color: #f06292;
    color: #fce4ec;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #ad1457; /* Darker shade of pink for hover */
    }
  }
  span {
    color: #880e4f;
    text-transform: uppercase;
    a {
      color: #d81b60;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;


