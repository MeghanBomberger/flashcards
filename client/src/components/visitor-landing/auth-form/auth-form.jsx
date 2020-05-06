import axios from 'axios'
import React, { useState, useReducer } from 'react'
import { navigate } from '@reach/router'
import { useCookies } from 'react-cookie'

import userReducer from '../../../utils/reducers/user-reducer'

import './auth-form.scss'

export default function AuthForm () {
  const [isNewUser, setIsNewUser] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [email, setEmail] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [errMessage, setErrorMessage] = useState("")
  const [cookies, setCookie] = useCookies(['authToken'])
  const [state, dispatch] = useReducer(userReducer)

  axios.defaults.timeout = 30000
  const authAxios = axios.create()

  async function handleAuth (e) {
    e.preventDefault()

    return await authAxios.post(`/auth/${isNewUser ? 'signup' : 'login'}`, {
      username,
      password,
      email,
      firstname,
      lastname
    }).then(async response => {
      if (response.data.errMessage) {
        await setErrorMessage(response.data.errMessage)
      }
      if (response.data.user && response.data.token) {
        await dispatch({
          type: 'LOGIN',
          id: response.data.user.id,
          username: response.data.user.username,
          firstname: response.data.user.firstname,
          token: response.data.token
        })

        await setCookie(
          'authToken', 
          {
            user: {
              id: response.data.user.id,
              username: response.data.user.username,
              firstname: response.data.user.firstname
            },
            token: response.data.token
          },
          { path: '/' }
        )

        setTimeout(navigate('/home'), 500)
      }
    }).catch(async err => {
      console.error(err)
      await setErrorMessage("Server error. Please try again later.")
    })
  }

  return (
    <form className="auth-form">
      <h2>
        {
          isNewUser 
            ? "Let's start learning..." 
            : "Let's get back to learning..."
        }
      </h2>

      <input
        autoComplete="no password"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        type="text"
        required
      />

      {isNewUser && (
        <>          
          <input
            autoComplete="no password"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />

          <input
            autoComplete="no password"
            name="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="firstname"
            type="text"
            required
          />

          <input
            autoComplete="no password"
            name="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Lastname"
            type="text"
          />
        </>
      )}

      <input
        autoComplete="no password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
        required
      />

      {isNewUser && (
        <>
          <input
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            type="password"
            required
          />

          {password !== confirmPassword && (
            <p className="password-confirm-error">Password must match confirmation</p>
          )}
        </>
      )}
      
      <button 
        className="auth-button"
        onClick={(e) => handleAuth(e)}
      >
        {
          isNewUser
            ? "Sign Up"  
            : "Login"
        }
      </button>

      <p className="auth-error-message">
        {errMessage}
      </p>

      <p
        className="new-user-toggle"
        onClick={() => setIsNewUser(!isNewUser)}
      >
        {
          isNewUser
            ? "Already have an account?"
            : "Don't have an account?"
        }
      </p>
    </form>
  )
}