import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div>
      <Link to='/edit-profile' className='btn btn-primary my-1' >Edit bio</Link>
    </div>
  )
};

export default DashboardActions;
