import React, { useState } from 'react'

import './AuthForm.scss'

export default function AuthForm () {
	const [isLoading, setIsLoading] = useState(false)
	const [isNewUser, setIsNewUser] = useState(false)
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [email, setEmail] = useState("")
	const [firstname, setFirstname] = useState("")
	const [lastname, setLastname] = useState("")
	const [errMessage, setErrorMessage] = useState("")

	const handleAuth = () => {}

	return (
		<form className="auth-form" autoComplete='off'>
			<h2>{isNewUser ? 'Sign up to start studying...' : 'Login and get back to studying...'}</h2>
			
			<input
				className="fake-input"
				name="username"
				type="text"
			/>
			<input
				type='password'
				className='fake-input' 
			/>

			<input
				autoComplete="no password"
				name="real-username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				placeholder="Username"
				type="text"
				required
			/>

			{isNewUser && (
				<>
					<input
						autoComplete="chrome-off"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
						type="email"
						required
					/>

					<input
						autoComplete="chrome-off"
						name="firstname"
						value={firstname}
						onChange={(e) => setFirstname(e.target.value)}
						placeholder="firstname"
						type="text"
						required
					/>

					<input
						autoComplete="chrome-off"
						name="lastname"
						value={lastname}
						onChange={(e) => setLastname(e.target.value)}
						placeholder="Lastname"
						type="text"
					/>
				</>
			)}

			<input
				autoComplete="chrome-off"
				name="real-password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Password"
				type="password"
				required
			/>

			{isNewUser && (
				<input
					name="confirmPassword"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					placeholder="Confirm Password"
					type="password"
					required
				/>
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

			{isNewUser && password !== confirmPassword && <p className="password-confirm-error">Password must match confirmation</p>}
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
