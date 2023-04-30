import img from '../../assets/img2.jpg'

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../hooks/auth'
import classes from './login.module.css'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassWord] = useState("")
    const [error, setError] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate();

   const handleLogin = async (event) => {
  event.preventDefault();

  const email = event.target.email.value;
  const password = event.target.password.value;

  const response = await fetch('http://localhost:5500/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(login(data));
    navigate('/');
  } else {
    console.error(error);
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 1500);
  }
};

      

    return (
        <div className={classes.loginContainer}>
         <div className={classes.loginWrapper}>
           <div className={classes.loginLeftSide}>
             <img src={img} className={classes.leftImg}/>
           </div>
           <div className={classes.loginRightSide}>
             <h2 className={classes.title}>Login</h2>
             <form onSubmit={handleLogin} className={classes.loginForm}>
             <input type="email" name="email" placeholder="Type email"/>
                <input type="password" name="password" placeholder="Type password"/>
               <button className={classes.submitBtn}>Login</button>
               <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
             </form>
             {error && 
               <div className={classes.errorMessage}>
                    Wrong credentials! Try different ones.
                </div>
                }
           </div>
         </div>
        </div>
    )
}

export default Login;