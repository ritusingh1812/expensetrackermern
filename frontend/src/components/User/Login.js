// import React from 'react'
// import styled from 'styled-components'
// import { useState } from 'react'
// import { Link,useNavigate} from 'react-router-dom'
// import axios from 'axios';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useGlobalContext } from '../../context/globalContext';

// function Login() {
//   const navigate=useNavigate();
//   const { loginRoute } = useGlobalContext();
//   const handleChange=(event)=>{
//     setValues({ ...values, [event.target.name]: event.target.value });
//   }

  
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (handleValidation()) {
//       console.log("in validation", loginRoute);
//       const { username, password } = values;
//       const { data } = await axios.post(loginRoute, {
//         username,
//         password,
//       });
//       if (data.status === false) {
//         toast.error(data.msg, toastOptions);
//       }
//       if (data.status === true) {
//         localStorage.setItem("app-user", JSON.stringify(data.user));
//         navigate("/");
//       }
//     }
//   };

// const [values, setValues] = useState({
//   username: "",
//   password: "",
// });

// const toastOptions = {
//   position: "bottom-right",
//   autoClose: 8000,
//   pauseOnHover: true,
//   draggable: true,
//   theme: "dark",
// };

// const handleValidation = () => {
//   const { password, username } = values;
//   if (password === "") {
//     toast.error("Username and password cannot be empty", toastOptions);
//     return false;
//   } else if (username === "") {
//     toast.error("Username and password cannot be empty", toastOptions);
//     return false;
//   }
//   return true;
// };

//   return (
//     <div>
//       <ToastContainer/>
     

//     <FormContainer>
//         <form onSubmit={(event) => handleSubmit(event)}>
//           <div className="brand">
         
//             <h1>Login</h1>
//           </div>
//           <input
//             type="text"
//             placeholder="Username"
//             name="username"
//             onChange={(e) => handleChange(e)}
//             min="3"
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             name="password"
//             onChange={(e) => handleChange(e)}
//             min="8"
//           />

//           <button type="submit">Log In</button>
//           <span>
//             Don't have an account?
//             <Link to="/register">Register</Link>
//           </span>
//         </form>
//       </FormContainer>
//     </div>
//   )
// }




// export default Login
import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useGlobalContext } from '../../context/globalContext'
import logo from '../../img/logomain.png'

function Login() {
  const navigate = useNavigate();
  const { loginRoute } = useGlobalContext();
  const [values, setValues] = useState({ username: "", password: "" });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleValidation = () => {
    const { password, username } = values;
    if (password === "" || username === "") {
      toast.error("Username and password cannot be empty", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, { username, password });
      if (!data.status) toast.error(data.msg, toastOptions);
      if (data.status) {
        localStorage.setItem("app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      
    

      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <h1>Login</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>
    </div>
  )
}

export default Login


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



