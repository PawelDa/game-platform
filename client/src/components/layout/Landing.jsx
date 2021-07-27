import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div class="card text-center">
      <div class="card-body">
        <h5 class="card-title">1000 card game</h5>
        <p class="card-text">Create an account or login to enjoy the game!</p>
        <Link to="/register" class="btn btn-primary">Sign Up</Link>
        <Link to="/login" class="btn btn-primary">Login</Link>
      </div>
    </div>
  )
}

export default Landing;
