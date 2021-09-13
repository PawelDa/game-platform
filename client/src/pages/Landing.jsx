import React from 'react'

import '../assets/stylesheets/pages/Landing.scss'

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">-Engineers Social Network-</h1>
          <p className="lead">
            Create a profile, share posts and get in touch with other engineers!
          </p>
          <div className="buttons">
            <a href="register.html" className="btn btn-primary">Sign Up</a>
            <a href="login.html" className="btn btn-light">Login</a>
          </div>
        </div>
      </div>
    </section>
  )
};

export default Landing;
