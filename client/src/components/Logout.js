import React from 'react'

const Logout = ({ history }) => {

  const home = () => {
    history.push('/')
  }

  const recipes = () => {
    history.push('/recipes')
  }





  return <section className="hero is-danger is-fullheight">
    <div className="hero-body">
      <div className="container has-text-centered">
        <p className="title">You are dead to me!</p>
        <p className="subtitle">Fullheight subtitle</p>
        <button onClick={home} className="button is-white">Home</button>
        <button onClick={recipes} className="button is-white">All Recipes</button>
      </div>
    </div>
  </section>


}

export default Logout