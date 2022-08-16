import React from "react"

export default function admin() {
  const handleSubmit = e => {
    e.preventDefault()
    alert("Login success!")
  }

  return (
    <div>
      Admin
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" placeholder="Email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
