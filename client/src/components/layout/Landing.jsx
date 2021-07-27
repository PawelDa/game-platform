import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="card text-center">
      <div className="card-body">
        <h5 className="card-title">1000 card game</h5>
        <p className="card-text">Create an account or login to enjoy the game!</p>
        <div className="d-grid gap-2 d-md-block">
          <Link to="/register" className="btn btn-primary me-md-2">Sign Up</Link>
          <Link to="/login" className="btn btn-primary">Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Landing;
