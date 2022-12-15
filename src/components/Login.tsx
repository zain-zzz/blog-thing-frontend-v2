import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebaseconfig";

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  function signIn() {
    signInWithEmailAndPassword(auth, email, password)
    .then((user) => {
      console.log(user.user)
      navigate('/')
    }).catch((error) => {
      console.log(error.code)
    })
  }

  return (
    <>
      <header>
        <h1>Blog thing v2</h1>
      </header>
      <main>
        <div className="card">
          <h3>Sign in</h3>

          <div className="inputField">
            <h4>Email</h4>
            <input type="input" onChange={(e) => {
              setEmail(e.target.value)
            }}/>
          </div>

          <div className="inputField">
            <h4>Password</h4>
            <input type="password" onChange={(e) => {
              setPassword(e.target.value)
            }}/>
          </div>

          <button className="buttons" onClick={signIn}>sign in</button>

          <div>
            <p>
              Don't have an account?
              <NavLink to={"/signup"}> Sign up</NavLink>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
