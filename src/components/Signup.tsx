import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from "../firebaseconfig";


export default function Signup({ setIsAuth }) {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function createUser() {

    const response = await fetch('http://localhost:3003/username', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        email: email
      })
    }).then((response) => {

      return response.json();

    }).then((validUser) => {

      if (validUser) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((user) => {
            setIsAuth(true)
            navigate('/')
          })
          .catch((error) => {
            console.log(error.code)
          })
      }

    })
  }

    //find

    return (
      <>
        <header>
          <h1>Blog thing v2</h1>
        </header>
        <main>
          <div className="card">
            <h3>Sign up</h3>

            <div className="inputField">
              <h4>Email</h4>
              <input type="input" onChange={(e) => {
                setEmail(e.target.value)
              }} />
            </div>

            <div className="inputField">
              <h4>Username</h4>
              <input type="input" onChange={(e) => {
                setUsername(e.target.value)
              }} />
            </div>

            <div className="inputField">
              <h4>Password</h4>
              <input type="password" onChange={(e) => {
                setPassword(e.target.value)
              }} />
            </div>

            <button className="buttons" onClick={createUser}>sign up</button>

            <div>
              <p>
                Already have an account?
                <NavLink to={"/login"}> Sign in</NavLink>
              </p>
            </div>
          </div>
        </main>
      </>
    );
  }
