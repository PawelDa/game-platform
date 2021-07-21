import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div class="card text-center">
      <div class="card-body">
        <h5 class="card-title">Play 1000</h5>
        <p class="card-text">Create account to enjoy playing.</p>
        <Link to="/register" class="btn btn-primary">Sign Up</Link>
        <Link to="/login" class="btn btn-primary">Login</Link>
      </div>
    </div>
  )
}

export default Landing;
