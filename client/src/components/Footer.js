import React from 'react'

const Footer = () => {

  return <footer className='footer is-bottom'>
    <div className='is-flex-direction-column content has-text-centered'>
      <p>© Hack a Snack 2021</p>
      <hr />
      <section className='is-flex is-flex-direction-row is-justify-content-space-around is-size-7'>
        <p><a className='has-text-white' href='https://github.com/emilyrandall1998'><strong>Emily Randall</strong></a></p>
        <p><a className='has-text-white' href='https://github.com/fdepasse'><strong>Fabien Depasse</strong></a></p>
        <p><a className='has-text-white' href='https://github.com/JessKaria'><strong>Jess Karia</strong></a></p>
        <p><a className='has-text-white' href='https://github.com/kate1562'><strong>Kate Joyce</strong></a></p>
      </section>
    </div>
  </footer>
}

export default Footer