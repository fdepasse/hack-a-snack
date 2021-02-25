import React from 'react'

const Logout = ({ history }) => {

  const home = () => {
    history.push('/')
  }

  const recipes = () => {
    history.push('/recipes')
  }

  return <section className="hero is-fullheight">
    <div className="hero-body">
      <div className="container has-text-centered">
        <p className="logout">Goodbye!</p>
        <button onClick={home} className="button is-rounded">Home</button>
        <button onClick={recipes} className="button is-rounded">All Recipes</button>
      </div>
    </div>
  </section>
}
export default Logout